"use client";

import Link from "next/link";
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
    <div className="mt-4 grid gap-3 sm:mt-7">
      <button
        type="button"
        disabled={!canOrder}
        onClick={handleAddToCart}
        className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase transition hover:bg-[#6F5A49] disabled:cursor-not-allowed disabled:bg-taupe sm:h-12 sm:text-sm"
      >
        Add to Cart
      </button>

      <Link
        href={canOrder ? checkoutHref : "#"}
        aria-disabled={!canOrder}
        className={`inline-flex h-11 w-full items-center justify-center rounded-full border border-warm-border bg-soft-white px-6 text-xs font-semibold tracking-[0.18em] uppercase transition sm:h-12 sm:text-sm ${
          canOrder
            ? "text-deep-brown hover:border-muted-gold hover:text-muted-gold"
            : "pointer-events-none text-taupe"
        }`}
      >
        Order Now
      </Link>

      {!selectedSize && !isSoldOut ? (
        <p className="text-xs leading-5 text-soft-brown">
          Select a size before ordering.
        </p>
      ) : null}
    </div>
  );
}
