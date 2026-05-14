import { Suspense } from "react";
import { ShopProductsClient } from "@/components/shop/shop-products-client";
import { getInventoryProductsForStorefront } from "@/lib/supabase/inventory-products";

export async function ShopProductSection() {
  const products = await getInventoryProductsForStorefront();

  return (
    <section className="bg-ivory px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Suspense fallback={<ShopProductsLoading />}>
          <ShopProductsClient products={products} />
        </Suspense>
      </div>
    </section>
  );
}

function ShopProductsLoading() {
  return (
    <div className="rounded-[1.75rem] border border-warm-border bg-soft-white p-8 text-center">
      <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
        Loading Collection
      </p>

      <p className="mt-3 text-sm text-soft-brown">
        Preparing your handpicked pieces...
      </p>
    </div>
  );
}
