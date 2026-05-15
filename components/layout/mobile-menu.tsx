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
        className="flex h-10 w-10 items-center justify-center text-deep-brown"
        aria-label="Open menu"
      >
        <Menu className="h-7 w-7" strokeWidth={1.7} />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[99999] h-dvh w-screen overflow-y-auto bg-ivory text-deep-brown">
          <div className="flex min-h-dvh flex-col">
            <div className="flex h-20 shrink-0 items-center justify-between border-b border-warm-border bg-ivory px-5">
              <Link
                href="/"
                onClick={closeMenu}
                className="font-serif-brand text-4xl font-medium tracking-[-0.04em] text-deep-brown"
              >
                Handpicked
              </Link>

              <button
                type="button"
                onClick={closeMenu}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-warm-border bg-soft-white text-deep-brown"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex flex-1 flex-col bg-ivory px-5 py-7">
              <p className="text-xs font-semibold tracking-[0.3em] text-muted-gold uppercase">
                Menu
              </p>

              <nav className="mt-5">
                {navItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between border-b border-warm-border py-5"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-semibold tracking-[0.22em] text-muted-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="font-serif-brand text-5xl font-medium leading-none tracking-[-0.04em] text-deep-brown">
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

                <div className="flex items-center justify-between border-b border-warm-border py-5">
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-semibold tracking-[0.22em] text-muted-gold">
                      {String(navItems.length + 1).padStart(2, "0")}
                    </span>

                    <AccountNavLink
                      onClick={closeMenu}
                      className="flex items-center gap-3 font-serif-brand text-5xl font-medium leading-none tracking-[-0.04em] text-deep-brown"
                    />
                  </div>

                  <span className="h-px w-8 bg-muted-gold" />
                </div>
              </nav>

              <div className="mt-auto pt-8">
                <div className="rounded-[1.5rem] border border-warm-border bg-soft-white p-5">
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
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#4A3327] px-4 text-xs font-semibold tracking-[0.14em] !text-[#FFFDF9] uppercase"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
                      Messenger
                    </a>

                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-warm-border bg-ivory px-4 text-xs font-semibold tracking-[0.14em] text-deep-brown uppercase"
                    >
                      Contact
                    </Link>
                  </div>
                </div>

                <p className="mt-5 text-[11px] leading-5 text-taupe">
                  Outside Dhaka orders require advance payment before dispatch.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
