import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { CartItem } from "@/types/cart";

type CreateOrderBody = {
  customerName?: string;
  phone?: string;
  address?: string;
  note?: string;
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
    const phone = body.phone?.trim();
    const address = body.address?.trim();
    const note = body.note?.trim() || null;
    const items = Array.isArray(body.items) ? body.items : [];

    if (!customerName || !phone || !address) {
      return NextResponse.json(
        { error: "Name, phone, and address are required." },
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
        phone,
        address,
        note,
        items,
        subtotal,
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
