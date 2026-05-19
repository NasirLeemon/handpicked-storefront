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
    <header className="sticky top-0 z-[9999] border-b border-warm-border bg-ivory/94 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />
      <div className="relative mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

        <nav className="hidden flex-1 items-center justify-center gap-9 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs font-semibold tracking-[0.24em] text-deep-brown uppercase transition hover:text-muted-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2.5">
          <Link
            href="/cart"
            className="relative inline-flex h-10 items-center justify-center gap-2 rounded-full border border-warm-border bg-[#FFFDF9]/70 px-3 text-deep-brown shadow-sm transition hover:border-muted-gold hover:text-muted-gold md:px-4"
            aria-label={`Cart with ${totalItems} item${totalItems === 1 ? "" : "s"}`}
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />

            <span className="hidden text-[11px] font-semibold tracking-[0.18em] uppercase md:inline">
              Cart
            </span>

            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#3F2A20] px-1.5 text-[11px] font-semibold leading-none text-[#FFFDF9]">
                {totalItems}
              </span>
            ) : null}
          </Link>

          <AccountNavLink className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-warm-border bg-[#FFFDF9]/70 px-3 text-deep-brown shadow-sm transition hover:border-muted-gold hover:text-muted-gold md:px-4 md:text-[11px] md:font-semibold md:tracking-[0.18em] md:uppercase" />
        </div>
      </div>
    </header>
  );
}
