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
        <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-light-sand transition duration-500 group-hover:-translate-y-1 group-hover:border-muted-gold group-hover:shadow-[0_20px_60px_rgba(47,33,24,0.10)]">
          <div className="relative aspect-[4/5] overflow-hidden">
            <ProductImage src={imageSrc} alt={product.name} />
          </div>

          <div className="absolute left-4 top-4">
            <AvailabilityBadge availability={product.availability} />
          </div>

          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-[#FFFDF9]/80 text-deep-brown opacity-0 shadow-sm backdrop-blur-md transition duration-500 group-hover:opacity-100">
            <Heart className="h-4 w-4" strokeWidth={1.7} />
          </div>

          <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-between rounded-full border border-white/35 bg-[#FFFDF9]/82 px-4 py-3 text-xs font-semibold tracking-[0.18em] text-deep-brown uppercase shadow-sm backdrop-blur-md">
              <span>View Details</span>
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-gold uppercase">
              {product.category}
            </p>

            <p className="text-sm font-medium text-deep-brown">
              ৳ {product.price.toLocaleString()}
            </p>
          </div>

          <h3 className="font-serif-brand text-2xl font-medium leading-tight tracking-[-0.01em] text-deep-brown transition group-hover:text-muted-gold">
            {product.name}
          </h3>

          <p className="mt-2 text-sm text-soft-brown">
            {product.color} · {product.sizes.join(", ")}
          </p>
        </div>
      </article>
    </Link>
  );
}
