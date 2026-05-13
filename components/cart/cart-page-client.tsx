"use client";

import { ShoppingBag } from "lucide-react";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyCart } from "@/components/cart/empty-cart";
import { useCart } from "@/components/cart/cart-provider";

export function CartPageClient() {
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-ivory px-4 py-6 text-deep-brown sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 rounded-[1.25rem] border border-warm-border bg-soft-white px-5 py-5 shadow-sm sm:mb-10 sm:rounded-[2.5rem] sm:px-10 sm:py-10 sm:text-center">
          <div className="mb-3 flex items-center gap-3 sm:block">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold sm:mx-auto sm:mb-5 sm:h-12 sm:w-12">
              <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.7} />
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase sm:mb-4 sm:text-xs sm:tracking-[0.28em]">
                Your Selection
              </p>

              <h1 className="font-serif-brand text-4xl font-medium tracking-[-0.035em] text-deep-brown sm:text-6xl">
                Your Cart
              </h1>
            </div>
          </div>

          <p className="max-w-xl text-sm leading-6 text-soft-brown sm:mx-auto sm:mt-5 sm:text-base sm:leading-8">
            Review your selected pieces before submitting your order request.
          </p>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-5 lg:grid-cols-[1fr_390px] lg:gap-8">
            <div className="space-y-3 sm:space-y-5">
              {items.map((item, index) => (
                <CartItemCard
                  key={`${item.slug}-${item.size}-${index}`}
                  item={item}
                />
              ))}
            </div>

            <CartSummary items={items} />
          </div>
        )}
      </div>
    </div>
  );
}
