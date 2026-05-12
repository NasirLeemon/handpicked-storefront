import Link from "next/link";
import { CartLink } from "@/components/cart/cart-link";
import { MobileMenu } from "@/components/layout/mobile-menu";

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
  return (
    <header className="sticky top-0 z-50 border-b border-warm-border bg-ivory/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex w-24 justify-start md:hidden">
          <MobileMenu />
        </div>

        <Link
          href="/"
          className="flex items-center justify-center md:justify-start"
        >
          <span className="font-serif-brand text-3xl font-semibold tracking-wide text-deep-brown sm:text-4xl">
            Handpicked
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
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

        <CartLink />
      </div>
    </header>
  );
}
