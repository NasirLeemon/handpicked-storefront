"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
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
    <article className="grid gap-5 rounded-[2rem] border border-warm-border bg-soft-white p-4 shadow-sm transition duration-500 hover:border-muted-gold hover:shadow-[0_18px_60px_rgba(47,33,24,0.08)] sm:grid-cols-[132px_1fr] sm:p-5">
      <Link
        href={`/product/${item.slug}`}
        className="group overflow-hidden rounded-[1.5rem] border border-warm-border bg-light-sand"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <ProductImage src={item.image} alt={item.name} />
        </div>
      </Link>

      <div className="flex flex-col justify-between gap-5">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-muted-gold uppercase">
                {item.color}
              </p>

              <Link
                href={`/product/${item.slug}`}
                className="font-serif-brand text-3xl font-medium leading-none tracking-[-0.02em] text-deep-brown transition hover:text-muted-gold"
              >
                {item.name}
              </Link>

              <p className="mt-3 text-sm text-soft-brown">Size: {item.size}</p>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-warm-border bg-ivory text-taupe transition hover:border-muted-gold hover:text-deep-brown"
              aria-label="Remove item"
            >
              <X className="h-4 w-4" strokeWidth={1.7} />
            </button>
          </div>

          <div className="mt-5 inline-flex h-11 items-center overflow-hidden rounded-full border border-warm-border bg-ivory shadow-sm">
            <button
              type="button"
              onClick={decreaseQuantity}
              className="flex h-full w-11 items-center justify-center text-deep-brown transition hover:bg-light-sand"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" strokeWidth={1.7} />
            </button>

            <span className="flex h-full min-w-12 items-center justify-center border-x border-warm-border px-4 text-sm font-medium text-deep-brown">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              className="flex h-full w-11 items-center justify-center text-deep-brown transition hover:bg-light-sand"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" strokeWidth={1.7} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-warm-border pt-4">
          <p className="text-sm text-soft-brown">
            ৳ {item.price.toLocaleString()} each
          </p>

          <p className="font-medium text-deep-brown">
            ৳ {(item.price * item.quantity).toLocaleString()}
          </p>
        </div>
      </div>
    </article>
  );
}
