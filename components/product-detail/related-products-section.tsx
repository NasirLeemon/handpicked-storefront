import { SectionHeading } from "@/components/home/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { getRelatedProducts } from "@/lib/products";
import type { Product } from "@/types/product";

type RelatedProductsSectionProps = {
  product: Product;
};

export function RelatedProductsSection({ product }: RelatedProductsSectionProps) {
  const relatedProducts = getRelatedProducts(product.category, product.id);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-20">
      <SectionHeading
        eyebrow="Curated Picks"
        title="You May Also Like"
        description="Explore similar handpicked pieces from the same collection."
      />

      <div className="mt-12">
        <ProductGrid products={relatedProducts} />
      </div>
    </section>
  );
}
