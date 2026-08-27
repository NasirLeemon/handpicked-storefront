import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProductGrid } from "@/components/product/product-grid";
import { getInventoryNewArrivals } from "@/lib/supabase/inventory-products";

export async function NewArrivalsSection() {
  const products = (await getInventoryNewArrivals()).slice(0, 8);

  return (
    <section className="bg-ivory px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-muted-gold">
              New In
            </p>

            <h2 className="mt-1 font-serif-brand text-3xl font-medium tracking-[-0.045em] text-deep-brown sm:text-4xl">
              New at Handpicked
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-deep-brown"
          >
            Shop all
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </Link>
        </div>

        <div className="mt-6 sm:mt-8">
          <ProductGrid products={products} variant="featured" />
        </div>
      </div>
    </section>
  );
}
