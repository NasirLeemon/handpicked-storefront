import { ProductImage } from "@/components/product/product-image";
import { ProductImagePlaceholder } from "@/components/product/product-image-placeholder";
import type { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const mainImage = product.images[0];

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="group overflow-hidden rounded-[1.75rem] border border-warm-border bg-light-sand shadow-sm sm:rounded-[2.5rem]">
        <div className="relative aspect-[4/4.6] overflow-hidden sm:aspect-[4/5]">
          <ProductImage src={mainImage} alt={product.name} priority />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:pb-0">
        {product.images.length > 0 ? (
          product.images.map((image, index) => (
            <div
              key={image}
              className="group w-16 shrink-0 overflow-hidden rounded-xl border border-warm-border bg-light-sand shadow-sm transition hover:border-muted-gold sm:w-auto sm:rounded-2xl"
            >
              <div className="relative aspect-square overflow-hidden">
                <ProductImage
                  src={image}
                  alt={`${product.name} image ${index + 1}`}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="w-16 shrink-0 overflow-hidden rounded-xl border border-warm-border bg-light-sand sm:w-auto sm:rounded-2xl">
            <div className="aspect-square">
              <ProductImagePlaceholder title="Image" label="Product" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
