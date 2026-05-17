import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type InventoryProductDebug = {
  id?: string;
  name?: string;
  slug?: string;
  availableStock?: number;
  status?: string;
  showOnStorefront?: boolean;
  images?: string[];
};

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_INVENTORY_SUPABASE_URL;
  const serviceRoleKey = process.env.INVENTORY_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({
      ok: false,
      error: "Missing inventory env variables",
      hasUrl: Boolean(supabaseUrl),
      hasServiceRoleKey: Boolean(serviceRoleKey),
    });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });

  const { data, error } = await supabase
    .from("handpicked_app_data")
    .select("id,data")
    .eq("id", "main")
    .single();

  if (error) {
    return NextResponse.json({
      ok: false,
      error: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
  }

  const products: InventoryProductDebug[] = Array.isArray(data?.data?.products)
    ? data.data.products
    : [];

  const storefrontProducts = products.filter(
    (product: InventoryProductDebug) =>
      product.showOnStorefront === true &&
      Array.isArray(product.images) &&
      product.images.length > 0
  );

  return NextResponse.json({
    ok: true,
    rowId: data.id,
    productCount: products.length,
    storefrontProductCount: storefrontProducts.length,
    storefrontProducts: storefrontProducts.map((product: InventoryProductDebug) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      availableStock: product.availableStock,
      status: product.status,
      showOnStorefront: product.showOnStorefront,
      imageCount: Array.isArray(product.images) ? product.images.length : 0,
    })),
  });
}
