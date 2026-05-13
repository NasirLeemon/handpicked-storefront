import Link from "next/link";
import { MessageCircle } from "lucide-react";

const shopLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Cart", href: "/cart" },
  { label: "Checkout", href: "/checkout" },
];

const supportLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-warm-border bg-deep-brown px-4 py-7 text-[#FFFDF9] sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr] lg:gap-8">
          <div>
            <Link
              href="/"
              className="font-serif-brand text-3xl font-medium tracking-[-0.03em] text-[#FFFDF9] sm:text-4xl"
            >
              Handpicked
            </Link>

            <p className="mt-3 max-w-sm text-xs leading-6 text-[#FFFDF9]/65 sm:text-sm">
              Premium boutique clothing, accessories, and beauty pieces curated
              for graceful everyday style.
            </p>
          </div>

          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="Support" links={supportLinks} />

          <div>
            <p className="text-[10px] font-semibold tracking-[0.22em] text-soft-gold uppercase sm:text-xs">
              Need Help?
            </p>

            <p className="mt-3 text-xs leading-6 text-[#FFFDF9]/65 sm:text-sm">
              Message us for size, delivery, or payment support.
            </p>

            <a
              href="https://m.me/843144242224804"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#FFFDF9]/25 px-4 text-[10px] font-semibold tracking-[0.16em] text-[#FFFDF9] uppercase transition hover:border-soft-gold hover:text-soft-gold sm:text-xs"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
              Messenger
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-[#FFFDF9]/15 pt-4 text-[11px] leading-5 text-[#FFFDF9]/50 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <p>© {new Date().getFullYear()} Handpicked.</p>
          <p>Outside Dhaka orders require advance payment.</p>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.22em] text-soft-gold uppercase sm:text-xs">
        {title}
      </p>

      <div className="mt-3 flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs text-[#FFFDF9]/65 transition hover:text-soft-gold sm:text-sm"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
