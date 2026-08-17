import { ProductCard } from "@/components/product/product-card";
import { ProductGrid } from "@/components/product/product-grid";
import { getInventoryRelatedProducts } from "@/lib/supabase/inventory-products";
import type { Product } from "@/types/product";

type RelatedProductsSectionProps = {
  product: Product;
};

export async function RelatedProductsSection({
  product,
}: RelatedProductsSectionProps) {
  const relatedProducts = (
    await getInventoryRelatedProducts(product.category, product.slug)
  ).slice(0, 6);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-7 sm:mt-16">
      {/* Compact mobile heading */}
      <div className="sm:hidden">
        <p className="text-[8px] font-semibold tracking-[0.24em] text-muted-gold uppercase">
          You may also like
        </p>

        <div className="mt-1 flex items-end justify-between gap-4">
          <h2 className="font-serif-brand text-[1.7rem] font-medium leading-none tracking-[-0.035em] text-deep-brown">
            Similar Picks
          </h2>

          <span className="shrink-0 text-[9px] tracking-[0.12em] text-soft-brown uppercase">
            Swipe →
          </span>
        </div>
      </div>

      {/* Clean desktop heading */}
      <div className="hidden text-center sm:block">
        <h2 className="font-serif-brand text-[2.4rem] font-medium leading-none tracking-[-0.035em] text-deep-brown lg:text-[2.8rem]">
          You May Also Like
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-soft-brown">
          Explore similar handpicked pieces from the same collection.
        </p>
      </div>

      {/* Mobile: horizontally swipeable products */}
      <div className="-mx-4 mt-4 overflow-x-auto px-4 pb-2 sm:hidden">
        <div className="flex w-max gap-3">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="w-[42vw] max-w-[180px] shrink-0"
            >
              <ProductCard product={relatedProduct} />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet/Desktop: normal product grid */}
      <div className="mt-7 hidden sm:block">
        <ProductGrid
          products={relatedProducts.slice(0, 4)}
          variant="curated"
        />
      </div>
    </section>
  );
}
