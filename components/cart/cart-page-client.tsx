"use client";

import { ShoppingBag } from "lucide-react";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyCart } from "@/components/cart/empty-cart";
import { useCart } from "@/components/cart/cart-provider";

export function CartPageClient() {
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-ivory px-4 py-12 text-deep-brown sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 rounded-[2.5rem] border border-warm-border bg-soft-white px-6 py-10 text-center shadow-sm sm:px-10">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.7} />
          </div>

          <p className="mb-4 text-xs font-semibold tracking-[0.28em] text-muted-gold uppercase">
            Your Selection
          </p>

          <h1 className="font-serif-brand text-5xl font-medium tracking-[-0.035em] text-deep-brown sm:text-6xl">
            Your Cart
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-soft-brown">
            Review your selected pieces before submitting your order request.
          </p>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_390px]">
            <div className="space-y-5">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            <CartSummary items={items} />
          </div>
        )}
      </div>
    </div>
  );
}
