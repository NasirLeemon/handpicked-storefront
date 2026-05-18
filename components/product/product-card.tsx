import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AvailabilityBadge } from "@/components/product/availability-badge";
import { ProductImage } from "@/components/product/product-image";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images[0];

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      <article className="flex h-full flex-col">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-light-sand shadow-sm transition duration-500 group-hover:-translate-y-1 group-hover:border-muted-gold group-hover:shadow-[0_22px_65px_rgba(47,33,24,0.10)]">
          <div className="relative aspect-[4/5] overflow-hidden">
            <ProductImage src={imageSrc} alt={product.name} />

            <div className="absolute inset-0 bg-gradient-to-t from-[#21160F]/16 via-transparent to-transparent opacity-80 transition duration-500 group-hover:opacity-100" />
          </div>

          <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
            <AvailabilityBadge availability={product.availability} />
          </div>

          <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-4 sm:left-4 sm:right-4">
            <div className="flex items-center justify-between rounded-full border border-white/45 bg-[#FFFDF9]/88 px-4 py-3 text-[10px] font-semibold tracking-[0.18em] text-deep-brown uppercase shadow-sm backdrop-blur-md">
              <span>View Details</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#4A3327] text-[#FFFDF9]">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.7} />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-muted-gold uppercase">
                {product.category}
              </p>

              <h3 className="mt-1.5 text-[1.05rem] font-medium leading-6 tracking-[-0.01em] text-deep-brown transition group-hover:text-muted-gold sm:text-[1.12rem]">
                {product.name}
              </h3>
            </div>

            <p className="shrink-0 text-sm font-semibold text-deep-brown sm:text-[0.95rem]">
              ৳ {product.price.toLocaleString()}
            </p>
          </div>

          <p className="mt-1.5 text-xs leading-5 text-soft-brown sm:text-[0.82rem]">
            {product.color} · {product.sizes.join(", ")}
          </p>
        </div>
      </article>
    </Link>
  );
}
