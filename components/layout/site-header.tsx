"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { AccountNavLink } from "@/components/layout/account-nav-link";
import { useCart } from "@/components/cart/cart-provider";

const navItems = [
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function SiteHeader() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-[9999] border-b border-warm-border bg-ivory/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex flex-1 items-center md:hidden">
          <MobileMenu />
        </div>

        <Link
          href="/"
          className="flex flex-1 justify-center md:justify-start"
          aria-label="Go to homepage"
        >
          <span className="font-serif-brand text-4xl font-medium tracking-[-0.04em] text-deep-brown sm:text-5xl md:text-4xl">
            Handpicked
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-[0.18em] text-soft-brown uppercase transition hover:text-deep-brown"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center text-deep-brown transition hover:text-muted-gold md:w-auto md:gap-2 md:text-sm md:font-medium md:tracking-[0.16em] md:uppercase"
            aria-label={`Cart with ${totalItems} item${totalItems === 1 ? "" : "s"}`}
          >
            <ShoppingBag className="h-6 w-6 md:h-5 md:w-5" strokeWidth={1.8} />

            <span className="hidden md:inline">Cart</span>

            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#4A3327] px-1.5 text-[11px] font-semibold leading-none text-[#FFFDF9] md:-right-3 md:-top-2">
                {totalItems}
              </span>
            ) : null}
          </Link>

          <AccountNavLink className="flex h-10 w-10 items-center justify-center text-deep-brown transition hover:text-muted-gold md:w-auto md:gap-2 md:text-sm md:font-medium md:tracking-[0.16em] md:uppercase" />
        </div>
      </div>
    </header>
  );
}
