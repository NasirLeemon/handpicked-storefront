"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product/product-image";
import { ProductImagePlaceholder } from "@/components/product/product-image-placeholder";
import type { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState({
    productId: product.id,
    index: 0,
  });

  const activeIndex =
    selectedImage.productId === product.id
      ? Math.min(selectedImage.index, product.images.length - 1)
      : 0;
  const mainImage = product.images[activeIndex];

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#F7EFE4] shadow-[0_18px_55px_rgba(47,33,24,0.07)] sm:rounded-[2.25rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,253,249,0.92),rgba(242,232,218,0.72)_58%,rgba(232,220,203,0.82))]" />

        <div className="relative aspect-[4/5] overflow-hidden">
          {mainImage ? (
            <ProductImage
              key={mainImage}
              src={mainImage}
              alt={product.name}
              preload
              sizes="(min-width: 1024px) 50vw, 100vw"
              objectPosition="object-[center_42%]"
              scale="scale-[1.015]"
              hoverScale="group-hover:scale-[1.04]"
            />
          ) : (
            <ProductImagePlaceholder title="Image" label="Product" />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#21160F]/8 via-transparent to-white/20" />
        </div>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:pb-0">
        {product.images.length > 0 ? (
          product.images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage({ productId: product.id, index })}
              aria-label={`Show ${product.name} image ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`group w-16 shrink-0 overflow-hidden rounded-2xl border bg-[#F7EFE4] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-muted-gold hover:shadow-[0_10px_26px_rgba(47,33,24,0.08)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-muted-gold sm:w-auto ${
                index === activeIndex
                  ? "border-muted-gold ring-2 ring-muted-gold/25"
                  : "border-warm-border"
              }`}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,253,249,0.9),rgba(242,232,218,0.76))]">
                <ProductImage
                  src={image}
                  alt={`${product.name} image ${index + 1}`}
                  sizes="(min-width: 640px) 12vw, 64px"
                  objectPosition="object-[center_42%]"
                />
              </div>
            </button>
          ))
        ) : (
          <div className="w-16 shrink-0 overflow-hidden rounded-2xl border border-warm-border bg-[#F7EFE4] sm:w-auto">
            <div className="aspect-[4/5]">
              <ProductImagePlaceholder title="Image" label="Product" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
