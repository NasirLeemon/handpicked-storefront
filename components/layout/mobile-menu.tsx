"use client";

import Link from "next/link";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import { AccountNavLink } from "@/components/layout/account-nav-link";
import { useEffect, useState } from "react";

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
  {
    label: "Cart",
    href: "/cart",
  },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-warm-border bg-white/55 text-deep-brown shadow-sm"
        aria-label="Open menu"
      >
        <Menu className="h-4.5 w-4.5" strokeWidth={1.8} />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[99999] h-dvh w-screen overflow-y-auto bg-ivory text-deep-brown">
          <div className="flex min-h-dvh flex-col px-4 py-4">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_18px_55px_rgba(47,33,24,0.08)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

              <div className="relative flex items-center justify-between px-5 py-4">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="text-2xl font-semibold tracking-[-0.045em] text-deep-brown"
                >
                  Handpicked
                </Link>

                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-border bg-white/60 text-deep-brown"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" strokeWidth={1.8} />
                </button>
              </div>
            </div>

            <nav className="mt-4 overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_16px_45px_rgba(47,33,24,0.055)]">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between border-b border-warm-border px-5 py-4 last:border-b-0"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-[10px] font-semibold tracking-[0.12em] text-muted-gold">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-xl font-semibold tracking-[-0.035em] text-deep-brown">
                      {item.label}
                    </span>
                  </div>

                  {item.label === "Cart" ? (
                    <ShoppingBag
                      className="h-5 w-5 text-soft-brown"
                      strokeWidth={1.7}
                    />
                  ) : (
                    <span className="h-px w-8 bg-muted-gold" />
                  )}
                </Link>
              ))}

              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-[10px] font-semibold tracking-[0.12em] text-muted-gold">
                    {String(navItems.length + 1).padStart(2, "0")}
                  </span>

                  <AccountNavLink
                    onClick={closeMenu}
                    className="flex items-center gap-3 text-xl font-semibold tracking-[-0.035em] text-deep-brown"
                  />
                </div>

                <span className="h-px w-8 bg-muted-gold" />
              </div>
            </nav>

            <div className="mt-auto pt-4">
              <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_16px_45px_rgba(47,33,24,0.055)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.12),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

                <div className="relative p-5">
                  <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
                    Personal Support
                  </p>

                  <p className="mt-3 text-sm leading-6 text-soft-brown">
                    Message us for size help, availability, delivery, or payment
                    support.
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <a
                      href="https://m.me/843144242224804"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#3F2A20] px-4 text-xs font-semibold tracking-[0.14em] !text-[#FFFDF9] uppercase shadow-[0_12px_28px_rgba(63,42,32,0.16)]"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
                      Messenger
                    </a>

                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className="inline-flex h-10 items-center justify-center rounded-full border border-warm-border bg-white/45 px-4 text-xs font-semibold tracking-[0.14em] text-deep-brown uppercase"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </div>

              <p className="mt-4 px-1 text-[11px] leading-5 text-taupe">
                Outside Dhaka orders require advance payment before dispatch.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
