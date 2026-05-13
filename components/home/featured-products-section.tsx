import { BoutiqueButton } from "@/components/common/boutique-button";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { getFeaturedProducts } from "@/lib/products";

export function FeaturedProductsSection() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <section className="bg-soft-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Handpicked Edit"
          title="Featured Picks"
          description="A refined selection of boutique pieces chosen for their color, detail, and graceful everyday styling."
        />

        <div className="mt-12">
          <ProductGrid products={products} />
        </div>

        <div className="mt-12 flex justify-center">
          <BoutiqueButton href="/shop" variant="secondary">
            Shop the Collection
          </BoutiqueButton>
        </div>
      </div>
    </section>
  );
}
