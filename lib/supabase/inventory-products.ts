import { createClient } from "@supabase/supabase-js";
import type { Product, ProductAvailability } from "@/types/product";

type CategoryRelation = {
  name: string;
} | null;

type VariantRow = {
  id: string;
  sku: string;
  color: string | null;
  size: string | null;
  selling_price: number | string;
  available_stock: number;
  low_stock_threshold: number;
  is_default: boolean;
  is_active: boolean;
};

type ImageRow = {
  url: string;
  display_order: number;
  is_primary: boolean;
};

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  details: string | null;
  is_featured: boolean;
  is_new_arrival: boolean;
  show_on_storefront: boolean;
  status: "active" | "archived";
  categories: CategoryRelation | CategoryRelation[];
  product_variants: VariantRow[];
  product_images: ImageRow[];
};

function getInventorySupabaseClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_INVENTORY_SUPABASE_URL;

  const serviceRoleKey =
    process.env.INVENTORY_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

function getAvailability(
  availableStock: number,
  lowStockThreshold: number,
): ProductAvailability {
  if (availableStock <= 0) {
    return "sold-out";
  }

  if (availableStock <= lowStockThreshold) {
    return "low-stock";
  }

  return "available";
}

function mapProduct(row: ProductRow): Product | null {
  const activeVariants = row.product_variants.filter(
    (variant) => variant.is_active,
  );

  if (activeVariants.length === 0) {
    return null;
  }

  const defaultVariant =
    activeVariants.find((variant) => variant.is_default) ??
    activeVariants[0];

  const sortedImages = [...row.product_images].sort(
    (a, b) => a.display_order - b.display_order,
  );

  const images = sortedImages.map((image) => image.url);

  if (images.length === 0) {
    return null;
  }

  const categoryRelation = Array.isArray(row.categories)
    ? row.categories[0] ?? null
    : row.categories;

  const sizes = [
    ...new Set(
      activeVariants
        .map((variant) => variant.size?.trim())
        .filter((size): size is string => Boolean(size)),
    ),
  ];

  const colors = [
    ...new Set(
      activeVariants
        .map((variant) => variant.color?.trim())
        .filter((color): color is string => Boolean(color)),
    ),
  ];

  const availableStock = activeVariants.reduce(
    (sum, variant) => sum + Number(variant.available_stock || 0),
    0,
  );

  const lowStockThreshold = activeVariants.reduce(
    (sum, variant) => sum + Number(variant.low_stock_threshold || 0),
    0,
  );

  const description =
    row.description ||
    row.short_description ||
    `${row.name}. Message us for delivery and availability support.`;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    price: Number(defaultVariant.selling_price || 0),
    category: categoryRelation?.name || "Uncategorized",
    description,
    details: row.details || description,
    images,
    color: colors.join(", "),
    sizes,
    availability: getAvailability(
      availableStock,
      lowStockThreshold,
    ),
    featured: row.is_featured,
    isNewArrival: row.is_new_arrival,
    availableStock,
  };
}

export async function getInventoryProductsForStorefront(): Promise<Product[]> {
  const supabase = getInventorySupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      short_description,
      description,
      details,
      is_featured,
      is_new_arrival,
      show_on_storefront,
      status,
      categories (
        name
      ),
      product_variants (
        id,
        sku,
        color,
        size,
        selling_price,
        available_stock,
        low_stock_threshold,
        is_default,
        is_active
      ),
      product_images (
        url,
        display_order,
        is_primary
      )
    `)
    .eq("status", "active")
    .eq("show_on_storefront", true)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Failed to load V2 storefront products:", error);
    return [];
  }

  return ((data ?? []) as unknown as ProductRow[])
    .map(mapProduct)
    .filter((product): product is Product => product !== null);
}

export async function getInventoryProductBySlug(slug: string) {
  const products = await getInventoryProductsForStorefront();

  return products.find((product) => product.slug === slug);
}

export async function getInventoryNewArrivals() {
  const products = await getInventoryProductsForStorefront();

  return products.filter((product) => product.isNewArrival);
}

export async function getInventoryRelatedProducts(
  category: string,
  currentSlug: string,
) {
  const products = await getInventoryProductsForStorefront();

  return products.filter(
    (product) =>
      product.category === category &&
      product.slug !== currentSlug,
  );
}
