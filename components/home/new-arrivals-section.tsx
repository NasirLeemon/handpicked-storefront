import { BoutiqueButton } from "@/components/common/boutique-button";
import { SectionHeading } from "@/components/home/section-heading";
import { ProductGrid } from "@/components/product/product-grid";
import { getNewArrivals } from "@/lib/products";

export function NewArrivalsSection() {
  const products = getNewArrivals().slice(0, 8);

  return (
    <section className="bg-ivory px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Freshly Selected"
          title="New Arrivals"
          description="Freshly selected pieces for your wardrobe, chosen with soft details, graceful shapes, and everyday elegance."
        />

        <div className="mt-12">
          <ProductGrid products={products} />
        </div>

        <div className="mt-12 flex justify-center">
          <BoutiqueButton href="/shop" variant="secondary">
            View All Products
          </BoutiqueButton>
        </div>
      </div>
    </section>
  );
}
