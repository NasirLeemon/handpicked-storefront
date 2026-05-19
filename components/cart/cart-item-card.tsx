"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { ProductImagePlaceholder } from "@/components/product/product-image-placeholder";
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
    <article className="relative overflow-hidden rounded-[1.5rem] border border-warm-border bg-[#FFFDF9] shadow-[0_14px_42px_rgba(47,33,24,0.055)] transition duration-500 hover:border-muted-gold hover:shadow-[0_20px_60px_rgba(47,33,24,0.075)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.08),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.62))]" />

      <div className="relative grid grid-cols-[86px_1fr] gap-3 p-4 sm:grid-cols-[104px_1fr] sm:gap-5">
        <Link
          href={`/product/${item.slug}`}
          className="group block h-[86px] w-[86px] self-start overflow-hidden rounded-[1.1rem] border border-warm-border bg-light-sand sm:h-[104px] sm:w-[104px]"
        >
          <div className="relative h-full w-full overflow-hidden">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                sizes="120px"
                className="object-cover object-top transition duration-500 group-hover:scale-105"
              />
            ) : (
              <ProductImagePlaceholder title="Image" label="Product" />
            )}
          </div>
        </Link>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {color ? (
                <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase">
                  {color}
                </p>
              ) : null}

              <Link
                href={`/product/${item.slug}`}
                className="mt-1 line-clamp-2 block text-base font-semibold leading-6 tracking-[-0.015em] text-deep-brown transition hover:text-muted-gold sm:text-lg"
              >
                {name}
              </Link>

              <p className="mt-1.5 text-sm leading-5 text-soft-brown">
                Size{" "}
                <span className="font-medium text-deep-brown">{item.size}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-warm-border bg-white/60 text-taupe transition hover:border-muted-gold hover:text-deep-brown"
              aria-label="Remove item"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.7} />
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="inline-flex h-9 w-fit items-center overflow-hidden rounded-full border border-warm-border bg-white/60 shadow-sm">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="flex h-full w-9 items-center justify-center text-deep-brown transition hover:bg-light-sand"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={1.7} />
              </button>

              <span className="flex h-full min-w-10 items-center justify-center border-x border-warm-border px-3 text-sm font-semibold text-deep-brown">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                className="flex h-full w-9 items-center justify-center text-deep-brown transition hover:bg-light-sand"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={1.7} />
              </button>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs text-soft-brown">
                ৳ {price.toLocaleString()} each
              </p>

              <p className="mt-0.5 text-lg font-semibold tracking-[-0.035em] text-deep-brown">
                ৳ {(price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
