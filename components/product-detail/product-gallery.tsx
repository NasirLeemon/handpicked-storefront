import { ProductImage } from "@/components/product/product-image";
import { ProductImagePlaceholder } from "@/components/product/product-image-placeholder";
import type { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const mainImage = product.images[0];

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_18px_55px_rgba(47,33,24,0.07)] sm:rounded-[2.25rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(176,138,85,0.08),transparent_34%)]" />

        <div className="relative aspect-[4/4.8] overflow-hidden sm:aspect-[4/5] lg:h-[min(62vh,590px)] lg:min-h-[470px] lg:aspect-auto">
          {mainImage ? (
            <ProductImage src={mainImage} alt={product.name} priority />
          ) : (
            <ProductImagePlaceholder title="Image" label="Product" />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#21160F]/8 via-transparent to-transparent" />
        </div>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:pb-0">
        {product.images.length > 0 ? (
          product.images.map((image, index) => (
            <div
              key={image}
              className="group w-16 shrink-0 overflow-hidden rounded-2xl border border-warm-border bg-[#FFFDF9] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-muted-gold hover:shadow-[0_10px_26px_rgba(47,33,24,0.08)] sm:w-auto"
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
          <div className="w-16 shrink-0 overflow-hidden rounded-2xl border border-warm-border bg-[#FFFDF9] sm:w-auto">
            <div className="aspect-square">
              <ProductImagePlaceholder title="Image" label="Product" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
