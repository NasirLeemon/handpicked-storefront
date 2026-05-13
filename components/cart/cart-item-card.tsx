"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { ProductImage } from "@/components/product/product-image";
import { useCart } from "@/components/cart/cart-provider";
import { getProductBySlug } from "@/lib/products";
import type { CartItem } from "@/types/cart";

type CartItemCardProps = {
  item: CartItem;
};

export function CartItemCard({ item }: CartItemCardProps) {
  const { removeItem, updateQuantity } = useCart();
  const product = getProductBySlug(item.slug);

  const price = item.price ?? product?.price ?? 0;
  const name = item.name ?? product?.name ?? "Product";
  const color = item.color ?? product?.color ?? "";
  const image = item.image ?? product?.images[0];

  function decreaseQuantity() {
    updateQuantity(item.id, item.quantity - 1);
  }

  function increaseQuantity() {
    updateQuantity(item.id, item.quantity + 1);
  }

  return (
    <article className="rounded-[1.5rem] border border-warm-border bg-soft-white p-3 shadow-sm transition duration-500 hover:border-muted-gold hover:shadow-[0_18px_60px_rgba(47,33,24,0.08)] sm:grid sm:grid-cols-[132px_1fr] sm:gap-5 sm:p-5">
      <div className="grid grid-cols-[96px_1fr] gap-4 sm:contents">
        <Link
          href={`/product/${item.slug}`}
          className="group overflow-hidden rounded-[1.15rem] border border-warm-border bg-light-sand sm:rounded-[1.5rem]"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <ProductImage src={image} alt={name} />
          </div>
        </Link>

        <div className="flex min-w-0 flex-col justify-between gap-3">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                {color ? (
                  <p className="mb-1 text-[10px] font-semibold tracking-[0.18em] text-muted-gold uppercase sm:mb-2 sm:text-xs">
                    {color}
                  </p>
                ) : null}

                <Link
                  href={`/product/${item.slug}`}
                  className="line-clamp-2 font-serif-brand text-2xl font-medium leading-none tracking-[-0.02em] text-deep-brown transition hover:text-muted-gold sm:text-3xl"
                >
                  {name}
                </Link>

                <p className="mt-2 text-xs text-soft-brown sm:mt-3 sm:text-sm">
                  Size: {item.size}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-warm-border bg-ivory text-taupe transition hover:border-muted-gold hover:text-deep-brown sm:h-9 sm:w-9"
                aria-label="Remove item"
              >
                <X className="h-4 w-4" strokeWidth={1.7} />
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="inline-flex h-9 items-center overflow-hidden rounded-full border border-warm-border bg-ivory shadow-sm sm:h-11">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="flex h-full w-9 items-center justify-center text-deep-brown transition hover:bg-light-sand sm:w-11"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.7} />
              </button>

              <span className="flex h-full min-w-10 items-center justify-center border-x border-warm-border px-3 text-sm font-medium text-deep-brown sm:min-w-12 sm:px-4">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                className="flex h-full w-9 items-center justify-center text-deep-brown transition hover:bg-light-sand sm:w-11"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.7} />
              </button>
            </div>

            <div className="text-right">
              <p className="text-[11px] text-soft-brown sm:text-sm">
                ৳ {price.toLocaleString()} each
              </p>

              <p className="mt-1 text-sm font-semibold text-deep-brown sm:text-base">
                ৳ {(price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
