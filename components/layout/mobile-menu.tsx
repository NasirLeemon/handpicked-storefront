"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  Menu,
  MessageCircle,
  ShoppingBag,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { AccountNavLink } from "@/components/layout/account-nav-link";
import { useCart } from "@/components/cart/cart-provider";

const shopLinks = [
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

export function MobileMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-9 items-center justify-start text-deep-brown"
        aria-label="Open menu"
      >
        <Menu
          className="h-[21px] w-[21px]"
          strokeWidth={1.6}
        />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[99999] flex h-dvh w-screen flex-col overflow-y-auto bg-[#FFFDF9] text-deep-brown">
          <div className="flex h-[66px] shrink-0 items-center justify-between border-b border-warm-border px-5">
            <Link
              href="/"
              aria-label="Handpicked homepage"
            >
              <Image
                src="/handpicked-header-logo.webp"
                alt="Handpicked"
                width={424}
                height={200}
                priority
                className="h-auto w-[145px]"
              />
            </Link>

            <button
              type="button"
              onClick={closeMenu}
              className="flex h-10 w-10 items-center justify-end text-deep-brown"
              aria-label="Close menu"
            >
              <X
                className="h-[22px] w-[22px]"
                strokeWidth={1.5}
              />
            </button>
          </div>

          <div className="flex-1">
            <div className="px-5 pb-4 pt-7">
              <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-muted-gold">
                Shop
              </p>
            </div>

            <nav>
              {shopLinks.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between border-t border-warm-border/80 px-5 py-[17px] last:border-b"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="w-5 text-[8px] font-semibold tracking-[0.16em] text-muted-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="font-serif-brand text-[2rem] font-semibold leading-none tracking-[-0.045em] text-deep-brown">
                      {item.label}
                    </span>
                  </div>

                  <ArrowRight
                    className="h-[18px] w-[18px] text-soft-brown transition group-hover:translate-x-1"
                    strokeWidth={1.4}
                  />
                </Link>
              ))}
            </nav>

            <div className="grid grid-cols-2 border-b border-warm-border">
              <Link
                href="/about"
                className="border-r border-warm-border px-5 py-5"
              >
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-gold">
                  Discover
                </p>
                <p className="mt-1.5 text-sm font-semibold text-deep-brown">
                  About
                </p>
              </Link>

              <Link
                href="/contact"
                className="px-5 py-5"
              >
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-gold">
                  Help
                </p>
                <p className="mt-1.5 text-sm font-semibold text-deep-brown">
                  Contact
                </p>
              </Link>

              <Link
                href="/cart"
                className="flex items-center justify-between border-r border-t border-warm-border px-5 py-5"
              >
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-gold">
                    Bag
                  </p>

                  <p className="mt-1.5 text-sm font-semibold text-deep-brown">
                    Cart
                    {totalItems > 0 ? ` (${totalItems})` : ""}
                  </p>
                </div>

                <ShoppingBag
                  className="h-4 w-4 text-soft-brown"
                  strokeWidth={1.6}
                />
              </Link>

              <div className="border-t border-warm-border px-5 py-5">
                <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-muted-gold">
                  Account
                </p>

                <AccountNavLink
                  className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-deep-brown"
                />
              </div>
            </div>
          </div>

          <div className="mt-auto bg-[#342319] px-5 py-6 text-[#FFFDF9]">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.24em] text-[#D8BE99]">
                  Personal Support
                </p>

                <p className="mt-2 max-w-[220px] text-sm leading-5 text-white/65">
                  Need help with a product, size or delivery?
                </p>
              </div>

              <a
                href="https://m.me/843144242224804"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 shrink-0 items-center gap-2 bg-[#FFFDF9] px-4 text-[9px] font-semibold uppercase tracking-[0.16em] !text-[#342319]"
              >
                <MessageCircle
                  className="h-3.5 w-3.5"
                  strokeWidth={1.6}
                />
                Message
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
