import { createClient } from "@supabase/supabase-js";
import { products as fallbackProducts } from "@/data/products";
import type { Product, ProductAvailability } from "@/types/product";

type DatabaseProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  details: string | null;
  images: string[];
  color: string;
  sizes: string[];
  availability: ProductAvailability;
  featured: boolean;
  is_new_arrival: boolean;
  created_at: string;
};

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return null;
  }

  return createClient(supabaseUrl, anonKey);
}

function mapProduct(product: DatabaseProduct): Product {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    details: product.details || product.description,
    images: product.images || [],
    color: product.color,
    sizes: product.sizes || [],
    availability: product.availability,
    featured: product.featured,
    isNewArrival: product.is_new_arrival,
  };
}

export async function getAllProductsFromDatabase() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return fallbackProducts;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return fallbackProducts;
  }

  return data.map((product) => mapProduct(product as DatabaseProduct));
}

export async function getProductBySlugFromDatabase(slug: string) {
  const products = await getAllProductsFromDatabase();

  return products.find((product) => product.slug === slug);
}

export async function getNewArrivalsFromDatabase() {
  const products = await getAllProductsFromDatabase();

  return products.filter((product) => product.isNewArrival);
}

export async function getRelatedProductsFromDatabase(
  category: string,
  currentSlug: string
) {
  const products = await getAllProductsFromDatabase();

  return products.filter(
    (product) => product.category === category && product.slug !== currentSlug
  );
}
