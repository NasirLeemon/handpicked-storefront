"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { createCartItemFromProduct } from "@/lib/create-cart-item";

type ProductActionButtonsProps = {
  isSoldOut: boolean;
  selectedSize: string;
  quantity: number;
  productSlug: string;
};

export function ProductActionButtons({
  isSoldOut,
  selectedSize,
  quantity,
  productSlug,
}: ProductActionButtonsProps) {
  const { addItem } = useCart();
  const [wasAdded, setWasAdded] = useState(false);

  const isSizeMissing = !selectedSize;
  const checkoutHref = `/checkout?product=${productSlug}&size=${selectedSize}&qty=${quantity}`;

  function handleAddToCart() {
    if (isSoldOut || isSizeMissing) {
      return;
    }

    const cartItem = createCartItemFromProduct({
      productSlug,
      size: selectedSize,
      quantity,
    });

    if (!cartItem) {
      return;
    }

    addItem(cartItem);
    setWasAdded(true);

    window.setTimeout(() => {
      setWasAdded(false);
    }, 1800);
  }

  if (isSoldOut) {
    return (
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          disabled
          className="h-12 cursor-not-allowed rounded-full bg-taupe px-6 text-sm font-semibold tracking-[0.18em] text-[#FFFDF9] uppercase"
        >
          Sold Out
        </button>

        <button
          type="button"
          disabled
          className="h-12 cursor-not-allowed rounded-full border border-warm-border bg-soft-white px-6 text-sm font-semibold tracking-[0.18em] text-taupe uppercase"
        >
          Order Now
        </button>
      </div>
    );
  }

  if (isSizeMissing) {
    return (
      <div className="mt-8">
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled
            className="h-12 cursor-not-allowed rounded-full bg-taupe px-6 text-sm font-semibold tracking-[0.18em] text-[#FFFDF9] uppercase"
          >
            Add to Cart
          </button>

          <button
            type="button"
            disabled
            className="h-12 cursor-not-allowed rounded-full border border-warm-border bg-soft-white px-6 text-sm font-semibold tracking-[0.18em] text-taupe uppercase"
          >
            Order Now
          </button>
        </div>

        <p className="mt-3 text-sm text-soft-brown">
          Please select a size before ordering this piece.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex h-12 items-center justify-center rounded-full bg-[#4A3327] px-6 text-sm font-semibold tracking-[0.18em] text-[#FFFDF9] uppercase shadow-sm transition hover:bg-[#6F5A49]"
        >
          {wasAdded ? "Added" : "Add to Cart"}
        </button>

        <Link
          href={checkoutHref}
          className="inline-flex h-12 items-center justify-center rounded-full border border-warm-border bg-soft-white px-6 text-sm font-semibold tracking-[0.18em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
        >
          Order Now
        </Link>
      </div>

      {wasAdded ? (
        <p className="mt-3 text-sm text-soft-brown">
          Added to your cart. You can continue shopping or review your cart.
        </p>
      ) : null}
    </div>
  );
}
