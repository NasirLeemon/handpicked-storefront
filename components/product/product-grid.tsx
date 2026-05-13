import { Reveal } from "@/components/common/reveal";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-12">
      {products.map((product, index) => (
        <Reveal key={product.id} delay={(index % 4) * 0.06}>
          <ProductCard product={product} />
        </Reveal>
      ))}
    </div>
  );
}
