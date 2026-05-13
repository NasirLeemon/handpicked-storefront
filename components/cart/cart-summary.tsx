"use client";

import Link from "next/link";
import { PackageCheck, Trash2 } from "lucide-react";
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
    <aside className="rounded-[1.5rem] border border-warm-border bg-soft-white p-5 shadow-sm lg:sticky lg:top-32 lg:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold">
          <PackageCheck className="h-4 w-4" strokeWidth={1.7} />
        </div>

        <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
          Order Summary
        </p>
      </div>

      <div className="space-y-3 border-b border-warm-border pb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-soft-brown">Subtotal</span>
          <span className="font-medium text-deep-brown">
            ৳ {subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-soft-brown">Delivery</span>
          <span className="text-deep-brown">To be confirmed</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-2xl font-semibold text-deep-brown">Total</span>
        <span className="text-2xl font-semibold text-deep-brown">
          ৳ {subtotal.toLocaleString()}+
        </span>
      </div>

      <p className="mt-3 rounded-[1rem] border border-muted-gold/30 bg-light-sand p-3 text-xs leading-5 text-soft-brown">
        Delivery charge and availability will be confirmed after your order
        request.
      </p>

      <Link
        href="/checkout"
        className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold tracking-[0.16em] !text-[#FFFDF9] uppercase shadow-sm transition hover:bg-[#6F5A49] sm:h-12 sm:text-sm"
      >
        Continue to Checkout
      </Link>

      <Link
        href="/shop"
        className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-full border border-warm-border bg-soft-white px-6 text-xs font-semibold tracking-[0.16em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold sm:h-12 sm:text-sm"
      >
        Continue Shopping
      </Link>

      <button
        type="button"
        onClick={clearCart}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 text-center text-xs font-semibold tracking-[0.16em] text-taupe uppercase transition hover:text-deep-brown"
      >
        <Trash2 className="h-4 w-4" strokeWidth={1.7} />
        Clear Cart
      </button>
    </aside>
  );
}
