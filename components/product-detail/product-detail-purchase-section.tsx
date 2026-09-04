"use client";

import { useState } from "react";

import { ProductGallery } from "@/components/product-detail/product-gallery";
import { ProductPurchasePanel } from "@/components/product-detail/product-purchase-panel";
import type { Product } from "@/types/product";

type ProductDetailPurchaseSectionProps = {
  product: Product;
};

export function ProductDetailPurchaseSection({
  product,
}: ProductDetailPurchaseSectionProps) {
  const [
    selectedVariantId,
    setSelectedVariantId,
  ] = useState<string | null>(null);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12 xl:gap-16">
      <ProductGallery
        product={product}
        selectedVariantId={selectedVariantId}
      />

      <ProductPurchasePanel
        product={product}
        onSelectedVariantChange={
          setSelectedVariantId
        }
      />
    </div>
  );
}
