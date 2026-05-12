"use client";

import Link from "next/link";
import { ProductImage } from "@/components/product/product-image";
import { useCart } from "@/components/cart/cart-provider";
import type { CartItem } from "@/types/cart";

type CartItemCardProps = {
  item: CartItem;
};

export function CartItemCard({ item }: CartItemCardProps) {
  const { removeItem, updateQuantity } = useCart();

  function decreaseQuantity() {
    updateQuantity(item.id, item.quantity - 1);
  }

  function increaseQuantity() {
    updateQuantity(item.id, item.quantity + 1);
  }

  return (
    <div className="grid gap-5 rounded-[1.75rem] border border-warm-border bg-soft-white p-5 sm:grid-cols-[120px_1fr]">
      <Link
        href={`/product/${item.slug}`}
        className="group overflow-hidden rounded-2xl border border-warm-border bg-light-sand"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <ProductImage src={item.image} alt={item.name} />
        </div>
      </Link>

      <div className="flex flex-col justify-between gap-5">
        <div>
          <div className="flex items-start justify-between gap-4">
            <Link
              href={`/product/${item.slug}`}
              className="font-serif-brand text-2xl font-semibold text-deep-brown transition hover:text-muted-gold"
            >
              {item.name}
            </Link>

            <p className="shrink-0 font-medium text-deep-brown">
              ৳ {(item.price * item.quantity).toLocaleString()}
            </p>
          </div>

          <p className="mt-3 text-sm text-soft-brown">
            Color: {item.color} · Size: {item.size}
          </p>

          <div className="mt-4 inline-flex h-10 items-center overflow-hidden rounded-full border border-warm-border bg-soft-white">
            <button
              type="button"
              onClick={decreaseQuantity}
              className="flex h-full w-10 items-center justify-center text-lg text-deep-brown transition hover:bg-light-sand"
              aria-label="Decrease quantity"
            >
              -
            </button>

            <span className="flex h-full min-w-11 items-center justify-center border-x border-warm-border px-4 text-sm font-medium text-deep-brown">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              className="flex h-full w-10 items-center justify-center text-lg text-deep-brown transition hover:bg-light-sand"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-warm-border pt-4">
          <p className="text-sm text-soft-brown">
            ৳ {item.price.toLocaleString()} each
          </p>

          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="text-xs font-semibold tracking-[0.18em] text-taupe uppercase transition hover:text-deep-brown"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
