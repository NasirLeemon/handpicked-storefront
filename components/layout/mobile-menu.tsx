"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
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
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm font-medium tracking-[0.16em] text-deep-brown uppercase"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
        Menu
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[100] bg-deep-brown/30 backdrop-blur-sm">
          <div className="ml-auto flex h-full w-[84%] max-w-sm flex-col bg-ivory px-6 py-6 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="font-serif-brand text-2xl font-semibold text-deep-brown">
                Handpicked
              </p>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-border bg-soft-white text-deep-brown"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-10 flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-warm-border pb-4 text-sm font-medium tracking-[0.2em] text-soft-brown uppercase transition hover:text-deep-brown"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto rounded-2xl border border-muted-gold/40 bg-light-sand p-5">
              <p className="text-xs font-semibold tracking-[0.22em] text-muted-gold uppercase">
                Need Help?
              </p>

              <p className="mt-3 text-sm leading-7 text-soft-brown">
                Message us for size, availability, delivery, or payment support.
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
      ) : null}
    </div>
  );
}
