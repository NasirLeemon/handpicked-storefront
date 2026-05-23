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

      <div className="relative mx-auto grid h-16 max-w-7xl grid-cols-[44px_1fr_auto] items-center gap-2 px-4 sm:px-6 md:flex md:h-16 md:justify-between lg:px-8">
        <div className="flex items-center md:hidden">
          <MobileMenu />
        </div>

        <Link
          href="/"
          className="min-w-0 justify-self-center md:flex md:flex-1 md:justify-start"
          aria-label="Go to homepage"
        >
          <span className="block truncate font-serif-brand text-[2.15rem] font-medium leading-none tracking-[-0.045em] text-deep-brown sm:text-4xl md:text-[2rem]">
            Handpicked
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-9 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-semibold tracking-[0.26em] text-deep-brown uppercase transition hover:text-muted-gold"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 md:flex-1">
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-warm-border/80 bg-[#FFFDF9]/70 text-deep-brown shadow-[0_8px_22px_rgba(47,33,24,0.045)] transition hover:border-muted-gold hover:bg-[#FFFDF9]/85 hover:text-muted-gold md:w-auto md:gap-2 md:px-4"
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

          <AccountNavLink className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-warm-border/80 bg-[#FFFDF9]/70 text-deep-brown shadow-[0_8px_22px_rgba(47,33,24,0.045)] transition hover:border-muted-gold hover:bg-[#FFFDF9]/85 hover:text-muted-gold md:w-auto md:gap-2 md:px-4 md:text-[11px] md:font-semibold md:tracking-[0.18em] md:uppercase" />
        </div>
      </div>
    </header>
  );
}
