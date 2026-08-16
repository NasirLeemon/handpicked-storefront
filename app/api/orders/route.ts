import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { CartItem } from "@/types/cart";

type CreateOrderBody = {
  customerName?: string;
  customerEmail?: string;
  phone?: string;
  address?: string;
  note?: string;
  deliveryArea?: "inside_dhaka" | "suburb_dhaka" | "outside_dhaka";
  deliveryCharge?: number;
  items?: CartItem[];
};

function getInventorySupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_INVENTORY_SUPABASE_URL;
  const serviceRoleKey = process.env.INVENTORY_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_INVENTORY_SUPABASE_URL");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing INVENTORY_SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

function getSubtotal(items: CartItem[]) {
  return items.reduce((total, item) => {
    const price = Number(item.price || 0);
    const quantity = Number(item.quantity || 0);

    return total + price * quantity;
  }, 0);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateOrderBody;

    const customerName = body.customerName?.trim();
    const customerEmail = body.customerEmail?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const address = body.address?.trim();
    const note = body.note?.trim() || null;
    const deliveryArea = body.deliveryArea;
    const items = Array.isArray(body.items) ? body.items : [];

    const deliveryCharges = {
      inside_dhaka: 80,
      suburb_dhaka: 110,
      outside_dhaka: 150,
    } as const;

    if (!deliveryArea || !(deliveryArea in deliveryCharges)) {
      return NextResponse.json(
        { error: "Please select a valid delivery area." },
        { status: 400 }
      );
    }

    const deliveryCharge = deliveryCharges[deliveryArea];

    if (!customerName || !customerEmail || !phone || !address) {
      return NextResponse.json(
        { error: "Name, email, phone, and address are required." },
        { status: 400 }
      );
    }

    const emailPattern =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailPattern.test(customerEmail)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    const normalizedPhone = phone.replace(/\D/g, "");

    if (!/^01\d{9}$/.test(normalizedPhone)) {
      return NextResponse.json(
        { error: "Enter a valid 11-digit Bangladesh phone number." },
        { status: 400 }
      );
    }


    if (items.length === 0) {
      return NextResponse.json(
        { error: "Order must include at least one product." },
        { status: 400 }
      );
    }

    const subtotal = getSubtotal(items);
    const supabaseAdmin = getInventorySupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from("website_orders")
      .insert({
        customer_name: customerName,
        customer_email: customerEmail,
        phone: normalizedPhone,
        address,
        note,
        items,
        subtotal,
        delivery_area: deliveryArea,
        delivery_charge: deliveryCharge,
        status: "new",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: `Supabase error: ${error.message}` },
        { status: 400 }
      );
    }

    return NextResponse.json({ order: data }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong while creating the order.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
