import Link from "next/link";
import { Heart } from "lucide-react";
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
      <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-light-sand transition duration-500 group-hover:-translate-y-1 group-hover:border-muted-gold group-hover:shadow-[0_18px_60px_rgba(47,33,24,0.1)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <ProductImage src={imageSrc} alt={product.name} />
        </div>

        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#FFFDF9]/85 text-deep-brown opacity-0 shadow-sm backdrop-blur-md transition duration-500 group-hover:opacity-100">
          <Heart className="h-4 w-4" strokeWidth={1.7} />
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-medium text-deep-brown transition group-hover:text-muted-gold">
            {product.name}
          </h3>

          <p className="shrink-0 font-medium text-deep-brown">
            ৳ {product.price.toLocaleString()}
          </p>
        </div>

        <p className="text-sm text-soft-brown">
          {product.color} · {product.sizes.join(", ")}
        </p>

        <AvailabilityBadge availability={product.availability} />
      </div>
    </Link>
  );
}
