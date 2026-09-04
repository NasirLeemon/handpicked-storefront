"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product/product-image";
import { ProductImagePlaceholder } from "@/components/product/product-image-placeholder";
import type { Product } from "@/types/product";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({
  product,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState({
    productId: product.id,
    index: 0,
  });

  const activeIndex =
    selectedImage.productId === product.id
      ? Math.min(
          selectedImage.index,
          Math.max(0, product.images.length - 1),
        )
      : 0;

  const mainImage = product.images[activeIndex];

  return (
    <div className="min-w-0">
      {/* Desktop gallery */}
      <div className="hidden gap-4 sm:grid sm:grid-cols-[84px_minmax(0,1fr)] lg:gap-5 xl:grid-cols-[96px_minmax(0,1fr)]">
        <div className="max-h-[640px] space-y-3 overflow-y-auto pr-1">
          {product.images.length > 0 ? (
            product.images.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedImage({
                      productId: product.id,
                      index,
                    })
                  }
                  aria-label={`Show ${product.name} image ${index + 1}`}
                  aria-current={
                    isActive ? "true" : undefined
                  }
                  className={[
                    "group block w-full overflow-hidden rounded-2xl border bg-white transition",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-muted-gold",
                    isActive
                      ? "border-muted-gold shadow-[0_6px_18px_rgba(47,33,24,0.08)] ring-1 ring-muted-gold/20"
                      : "border-warm-border hover:border-muted-gold/70",
                  ].join(" ")}
                >
                  <div className="relative aspect-square bg-white p-2">
                    <ProductImage
                      src={image}
                      alt={`${product.name} image ${index + 1}`}
                      fit="contain"
                      objectPosition="object-center"
                      sizes="96px"
                      className="p-1"
                    />
                  </div>
                </button>
              );
            })
          ) : (
            <div className="overflow-hidden rounded-2xl border border-warm-border bg-white">
              <div className="aspect-square">
                <ProductImagePlaceholder
                  title="Image"
                  label="Product"
                />
              </div>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden rounded-[1.5rem] border border-warm-border bg-white shadow-[0_12px_36px_rgba(47,33,24,0.045)] lg:rounded-[1.75rem]">
          <div className="relative h-[560px] lg:h-[620px] xl:h-[660px]">
            {mainImage ? (
              <ProductImage
                key={`${mainImage}-desktop`}
                src={mainImage}
                alt={product.name}
                preload
                fit="contain"
                sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 46vw, 55vw"
                objectPosition="object-center"
                scale="scale-100"
                hoverScale="group-hover:scale-[1.01]"
                className="p-7 lg:p-9 xl:p-10"
              />
            ) : (
              <ProductImagePlaceholder
                title="Image"
                label="Product"
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile gallery */}
      <div className="sm:hidden">
        <div className="overflow-hidden rounded-[1.4rem] border border-warm-border bg-white shadow-[0_10px_28px_rgba(47,33,24,0.045)]">
          <div className="relative h-[390px]">
            {mainImage ? (
              <ProductImage
                key={`${mainImage}-mobile`}
                src={mainImage}
                alt={product.name}
                preload
                fit="contain"
                sizes="100vw"
                objectPosition="object-center"
                scale="scale-100"
                hoverScale="group-hover:scale-100"
                className="p-5"
              />
            ) : (
              <ProductImagePlaceholder
                title="Image"
                label="Product"
              />
            )}
          </div>
        </div>

        {product.images.length > 0 ? (
          <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1">
            {product.images.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() =>
                    setSelectedImage({
                      productId: product.id,
                      index,
                    })
                  }
                  aria-label={`Show ${product.name} image ${index + 1}`}
                  aria-current={
                    isActive ? "true" : undefined
                  }
                  className={[
                    "w-[68px] shrink-0 overflow-hidden rounded-xl border bg-white transition",
                    isActive
                      ? "border-muted-gold ring-1 ring-muted-gold/25"
                      : "border-warm-border",
                  ].join(" ")}
                >
                  <div className="relative aspect-square p-1.5">
                    <ProductImage
                      src={image}
                      alt={`${product.name} image ${index + 1}`}
                      fit="contain"
                      objectPosition="object-center"
                      sizes="68px"
                      className="p-1"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
