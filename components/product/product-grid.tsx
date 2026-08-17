import { Reveal } from "@/components/common/reveal";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
  variant?: "catalog" | "curated" | "featured";
};

export function ProductGrid({
  products,
  variant = "catalog",
}: ProductGridProps) {
  const gridColumns =
    variant === "featured"
      ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4"
      : variant === "curated"
        ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6";

  return (
    <div
      className={`grid ${gridColumns} gap-x-2.5 gap-y-4 sm:gap-x-4 sm:gap-y-8 md:gap-y-10`}
    >
      {products.map((product, index) => (
        <div
          key={product.id}
          className={
            variant === "featured" && index >= 6
              ? "hidden md:block"
              : undefined
          }
        >
          <Reveal delay={(index % 6) * 0.04}>
            <ProductCard product={product} />
          </Reveal>
        </div>
      ))}
    </div>
  );
}