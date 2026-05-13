"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

export function CartLink() {
  const { cartCount } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex w-24 items-center justify-end gap-2 text-sm font-medium tracking-[0.16em] text-deep-brown uppercase transition hover:text-muted-gold md:w-auto"
    >
      <span className="relative inline-flex">
        <ShoppingBag className="h-5 w-5" />

        {cartCount > 0 ? (
          <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4A3327] px-1.5 text-[10px] font-semibold leading-none !text-[#FFFDF9]">
            {cartCount}
          </span>
        ) : null}
      </span>

      <span className="hidden sm:inline">Cart</span>
    </Link>
  );
}
