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
  const availableStock = Number(product.availableStock ?? 0);
  const isSoldOut = product.availability === "sold-out" || availableStock <= 0;

  function decreaseQuantity() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.min(availableStock, currentQuantity + 1)
    );
  }

  return (
    <aside className="rounded-[1.25rem] border border-warm-border bg-soft-white p-4 shadow-sm sm:rounded-[2rem] sm:p-6 lg:sticky lg:top-32 lg:p-8">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase sm:text-xs">
          {product.category}
        </p>

        <AvailabilityBadge availability={product.availability} />
      </div>

      <h1 className="mt-3 font-serif-brand text-3xl font-medium leading-none tracking-[-0.035em] text-deep-brown sm:mt-5 sm:text-6xl">
        {product.name}
      </h1>

      <p className="mt-3 text-2xl font-semibold text-deep-brown sm:mt-5">
        ৳ {product.price.toLocaleString()}
      </p>

      <p className="mt-3 text-sm leading-6 text-soft-brown sm:mt-6 sm:text-base sm:leading-8">
        {product.description}
      </p>

      <div className="mt-4 rounded-[1rem] border border-warm-border bg-ivory p-3 sm:mt-8 sm:rounded-[1.5rem] sm:p-5">
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
          maxQuantity={availableStock}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
        />
      </div>

      <ProductActionButtons
        product={product}
        isSoldOut={isSoldOut}
        selectedSize={selectedSize}
        quantity={quantity}
      />

      <p className="mt-3 text-xs leading-5 text-soft-brown sm:mt-5 sm:text-sm sm:leading-6">
        Delivery charge, availability, and payment details will be confirmed
        after your order request.
      </p>
    </aside>
  );
}
