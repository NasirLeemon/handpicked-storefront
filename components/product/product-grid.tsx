import { Reveal } from "@/components/common/reveal";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 md:gap-y-10 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {products.map((product, index) => (
        <Reveal key={product.id} delay={(index % 6) * 0.04}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}