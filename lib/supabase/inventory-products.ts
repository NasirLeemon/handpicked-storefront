import { createClient } from "@supabase/supabase-js";
import { products as fallbackProducts } from "@/data/products";
import type { Product, ProductAvailability } from "@/types/product";

const CLOUD_DATA_ID = "main";

type InventoryProductStatus = "Available" | "Low Stock" | "Sold Out";

type InventoryProduct = {
  id: string;
  name: string;
  slug?: string;
  category?: string;
  description?: string;
  details?: string;
  images?: string[];
  featured?: boolean;
  isNewArrival?: boolean;
  showOnStorefront?: boolean;
  color: string;
  size: string;
  costPrice: number;
  sellingPrice: number;
  totalStock: number;
  availableStock: number;
  reservedStock: number;
  soldStock: number;
  returnedStock: number;
  damagedStock: number;
  status: InventoryProductStatus;
};

type InventoryCloudData = {
  products?: InventoryProduct[];
};

type InventoryCloudRow = {
  data: InventoryCloudData | null;
};

function getInventorySupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_INVENTORY_SUPABASE_URL;
  const serviceRoleKey = process.env.INVENTORY_SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
    },
  });
}

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapAvailability(status: InventoryProductStatus): ProductAvailability {
  if (status === "Sold Out") {
    return "sold-out";
  }

  if (status === "Low Stock") {
    return "low-stock";
  }

  return "available";
}

function mapInventoryProduct(product: InventoryProduct): Product {
  const description =
    product.description ||
    `${product.name} in ${product.color}. Message us for size, delivery, and availability support.`;

  return {
    id: product.id,
    slug: product.slug || createSlug(product.name),
    name: product.name,
    price: Number(product.sellingPrice || 0),
    category: product.category || "Uncategorized",
    description,
    details: product.details || description,
    images: product.images || [],
    color: product.color,
    sizes: product.size
      .split(",")
      .map((size) => size.trim())
      .filter(Boolean),
    availability:
      product.availableStock <= 0 ? "sold-out" : mapAvailability(product.status),
    featured: Boolean(product.featured),
    isNewArrival: Boolean(product.isNewArrival),
    availableStock: Number(product.availableStock || 0),
  };
}

export async function getInventoryProductsForStorefront() {
  const supabase = getInventorySupabaseClient();

  if (!supabase) {
    return fallbackProducts;
  }

  const { data, error } = await supabase
    .from("handpicked_app_data")
    .select("data")
    .eq("id", CLOUD_DATA_ID)
    .single<InventoryCloudRow>();

  if (error || !data?.data?.products) {
    return fallbackProducts;
  }

  const storefrontProducts = data.data.products
    .filter((product) => {
      return (
        product.showOnStorefront === true &&
        Array.isArray(product.images) &&
        product.images.length > 0
      );
    })
    .map(mapInventoryProduct);

  if (storefrontProducts.length === 0) {
    return fallbackProducts;
  }

  return storefrontProducts;
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
  currentSlug: string
) {
  const products = await getInventoryProductsForStorefront();

  return products.filter(
    (product) => product.category === category && product.slug !== currentSlug
  );
}
