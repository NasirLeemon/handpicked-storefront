"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
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

  const lineTotal = price * item.quantity;

  const isAtMax =
    typeof item.availableStock === "number" &&
    item.quantity >= item.availableStock;

  const variantText = [item.size, color]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="rounded-sm border border-warm-border bg-[#FFFDF9] p-3 shadow-[0_8px_24px_rgba(47,33,24,0.035)] sm:p-4">
      <div className="grid grid-cols-[82px_minmax(0,1fr)] gap-3 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-4">
        <Link
          href={`/product/${item.slug}`}
          className="relative h-[82px] w-[82px] overflow-hidden rounded-sm border border-warm-border bg-white sm:h-24 sm:w-24"
        >
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="96px"
              className="object-contain p-1"
            />
          ) : (
            <ProductImagePlaceholder title="Image" label="Product" />
          )}
        </Link>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={`/product/${item.slug}`}
                className="line-clamp-2 block text-sm font-semibold leading-5 tracking-[-0.015em] text-deep-brown transition hover:text-muted-gold sm:text-[15px]"
              >
                {name}
              </Link>

              {variantText ? (
                <p className="mt-1 text-[11px] text-soft-brown sm:text-xs">
                  {variantText}
                </p>
              ) : null}

              {item.quantity > 1 ? (
                <p className="mt-1 text-[10px] text-taupe sm:text-[11px]">
                  ৳{price.toLocaleString()} each
                </p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="flex h-7 w-7 shrink-0 items-center justify-center text-taupe transition hover:text-[#B34D43]"
              aria-label="Remove item"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={1.7} />
            </button>
          </div>

          <div className="mt-3 flex items-end justify-between gap-4">
            <div className="inline-flex h-8 items-center overflow-hidden rounded-sm border border-warm-border bg-white">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
                className="flex h-full w-8 items-center justify-center text-deep-brown transition hover:bg-light-sand disabled:cursor-not-allowed disabled:text-taupe"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </button>

              <span className="flex h-full min-w-9 items-center justify-center border-x border-warm-border px-2 text-xs font-semibold text-deep-brown">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.id, item.quantity + 1)
                }
                disabled={isAtMax}
                className="flex h-full w-8 items-center justify-center text-deep-brown transition hover:bg-light-sand disabled:cursor-not-allowed disabled:text-taupe"
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <div className="text-right">
              <p className="text-[9px] font-medium tracking-[0.08em] text-taupe uppercase">
                Total
              </p>

              <p className="mt-0.5 text-base font-semibold tracking-[-0.025em] text-deep-brown">
                ৳{lineTotal.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
