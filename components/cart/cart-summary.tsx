"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { getCartSubtotal } from "@/lib/cart";
import type { CartItem } from "@/types/cart";

type CartSummaryProps = {
  items: CartItem[];
};

export function CartSummary({ items }: CartSummaryProps) {
  const { clearCart } = useCart();
  const subtotal = getCartSubtotal(items);

  return (
    <aside className="rounded-[1.75rem] border border-warm-border bg-soft-white p-6 lg:sticky lg:top-32">
      <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
        Order Summary
      </p>

      <div className="mt-6 space-y-4 border-b border-warm-border pb-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-soft-brown">Subtotal</span>
          <span className="font-medium text-deep-brown">
            ৳ {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-soft-brown">Delivery charge</span>
          <span className="text-deep-brown">To be confirmed</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-serif-brand text-2xl font-semibold text-deep-brown">
          Total
        </span>
        <span className="font-serif-brand text-2xl font-semibold text-deep-brown">
          ৳ {subtotal.toLocaleString()}+
        </span>
      </div>

      <p className="mt-4 text-sm leading-7 text-soft-brown">
        Final delivery charge and availability will be confirmed after your
        order request.
      </p>

      <Link
        href="/checkout"
        className="mt-7 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#4A3327] px-6 text-sm font-semibold tracking-[0.18em] text-[#FFFDF9] uppercase shadow-sm transition hover:bg-[#6F5A49]"
      >
        Continue to Checkout
      </Link>

      <Link
        href="/shop"
        className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full border border-warm-border bg-soft-white px-6 text-sm font-semibold tracking-[0.18em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
      >
        Continue Shopping
      </Link>

      <button
        type="button"
        onClick={clearCart}
        className="mt-5 w-full text-center text-xs font-semibold tracking-[0.18em] text-taupe uppercase transition hover:text-deep-brown"
      >
        Clear Cart
      </button>
    </aside>
  );
}
