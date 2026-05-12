"use client";

import { useState } from "react";
import { AvailabilityBadge } from "@/components/product/availability-badge";
import { ProductActionButtons } from "@/components/product-detail/product-action-buttons";
import { QuantitySelector } from "@/components/product-detail/quantity-selector";
import { SizeSelector } from "@/components/product-detail/size-selector";
import type { Product } from "@/types/product";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const isSoldOut = product.availability === "sold-out";

  function decreaseQuantity() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) => currentQuantity + 1);
  }

  return (
    <div className="lg:sticky lg:top-32">
      <p className="mb-4 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
        {product.category}
      </p>

      <h1 className="font-serif-brand text-5xl font-semibold leading-tight tracking-tight text-deep-brown">
        {product.name}
      </h1>

      <p className="mt-4 text-2xl font-medium text-deep-brown">
        ৳ {product.price.toLocaleString()}
      </p>

      <div className="mt-5">
        <AvailabilityBadge availability={product.availability} />
      </div>

      <p className="mt-6 text-base leading-8 text-soft-brown">
        {product.description}
      </p>

      <div className="mt-8 border-t border-warm-border pt-6">
        <p className="text-sm font-medium text-deep-brown">
          Color: <span className="text-soft-brown">{product.color}</span>
        </p>

        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />

        <QuantitySelector
          quantity={quantity}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
        />
      </div>

      <ProductActionButtons
        isSoldOut={isSoldOut}
        selectedSize={selectedSize}
        quantity={quantity}
        productSlug={product.slug}
      />

      <div className="mt-6 rounded-2xl border border-muted-gold/40 bg-light-sand p-5">
        <p className="text-sm leading-7 text-soft-brown">
          Inside Dhaka delivery is available. For orders outside Dhaka, advance
          payment is required before dispatch.
        </p>
      </div>
    </div>
  );
}
