"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import type { Product } from "@/types/product";

type ProductActionButtonsProps = {
  product: Product;
  isSoldOut: boolean;
  selectedSize: string;
  quantity: number;
};

export function ProductActionButtons({
  product,
  isSoldOut,
  selectedSize,
  quantity,
}: ProductActionButtonsProps) {
  const { addItem } = useCart();
  const canOrder = !isSoldOut && Boolean(selectedSize);

  function handleAddToCart() {
    if (!canOrder) {
      return;
    }

    addItem({
      product,
      size: selectedSize,
      quantity,
    });
  }

  const checkoutHref = `/checkout?product=${product.slug}&size=${encodeURIComponent(
    selectedSize
  )}&qty=${quantity}`;

  return (
    <div className="grid gap-3">
      <button
        type="button"
        disabled={!canOrder}
        onClick={handleAddToCart}
        className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-full bg-[#3F2A20] px-7 text-xs font-semibold tracking-[0.2em] !text-[#FFFDF9] uppercase shadow-[0_16px_34px_rgba(63,42,32,0.18)] transition hover:bg-[#5B4435] disabled:cursor-not-allowed disabled:bg-[#D8CAB9] disabled:!text-[#FFFDF9]/80 disabled:shadow-none sm:h-12"
      >
        <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
        Add to Cart
      </button>

      <Link
        href={canOrder ? checkoutHref : "#"}
        aria-disabled={!canOrder}
        className={`group inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border px-7 text-xs font-semibold tracking-[0.2em] uppercase transition sm:h-12 ${
          canOrder
            ? "border-[#3F2A20] bg-transparent text-deep-brown hover:bg-[#3F2A20] hover:!text-[#FFFDF9]"
            : "pointer-events-none border-warm-border text-taupe"
        }`}
      >
        Order Now
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </Link>

      {!selectedSize && !isSoldOut ? (
        <p className="text-xs leading-5 text-soft-brown">
          Select a size to continue with cart or checkout.
        </p>
      ) : null}
    </div>
  );
}
