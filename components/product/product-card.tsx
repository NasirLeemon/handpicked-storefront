import Link from "next/link";
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
      <div className="overflow-hidden rounded-[1.75rem] border border-warm-border bg-light-sand">
        <div className="relative aspect-[4/5] overflow-hidden">
          <ProductImage src={imageSrc} alt={product.name} />
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
