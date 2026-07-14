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
    {
  url: `${baseUrl}/shipping-and-delivery`,
  lastModified: now,
  changeFrequency: "monthly",
  priority: 0.6,
},
{
  url: `${baseUrl}/returns-and-refunds`,
  lastModified: now,
  changeFrequency: "monthly",
  priority: 0.6,
},
{
  url: `${baseUrl}/privacy-policy`,
  lastModified: now,
  changeFrequency: "yearly",
  priority: 0.4,
},
{
  url: `${baseUrl}/terms-and-conditions`,
  lastModified: now,
  changeFrequency: "yearly",
  priority: 0.4,
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