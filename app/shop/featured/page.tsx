export const dynamic = "force-dynamic";
export const revalidate = 0;

import { CategoryScrollToTop } from "@/components/shop/category-scroll-to-top";
import { ShopProductsClient } from "@/components/shop/shop-products-client";
import { getInventoryProductsForStorefront } from "@/lib/supabase/inventory-products";

export default async function FeaturedProductsPage() {
  const products = await getInventoryProductsForStorefront();

  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <main className="min-h-screen bg-ivory text-deep-brown">
      <CategoryScrollToTop />

      <section className="px-4 pb-2 pt-4 sm:px-6 sm:pb-4 sm:pt-7 lg:px-8">
        <div className="mx-auto max-w-7xl md:text-center">
          <h1 className="font-serif-brand text-[2.15rem] font-medium leading-none tracking-[-0.04em] text-deep-brown sm:text-5xl">
            Featured Picks
          </h1>

          <p className="mt-2 text-[11px] text-soft-brown sm:text-sm">
            {featuredProducts.length}{" "}
            {featuredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ShopProductsClient
            products={featuredProducts}
            catalogOnly
          />
        </div>
      </section>
    </main>
  );
}
