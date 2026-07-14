import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  MessageCircle,
  Phone,
} from "lucide-react";
import { businessInfo } from "@/data/business-info";

const shopLinks = [
  { label: "Shop Collection", href: "/shop" },
  { label: "Your Cart", href: "/cart" },
  { label: "About Handpicked", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const careLinks = [
  { label: "Shipping & Delivery", href: "/shipping-and-delivery" },
  { label: "Returns & Refunds", href: "/returns-and-refunds" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export function SiteFooter() {
  const phoneUrl = `tel:${businessInfo.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="border-t border-warm-border bg-deep-brown px-4 py-10 text-[#FFFDF9] sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.75fr_0.95fr_1fr] lg:gap-10">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/handpicked-logo.webp"
                alt="Handpicked"
                width={210}
                height={80}
                className="h-auto w-[170px] brightness-0 invert sm:w-[195px]"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[#FFFDF9]/65">
              Thoughtfully selected women&apos;s clothing, beauty products, and
              accessories for graceful everyday style.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <FooterSocialLink
                href={businessInfo.messengerUrl}
                label="Messenger"
                icon={MessageCircle}
              />

              <FooterSocialLink
                href={businessInfo.facebookUrl}
                label="Facebook"
                icon={Globe}
              />
            </div>
          </div>

          <FooterColumn title="Explore" links={shopLinks} />
          <FooterColumn title="Customer Care" links={careLinks} />

          <div>
            <FooterHeading>Contact</FooterHeading>

            <div className="mt-4 space-y-4">
              <a
                href={phoneUrl}
                className="flex items-start gap-3 text-sm text-[#FFFDF9]/70 transition hover:text-soft-gold"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-soft-gold" />
                <span>
                  {businessInfo.phone}
                  <span className="mt-1 block text-xs text-[#FFFDF9]/45">
                    {businessInfo.supportHours}
                  </span>
                </span>
              </a>

              <div className="rounded-2xl border border-[#FFFDF9]/12 bg-[#FFFDF9]/5 p-4">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-soft-gold uppercase">
                  Delivery
                </p>

                <div className="mt-3 space-y-2 text-xs text-[#FFFDF9]/65">
                  <div className="flex justify-between gap-4">
                    <span>Inside Dhaka</span>
                    <strong className="text-[#FFFDF9]">
                      ৳{businessInfo.insideDhakaDeliveryFee}
                    </strong>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span>Outside Dhaka</span>
                    <strong className="text-[#FFFDF9]">
                      ৳{businessInfo.outsideDhakaDeliveryFee}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[#FFFDF9]/12 pt-5 text-[11px] leading-5 text-[#FFFDF9]/45 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <p>
            © {new Date().getFullYear()} Handpicked. All rights reserved.
          </p>

          <p>Online boutique delivering across Bangladesh.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold tracking-[0.22em] text-soft-gold uppercase">
      {children}
    </p>
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
      <FooterHeading>{title}</FooterHeading>

      <nav className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="w-fit text-sm text-[#FFFDF9]/65 transition hover:translate-x-0.5 hover:text-soft-gold"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

type FooterSocialLinkProps = {
  href: string;
  label: string;
  icon: React.ElementType;
};

function FooterSocialLink({
  href,
  label,
  icon: Icon,
}: FooterSocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#FFFDF9]/18 px-4 text-xs font-semibold tracking-[0.12em] text-[#FFFDF9]/80 uppercase transition hover:border-soft-gold hover:text-soft-gold"
    >
      <Icon className="h-4 w-4" strokeWidth={1.7} />
      {label}
    </a>
  );
}