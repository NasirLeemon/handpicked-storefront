import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getHomeDepartmentProducts } from "@/lib/home/home-departments";
import { getInventoryProductsForStorefront } from "@/lib/supabase/inventory-products";

export async function VisualCategorySection() {
  const products =
    await getInventoryProductsForStorefront();

  const departments =
    getHomeDepartmentProducts(products).filter(
      (item) => item.product,
    );

  return (
    <section
      id="shop-by-category"
      className="bg-[#FFFDF9] px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-serif-brand text-3xl font-medium tracking-[-0.045em] text-deep-brown sm:text-4xl">
            Shop by category
          </h2>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-deep-brown"
          >
            View all
            <ArrowRight
              className="h-4 w-4"
              strokeWidth={1.6}
            />
          </Link>
        </div>

        <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:gap-3 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0 lg:pb-0">
          {departments.map((department) => {
            const product = department.product!;

            return (
              <Link
                key={department.id}
                href={department.href}
                className="group min-w-[44vw] snap-start sm:min-w-[30vw] lg:min-w-0"
              >
                <div className="relative aspect-[4/5] overflow-hidden border border-warm-border/70 bg-[#F4EEE7]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 639px) 44vw, (max-width: 1023px) 30vw, 20vw"
                    className="object-contain p-4 transition duration-700 group-hover:scale-[1.035] sm:p-5"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2F2118]/90 via-[#2F2118]/45 to-transparent px-3 pb-3 pt-12 sm:px-4 sm:pb-4">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-white sm:text-base">
                        {department.label}
                      </p>

                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-white transition group-hover:translate-x-1"
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
