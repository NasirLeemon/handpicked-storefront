"use client";

import { useRef, useState } from "react";
import { ShieldCheck, Sparkles, Truck } from "lucide-react";
import { AvailabilityBadge } from "@/components/product/availability-badge";
import { ProductActionButtons } from "@/components/product-detail/product-action-buttons";
import { QuantitySelector } from "@/components/product-detail/quantity-selector";
import { SizeSelector } from "@/components/product-detail/size-selector";
import type { Product } from "@/types/product";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({
  product,
}: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);
  const [validationAttempt, setValidationAttempt] = useState(0);

  const sizeSectionRef = useRef<HTMLDivElement>(null);

  const availableStock = Number(product.availableStock ?? 0);

  const isSoldOut =
    product.availability === "sold-out" || availableStock <= 0;

  function decreaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1)
    );
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.min(availableStock, currentQuantity + 1)
    );
  }

  function handleSelectSize(size: string) {
    setSelectedSize(size);
    setShowSizeError(false);
  }

  function handleSizeRequired() {
    setShowSizeError(true);
    setValidationAttempt((currentAttempt) => currentAttempt + 1);

    window.requestAnimationFrame(() => {
      sizeSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  return (
    <aside className="self-start">
      <div className="px-1 py-1 sm:px-2 lg:px-3 lg:py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase">
              {product.category}
            </p>

            <span className="hidden text-warm-border sm:inline">•</span>

            <div className="hidden items-center gap-1.5 text-[11px] text-soft-brown sm:flex">
              <Sparkles className="h-3.5 w-3.5 text-muted-gold" />
              Handpicked
            </div>
          </div>

          <AvailabilityBadge availability={product.availability} />
        </div>

        <h1 className="mt-3 max-w-[34rem] text-[1.35rem] font-semibold leading-[1.16] tracking-[-0.035em] text-deep-brown sm:text-[1.9rem] lg:text-[2rem]">
          {product.name}
        </h1>

        <div className="mt-4 flex items-center justify-between border-b border-warm-border pb-4">
          <p className="text-[1.55rem] font-semibold tracking-[-0.035em] text-deep-brown">
            ৳ {product.price.toLocaleString()}
          </p>

          <p className="hidden text-[11px] text-soft-brown sm:block">
            Stock confirmed before dispatch
          </p>
        </div>

        <p className="mt-4 hidden max-w-[32rem] text-[13px] leading-[1.7] text-soft-brown sm:block">
          {product.description}
        </p>

        <div className="mt-4 border-t border-warm-border pt-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-gold uppercase">
              Size
            </p>

            <p className="text-[11px] text-soft-brown">
              Color{" "}
              <span className="font-semibold text-deep-brown">
                {product.color}
              </span>
            </p>
          </div>

          <SizeSelector
            ref={sizeSectionRef}
            sizes={product.sizes}
            selectedSize={selectedSize}
            availableStock={availableStock}
            isSoldOut={isSoldOut}
            showError={showSizeError}
            validationAttempt={validationAttempt}
            onSelectSize={handleSelectSize}
          />
        </div>

        <div className="mt-3.5">
          <QuantitySelector
            quantity={quantity}
            maxQuantity={availableStock}
            onDecrease={decreaseQuantity}
            onIncrease={increaseQuantity}
          />
        </div>

        <div className="mt-4">
          <ProductActionButtons
            product={product}
            isSoldOut={isSoldOut}
            selectedSize={selectedSize}
            quantity={quantity}
            onSizeRequired={handleSizeRequired}
          />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-warm-border pt-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-muted-gold" />
            <span className="text-[10px] text-soft-brown">
              Quality checked
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 shrink-0 text-muted-gold" />
            <span className="text-[10px] text-soft-brown">
              BD delivery
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-muted-gold" />
            <span className="text-[10px] text-soft-brown">
              Order reviewed
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
