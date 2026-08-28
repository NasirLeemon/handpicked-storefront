"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";

import { AccountNavLink } from "@/components/layout/account-nav-link";
import { useCart } from "@/components/cart/cart-provider";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { StorefrontSearch } from "@/components/layout/storefront-search";

export function SiteHeader() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const categoryLinks = [
    {
      label: "New In",
      href: "/shop/new-in",
    },
    {
      label: "Skincare",
      href: "/shop/skincare",
    },
    {
      label: "Haircare",
      href: "/shop/haircare",
    },
    {
      label: "Clothing",
      href: "/shop/clothing",
    },
    {
      label: "Makeup",
      href: "/shop/makeup",
    },
    {
      label: "Accessories",
      href: "/shop/accessories",
    },
  ];

  return (
    <header className="sticky top-0 z-[9999] border-b border-warm-border bg-[#FFFDF9]/97 backdrop-blur-xl">
      <div className="mx-auto grid h-14 max-w-7xl grid-cols-[40px_1fr_76px] items-center px-4 sm:px-6 md:h-[68px] md:grid-cols-[1fr_minmax(320px,460px)_1fr] md:gap-10 lg:px-8">
        <div className="flex items-center md:hidden">
          <MobileMenu />
        </div>

        <Link
          href="/"
          className="flex items-center justify-self-center md:justify-self-start"
          aria-label="Go to homepage"
        >
          <Image
            src="/handpicked-header-logo.webp"
            alt="Handpicked"
            width={424}
            height={200}
            priority
            className="h-auto w-[150px] object-contain md:w-[170px]"
          />
        </Link>

        <div className="hidden w-full md:block">
          <StorefrontSearch key={`desktop-${pathname}`} />
        </div>

        <div className="flex items-center justify-end gap-1">
          <Link
            href="/cart"
            className="relative inline-flex h-10 w-9 items-center justify-center gap-2 text-deep-brown transition hover:text-muted-gold md:w-auto md:px-3"
            aria-label={`Cart with ${totalItems} item${totalItems === 1 ? "" : "s"}`}
          >
            <ShoppingBag
              className="h-[18px] w-[18px]"
              strokeWidth={1.7}
            />

            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.15em] md:inline">
              Cart
            </span>

            {totalItems > 0 ? (
              <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-deep-brown px-1 text-[9px] font-semibold leading-none text-white">
                {totalItems}
              </span>
            ) : null}
          </Link>

          <AccountNavLink className="inline-flex h-10 w-9 items-center justify-center text-deep-brown transition hover:text-muted-gold md:w-auto md:gap-2 md:px-3 md:text-[10px] md:font-semibold md:uppercase md:tracking-[0.15em]" />
        </div>
      </div>

      <div className="border-t border-warm-border/70 px-4 py-2 md:hidden">
        <StorefrontSearch key={`mobile-${pathname}`} />
      </div>

      <div className="hidden border-t border-warm-border/70 md:block">
        <nav className="mx-auto flex h-10 max-w-7xl items-center justify-center gap-9 px-8">
          {categoryLinks.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[9px] font-semibold uppercase tracking-[0.18em] transition ${
                index === 0
                  ? "text-muted-gold hover:text-deep-brown"
                  : "text-deep-brown hover:text-muted-gold"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
