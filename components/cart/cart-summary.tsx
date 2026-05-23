"use client";

import Link from "next/link";
import { ArrowRight, PackageCheck, Trash2 } from "lucide-react";
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
    <aside className="relative overflow-hidden rounded-[1.5rem] border border-warm-border bg-[#FFFDF9] shadow-[0_18px_55px_rgba(47,33,24,0.075)] lg:sticky lg:top-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.12),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

      <div className="relative p-4">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
            <PackageCheck className="h-4 w-4" strokeWidth={1.7} />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
              Order Summary
            </p>
            <p className="mt-0.5 text-xs text-soft-brown">
              Final delivery will be confirmed.
            </p>
          </div>
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

        <div className="mt-4 flex items-end justify-between">
          <span className="text-xs font-semibold tracking-[0.18em] text-muted-gold uppercase">
            Total
          </span>

          <span className="text-xl font-semibold tracking-[-0.04em] text-deep-brown">
            ৳ {subtotal.toLocaleString()}+
          </span>
        </div>

        <p className="mt-4 rounded-[1.15rem] border border-muted-gold/25 bg-light-sand px-4 py-3 text-xs leading-5 text-soft-brown">
          Delivery charge and availability will be confirmed after your order request.
        </p>

        <Link
          href="/checkout"
          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-3 rounded-full bg-[#3F2A20] px-6 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase shadow-[0_14px_30px_rgba(63,42,32,0.16)] transition hover:bg-[#5B4435]"
        >
          Continue to Checkout
          <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
        </Link>

        <Link
          href="/shop"
          className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-full border border-warm-border bg-white/45 px-6 text-xs font-semibold tracking-[0.18em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
        >
          Continue Shopping
        </Link>

        <button
          type="button"
          onClick={clearCart}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 text-center text-[11px] font-semibold tracking-[0.16em] text-taupe uppercase transition hover:text-deep-brown"
        >
          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.7} />
          Clear Cart
        </button>
      </div>
    </aside>
  );
}
