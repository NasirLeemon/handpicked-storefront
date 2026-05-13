import { ProductImage } from "@/components/product/product-image";
import { ProductImagePlaceholder } from "@/components/product/product-image-placeholder";
import type { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const mainImage = product.images[0];

  return (
    <div className="space-y-4">
      <div className="group overflow-hidden rounded-[2.5rem] border border-warm-border bg-light-sand shadow-sm">
        <div className="relative aspect-[4/5] overflow-hidden">
          <ProductImage src={mainImage} alt={product.name} priority />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {product.images.length > 0 ? (
          product.images.map((image, index) => (
            <div
              key={image}
              className="group overflow-hidden rounded-2xl border border-warm-border bg-light-sand shadow-sm transition hover:border-muted-gold"
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
          <div className="overflow-hidden rounded-2xl border border-warm-border bg-light-sand">
            <div className="aspect-square">
              <ProductImagePlaceholder title="Image" label="Product" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
