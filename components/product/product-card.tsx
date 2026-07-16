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
      <article className="overflow-hidden rounded-[1.4rem] border border-warm-border/70 bg-[#FFFDF9] transition duration-300 group-hover:border-muted-gold group-hover:shadow-[0_18px_45px_rgba(47,33,24,0.08)]">
       <div className="relative overflow-hidden rounded-t-[1.4rem] border-b border-warm-border bg-[#F7EFE4]">
          <div className="relative aspect-[4/5] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,253,249,0.88),rgba(242,232,218,0.72)_58%,rgba(232,220,203,0.84))]">
            <ProductImage
              src={imageSrc}
              alt={`${product.name} in ${product.color} – ${product.category} from Handpicked`}
              objectPosition="object-[center_42%]"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#21160F]/14 via-transparent to-white/10 opacity-80 transition duration-500 group-hover:opacity-100" />
          </div>

          <div className="absolute left-3 top-3">
            <AvailabilityBadge availability={product.availability} />
          </div>

          <div className="absolute bottom-3 left-3 right-3 translate-y-2 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-between rounded-full border border-white/45 bg-[#FFFDF9]/88 px-3.5 py-2.5 text-[9px] font-semibold tracking-[0.17em] text-deep-brown uppercase shadow-sm backdrop-blur-md">
              <span>View Details</span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#4A3327] text-[#FFFDF9]">
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.7} />
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[9px] font-semibold tracking-[0.24em] text-muted-gold uppercase">
                {product.category}
              </p>

              <h3 className="mt-1 line-clamp-2 min-h-[2.6rem] font-medium leading-5 tracking-[-0.015em] text-deep-brown transition group-hover:text-muted-gold sm:text-[0.98rem]">
                {product.name}
              </h3>
            </div>

            <p className="shrink-0 pt-[1px] text-[0.82rem] font-semibold text-deep-brown sm:text-[0.86rem]">
              ৳ {product.price.toLocaleString()}
            </p>
          </div>

          <p className="mt-1.5 line-clamp-1 text-[0.72rem] leading-5 text-soft-brown sm:text-[0.76rem]">
            {product.color} · {product.sizes.join(", ")}
          </p>
        </div>
      </article>
    </Link>
  );
}