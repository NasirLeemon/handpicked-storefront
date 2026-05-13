"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

export function CartLink() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="relative inline-flex h-10 w-10 items-center justify-center text-deep-brown transition hover:text-muted-gold"
      aria-label={`Cart with ${totalItems} item${totalItems === 1 ? "" : "s"}`}
    >
      <ShoppingBag className="h-6 w-6" strokeWidth={1.8} />

      {totalItems > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4A3327] px-1.5 text-[11px] font-semibold leading-none text-[#FFFDF9]">
          {totalItems}
        </span>
      ) : null}
    </Link>
  );
}
