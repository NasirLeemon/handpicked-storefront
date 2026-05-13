import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { AvailabilityBadge } from "@/components/product/availability-badge";
import { ProductImage } from "@/components/product/product-image";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const imageSrc = product.images[0];

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <article>
        <div className="relative overflow-hidden rounded-[1.5rem] border border-warm-border bg-light-sand transition duration-500 group-hover:-translate-y-1 group-hover:border-muted-gold group-hover:shadow-[0_20px_60px_rgba(47,33,24,0.10)] sm:rounded-[1.75rem]">
          <div className="relative aspect-[4/5] overflow-hidden">
            <ProductImage src={imageSrc} alt={product.name} />
          </div>

          <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
            <AvailabilityBadge availability={product.availability} />
          </div>

          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/45 bg-[#FFFDF9]/80 text-deep-brown opacity-0 shadow-sm backdrop-blur-md transition duration-500 group-hover:opacity-100 sm:right-4 sm:top-4 sm:h-10 sm:w-10">
            <Heart className="h-4 w-4" strokeWidth={1.7} />
          </div>

          <div className="absolute bottom-3 left-3 right-3 translate-y-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-4 sm:left-4 sm:right-4">
            <div className="flex items-center justify-between rounded-full border border-white/35 bg-[#FFFDF9]/82 px-3 py-2.5 text-[10px] font-semibold tracking-[0.16em] text-deep-brown uppercase shadow-sm backdrop-blur-md sm:px-4 sm:py-3 sm:text-xs">
              <span>View Details</span>
              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.7} />
            </div>
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <div className="mb-1.5 flex items-center justify-between gap-3 sm:mb-2">
            <p className="text-[10px] font-semibold tracking-[0.18em] text-muted-gold uppercase sm:text-xs sm:tracking-[0.2em]">
              {product.category}
            </p>

            <p className="shrink-0 text-xs font-semibold text-deep-brown sm:text-sm">
              ৳ {product.price.toLocaleString()}
            </p>
          </div>

          <h3 className="font-serif-brand text-xl font-medium leading-tight tracking-[-0.01em] text-deep-brown transition group-hover:text-muted-gold sm:text-2xl">
            {product.name}
          </h3>

          <p className="mt-1.5 text-xs leading-5 text-soft-brown sm:mt-2 sm:text-sm">
            {product.color} · {product.sizes.join(", ")}
          </p>
        </div>
      </article>
    </Link>
  );
}
