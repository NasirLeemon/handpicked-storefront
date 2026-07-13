import type { MetadataRoute } from "next";
import { getInventoryProductsForStorefront } from "@/lib/supabase/inventory-products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://handpickedbd.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const products = await getInventoryProductsForStorefront();

    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticPages, ...productPages];
  } catch (error) {
    console.error("Failed to generate product sitemap:", error);

    return staticPages;
  }
}