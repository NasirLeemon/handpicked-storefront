"use client";

import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-deep-brown transition hover:bg-light-sand"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" strokeWidth={1.8} />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[999] bg-ivory">
          <div className="flex h-full flex-col">
            <div className="flex h-20 items-center justify-between border-b border-warm-border px-6">
              <Link
                href="/"
                onClick={closeMenu}
                className="font-serif-brand text-4xl font-medium tracking-[-0.03em] text-deep-brown"
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

            <div className="flex flex-1 flex-col justify-between px-6 py-8">
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="border-b border-warm-border py-5 text-sm font-semibold tracking-[0.26em] text-deep-brown uppercase transition hover:text-muted-gold"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="rounded-[1.5rem] border border-muted-gold/35 bg-light-sand p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-muted-gold/30 bg-soft-white text-muted-gold">
                  <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
                </div>

                <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
                  Need Help?
                </p>

                <p className="mt-3 text-sm leading-6 text-soft-brown">
                  Message us for size, availability, delivery, or payment
                  support.
                </p>

                <a
                  href="https://m.me/843144242224804"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#4A3327] px-5 text-xs font-semibold tracking-[0.16em] !text-[#FFFDF9] uppercase transition hover:bg-[#6F5A49]"
                >
                  Message on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
