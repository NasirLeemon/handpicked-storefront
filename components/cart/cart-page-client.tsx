"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyCart } from "@/components/cart/empty-cart";
import { useCart } from "@/components/cart/cart-provider";

export function CartPageClient() {
  const { items } = useCart();

  const totalItems = items.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  return (
    <main className="min-h-screen bg-ivory px-4 py-5 text-deep-brown sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-warm-border pb-4 sm:mb-7">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.2em] text-muted-gold uppercase sm:text-[10px]">
              Shopping Cart
            </p>

            <div className="mt-1 flex items-baseline gap-2">
              <h1 className="text-2xl font-semibold tracking-[-0.04em] text-deep-brown sm:text-3xl">
                Your cart
              </h1>

              {items.length > 0 ? (
                <span className="text-sm text-soft-brown">
                  ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
              ) : null}
            </div>
          </div>

          {items.length > 0 ? (
            <Link
              href="/shop"
              className="hidden items-center gap-2 text-xs font-semibold text-soft-brown transition hover:text-deep-brown sm:inline-flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Continue shopping
            </Link>
          ) : null}
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
              <div className="space-y-3">
                {items.map((item, index) => (
                  <CartItemCard
                    key={`${item.slug}-${item.size}-${index}`}
                    item={item}
                  />
                ))}
              </div>

              <CartSummary items={items} />
            </div>

            <Link
              href="/shop"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-soft-brown transition hover:text-deep-brown sm:hidden"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Continue shopping
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
