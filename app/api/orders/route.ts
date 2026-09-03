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
  items?: CartItem[];
};

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  status: string;
  show_on_storefront: boolean;
  product_categories:
    | { category_id: string }[]
    | null;
};

type VariantRow = {
  id: string;
  product_id: string;
  color: string | null;
  size: string | null;
  selling_price: number | string;
  available_stock: number | string;
  is_default: boolean;
  is_active: boolean;
};

type OfferRow = {
  id: string;
  name: string;
  discount_percent: number | string;
  starts_at: string | null;
  ends_at: string | null;
  applies_to_all_products: boolean;
  offer_products:
    | { product_id: string }[]
    | null;
  offer_categories:
    | { category_id: string }[]
    | null;
};

function getInventorySupabaseAdmin() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_INVENTORY_SUPABASE_URL;

  const serviceRoleKey =
    process.env.INVENTORY_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_INVENTORY_SUPABASE_URL",
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "Missing INVENTORY_SUPABASE_SERVICE_ROLE_KEY",
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

function normalizeText(value?: string | null) {
  return value?.trim().toLowerCase() ?? "";
}

function isOfferLive(
  offer: OfferRow,
  now: number,
) {
  if (
    offer.starts_at &&
    new Date(offer.starts_at).getTime() > now
  ) {
    return false;
  }

  if (
    offer.ends_at &&
    new Date(offer.ends_at).getTime() < now
  ) {
    return false;
  }

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body =
      (await request.json()) as CreateOrderBody;

    const customerName = body.customerName?.trim();
    const customerEmail = body.customerEmail
      ?.trim()
      .toLowerCase();
    const phone = body.phone?.trim();
    const address = body.address?.trim();
    const note = body.note?.trim() || null;
    const deliveryArea = body.deliveryArea;

    const requestedItems = Array.isArray(body.items)
      ? body.items
      : [];

    const deliveryCharges = {
      inside_dhaka: 80,
      suburb_dhaka: 110,
      outside_dhaka: 150,
    } as const;

    if (
      !deliveryArea ||
      !(deliveryArea in deliveryCharges)
    ) {
      return NextResponse.json(
        { error: "Please select a valid delivery area." },
        { status: 400 },
      );
    }

    const deliveryCharge =
      deliveryCharges[deliveryArea];

    if (
      !customerName ||
      !customerEmail ||
      !phone ||
      !address
    ) {
      return NextResponse.json(
        {
          error:
            "Name, email, phone, and address are required.",
        },
        { status: 400 },
      );
    }

    const emailPattern =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailPattern.test(customerEmail)) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const normalizedPhone =
      phone.replace(/\D/g, "");

    if (!/^01\d{9}$/.test(normalizedPhone)) {
      return NextResponse.json(
        {
          error:
            "Enter a valid 11-digit Bangladesh phone number.",
        },
        { status: 400 },
      );
    }

    if (requestedItems.length === 0) {
      return NextResponse.json(
        {
          error:
            "Order must include at least one product.",
        },
        { status: 400 },
      );
    }

    for (const item of requestedItems) {
      const quantity = Number(item.quantity);

      if (
        !item.productId ||
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        return NextResponse.json(
          { error: "Invalid product or quantity." },
          { status: 400 },
        );
      }
    }

    const supabase =
      getInventorySupabaseAdmin();

    const productIds = [
      ...new Set(
        requestedItems.map(
          (item) => item.productId,
        ),
      ),
    ];

    const [
      productsResult,
      variantsResult,
      offersResult,
    ] = await Promise.all([
      supabase
        .from("products")
        .select(`
          id,
          name,
          slug,
          category_id,
          status,
          show_on_storefront,
          product_categories (
            category_id
          )
        `)
        .in("id", productIds),

      supabase
        .from("product_variants")
        .select(`
          id,
          product_id,
          color,
          size,
          selling_price,
          available_stock,
          is_default,
          is_active
        `)
        .in("product_id", productIds)
        .eq("is_active", true),

      supabase
        .from("offers")
        .select(`
          id,
          name,
          discount_percent,
          starts_at,
          ends_at,
          applies_to_all_products,
          offer_products (
            product_id
          ),
          offer_categories (
            category_id
          )
        `)
        .eq("is_active", true),
    ]);

    if (productsResult.error) {
      throw productsResult.error;
    }

    if (variantsResult.error) {
      throw variantsResult.error;
    }

    if (offersResult.error) {
      throw offersResult.error;
    }

    const products =
      (productsResult.data ?? []) as unknown as ProductRow[];

    const variants =
      (variantsResult.data ?? []) as unknown as VariantRow[];

    const offers =
      (offersResult.data ?? []) as unknown as OfferRow[];

    const now = Date.now();

    const liveOffers = offers.filter(
      (offer) => isOfferLive(offer, now),
    );

    const securedItems = [];
    const requestedVariantQuantities =
      new Map<string, number>();

    for (const requestedItem of requestedItems) {
      const product = products.find(
        (item) =>
          item.id === requestedItem.productId,
      );

      if (
        !product ||
        product.status !== "active" ||
        !product.show_on_storefront
      ) {
        return NextResponse.json(
          {
            error:
              "One of the products in your cart is no longer available.",
          },
          { status: 400 },
        );
      }

      const productVariants =
        variants.filter(
          (variant) =>
            variant.product_id === product.id,
        );

      const requestedSize =
        normalizeText(requestedItem.size);

      const requestedColor =
        normalizeText(requestedItem.color);

      let candidates = productVariants;

      if (requestedSize) {
        candidates = candidates.filter(
          (variant) =>
            normalizeText(variant.size) ===
            requestedSize,
        );
      }

      if (candidates.length === 0) {
        return NextResponse.json(
          {
            error: `${product.name} is no longer available in the selected option.`,
          },
          { status: 400 },
        );
      }

      const variant =
        candidates.find(
          (item) =>
            requestedColor &&
            normalizeText(item.color) ===
              requestedColor,
        ) ??
        candidates.find(
          (item) => item.is_default,
        ) ??
        candidates[0];

      const quantity =
        Number(requestedItem.quantity);

      const alreadyRequested =
        requestedVariantQuantities.get(
          variant.id,
        ) ?? 0;

      const totalRequested =
        alreadyRequested + quantity;

      const availableStock =
        Number(variant.available_stock || 0);

      if (totalRequested > availableStock) {
        return NextResponse.json(
          {
            error: `Only ${availableStock} unit${
              availableStock === 1 ? "" : "s"
            } of ${product.name} are available.`,
          },
          { status: 400 },
        );
      }

      requestedVariantQuantities.set(
        variant.id,
        totalRequested,
      );

      const categoryIds =
        new Set<string>();

      if (product.category_id) {
        categoryIds.add(
          product.category_id,
        );
      }

      for (
        const relation of
        product.product_categories ?? []
      ) {
        categoryIds.add(
          relation.category_id,
        );
      }

      const winningOffer =
        liveOffers
          .filter((offer) => {
            if (
              offer.applies_to_all_products
            ) {
              return true;
            }

            const productMatch =
              offer.offer_products?.some(
                (target) =>
                  target.product_id ===
                  product.id,
              ) ?? false;

            if (productMatch) {
              return true;
            }

            return (
              offer.offer_categories?.some(
                (target) =>
                  categoryIds.has(
                    target.category_id,
                  ),
              ) ?? false
            );
          })
          .map((offer) => ({
            ...offer,
            numericDiscount: Number(
              offer.discount_percent || 0,
            ),
          }))
          .filter(
            (offer) =>
              Number.isFinite(
                offer.numericDiscount,
              ) &&
              offer.numericDiscount > 0,
          )
          .sort(
            (a, b) =>
              b.numericDiscount -
              a.numericDiscount,
          )[0] ?? null;

      const regularPrice =
        Number(variant.selling_price || 0);

      if (
        !Number.isFinite(regularPrice) ||
        regularPrice < 0
      ) {
        throw new Error(
          `Invalid price for ${product.name}.`,
        );
      }

      const discountPercent =
        winningOffer
          ? Math.min(
              100,
              Math.max(
                0,
                winningOffer.numericDiscount,
              ),
            )
          : 0;

      const customerPrice =
        discountPercent > 0
          ? Math.round(
              regularPrice *
                (1 -
                  discountPercent / 100),
            )
          : regularPrice;

      const discountAmount =
        (regularPrice -
          customerPrice) *
        quantity;

      securedItems.push({
        id: requestedItem.id,
        variantId: variant.id,
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: requestedItem.image || "",
        color: variant.color || "",
        size: variant.size || "",

        // Secure server-calculated prices
        price: customerPrice,
        regularPrice,
        discountAmount,

        // Highest applicable offer only
        offerNames: winningOffer
          ? [winningOffer.name]
          : [],

        quantity,
      });
    }

    const regularSubtotal =
      securedItems.reduce(
        (sum, item) =>
          sum +
          item.regularPrice *
            item.quantity,
        0,
      );

    const subtotal =
      securedItems.reduce(
        (sum, item) =>
          sum +
          item.price *
            item.quantity,
        0,
      );

    const discountAmount =
      regularSubtotal - subtotal;

    const { data, error } =
      await supabase
        .from("website_orders")
        .insert({
          customer_name: customerName,
          customer_email: customerEmail,
          phone: normalizedPhone,
          address,
          note,

          items: securedItems,

          regular_subtotal:
            regularSubtotal,
          discount_amount:
            discountAmount,
          subtotal,

          delivery_area: deliveryArea,
          delivery_charge:
            deliveryCharge,

          status: "new",
        })
        .select()
        .single();

    if (error) {
      return NextResponse.json(
        {
          error: `Supabase error: ${error.message}`,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { order: data },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong while placing the order.";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
