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
      <div className="relative overflow-hidden rounded-[2rem] border border-warm-border bg-[#FFFDF9] shadow-[0_22px_70px_rgba(47,33,24,0.08)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.12),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

        <div className="relative p-4 sm:p-6 lg:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.28em] text-muted-gold uppercase">
                {product.category}
              </p>

              <div className="mt-3 hidden w-fit items-center gap-2 rounded-full border border-warm-border bg-white/70 px-3 py-1.5 text-[11px] font-medium text-soft-brown shadow-sm backdrop-blur-sm sm:flex">
                <Sparkles className="h-3.5 w-3.5 text-muted-gold" />
                Handpicked selection
              </div>
            </div>

            <AvailabilityBadge availability={product.availability} />
          </div>

          <h1 className="mt-3 max-w-2xl text-[1.28rem] font-medium leading-[1.12] tracking-[-0.035em] text-deep-brown sm:mt-4 sm:text-[2.15rem] lg:text-[2.35rem]">
            {product.name}
          </h1>

          <div className="mt-4 border-b border-warm-border pb-3 sm:flex sm:items-end sm:justify-between sm:gap-5 sm:pb-4">
            <div>
              <p className="text-[9px] font-semibold tracking-[0.18em] text-taupe uppercase sm:text-[10px] sm:tracking-[0.22em]">
                Price
              </p>

              <p className="mt-1 text-[1.35rem] font-semibold tracking-[-0.035em] text-deep-brown sm:text-[1.7rem]">
                ৳ {product.price.toLocaleString()}
              </p>
            </div>

            <p className="hidden max-w-[10rem] text-right text-xs leading-5 text-soft-brown sm:block">
              Stock and delivery are confirmed before dispatch.
            </p>
          </div>

          <p className="mt-4 hidden max-w-xl text-sm leading-6 text-soft-brown sm:block sm:text-[0.92rem]">
            {product.description}
          </p>

          <div className="mt-3 sm:mt-5">
            <div className="mb-2 flex items-center justify-between gap-4 sm:mb-5">
              <p className="text-[9px] font-semibold tracking-[0.18em] text-muted-gold uppercase sm:text-xs sm:tracking-[0.24em]">
                Choose Your Size
              </p>

              <p className="text-[0.72rem] text-soft-brown sm:text-sm">
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

            <QuantitySelector
              quantity={quantity}
              maxQuantity={availableStock}
              onDecrease={decreaseQuantity}
              onIncrease={increaseQuantity}
            />
          </div>

          <div className="mt-6">
            <ProductActionButtons
              product={product}
              isSoldOut={isSoldOut}
              selectedSize={selectedSize}
              quantity={quantity}
              onSizeRequired={handleSizeRequired}
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-warm-border pt-3 sm:mt-5 sm:grid-cols-3 sm:gap-2 sm:pt-4">
            <div className="flex gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-gold" />

              <p className="text-[10px] leading-4 text-soft-brown sm:text-[11px] sm:leading-5">
                Quality checked before delivery
              </p>
            </div>

            <div className="flex gap-2">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-muted-gold" />

              <p className="text-[10px] leading-4 text-soft-brown sm:text-[11px] sm:leading-5">
                Delivery available across Bangladesh
              </p>
            </div>

            <div className="hidden gap-2 sm:flex">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-muted-gold" />

              <p className="text-[11px] leading-5 text-soft-brown">
                Order reviewed before confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}