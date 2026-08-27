"use client";

import Link from "next/link";
import { ArrowRight, Trash2 } from "lucide-react";
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
    <aside className="rounded-sm border border-warm-border bg-[#FFFDF9] p-4 shadow-[0_12px_35px_rgba(47,33,24,0.055)] lg:sticky lg:top-28 sm:p-5">
      <h2 className="text-base font-semibold text-deep-brown">
        Order summary
      </h2>

      <div className="mt-4 space-y-3 border-b border-warm-border pb-4 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-soft-brown">Subtotal</span>
          <span className="font-medium text-deep-brown">
            ৳{subtotal.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-soft-brown">Delivery</span>
          <span className="text-right text-soft-brown">
            Calculated at checkout
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-soft-brown">Subtotal</p>
          <p className="mt-0.5 text-[10px] text-taupe">
            Before delivery
          </p>
        </div>

        <p className="text-xl font-semibold tracking-[-0.035em] text-deep-brown">
          ৳{subtotal.toLocaleString()}
        </p>
      </div>

      <Link
        href="/checkout"
        className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-[#3F2A20] px-6 text-xs font-semibold tracking-[0.12em] !text-white uppercase shadow-[0_12px_28px_rgba(63,42,32,0.16)] transition hover:bg-[#5B4435]"
      >
        Checkout
        <ArrowRight className="h-4 w-4" />
      </Link>

      <p className="mt-3 text-center text-[10px] leading-4 text-soft-brown">
        Delivery charge will be added based on your location.
      </p>

      <button
        type="button"
        onClick={clearCart}
        className="mx-auto mt-4 flex items-center gap-1.5 text-[10px] font-medium text-taupe transition hover:text-deep-brown"
      >
        <Trash2 className="h-3 w-3" />
        Clear cart
      </button>
    </aside>
  );
}
