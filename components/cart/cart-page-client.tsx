"use client";

import { CartItemCard } from "@/components/cart/cart-item-card";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyCart } from "@/components/cart/empty-cart";
import { useCart } from "@/components/cart/cart-provider";

export function CartPageClient() {
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-ivory px-4 py-12 text-deep-brown sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.28em] text-muted-gold uppercase">
            Your Selection
          </p>

          <h1 className="font-serif-brand text-5xl font-semibold tracking-tight text-deep-brown sm:text-6xl">
            Your Cart
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-soft-brown">
            Review your selected pieces before submitting your order request.
          </p>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
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
