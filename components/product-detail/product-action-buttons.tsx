"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/types/product";

type ProductActionButtonsProps = {
  product: Product;
  isSoldOut: boolean;
  selectedSize: string;
  quantity: number;
  onSizeRequired: () => void;
};

export function ProductActionButtons({
  product,
  isSoldOut,
  selectedSize,
  quantity,
  onSizeRequired,
}: ProductActionButtonsProps) {
  const router = useRouter();
  const { addItem } = useCart();

  const hasSelectedSize = Boolean(selectedSize);

  function handleAddToCart() {
    if (isSoldOut) {
      return;
    }

    if (!hasSelectedSize) {
      onSizeRequired();
      return;
    }

    addItem({
      product,
      size: selectedSize,
      quantity,
    });
  }

  function handleOrderNow() {
    if (isSoldOut) {
      return;
    }

    if (!hasSelectedSize) {
      onSizeRequired();
      return;
    }

    const checkoutHref = `/checkout?product=${product.slug}&size=${encodeURIComponent(
      selectedSize
    )}&qty=${quantity}`;

    router.push(checkoutHref);
  }

  return (
    <div className="grid gap-3">
      <button
        type="button"
        disabled={isSoldOut}
        onClick={handleAddToCart}
        className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#3F2A20] px-7 text-xs font-semibold tracking-[0.2em] !text-[#FFFDF9] uppercase shadow-[0_16px_34px_rgba(63,42,32,0.18)] transition hover:bg-[#5B4435] disabled:cursor-not-allowed disabled:bg-[#D8CAB9] disabled:!text-[#FFFDF9]/80 disabled:shadow-none"
      >
        <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
        {isSoldOut ? "Sold Out" : "Add to Cart"}
      </button>

      <button
        type="button"
        disabled={isSoldOut}
        onClick={handleOrderNow}
        className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[#3F2A20] bg-transparent px-7 text-xs font-semibold tracking-[0.2em] text-deep-brown uppercase transition hover:bg-[#3F2A20] hover:!text-[#FFFDF9] disabled:cursor-not-allowed disabled:border-warm-border disabled:text-taupe disabled:hover:bg-transparent"
      >
        {isSoldOut ? "Unavailable" : "Order Now"}

        {!isSoldOut ? (
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        ) : null}
      </button>
    </div>
  );
}