import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  MessageCircle,
  Phone,
} from "lucide-react";

import { businessInfo } from "@/data/business-info";

const shopLinks = [
  {
    label: "New In",
    href: "/shop",
  },
  {
    label: "Skincare",
    href: "/shop?department=skincare",
  },
  {
    label: "Haircare",
    href: "/shop?department=haircare",
  },
  {
    label: "Clothing",
    href: "/shop?department=clothing",
  },
  {
    label: "Beauty",
    href: "/shop?department=makeup",
  },
  {
    label: "Accessories",
    href: "/shop?department=accessories",
  },
];

const careLinks = [
  {
    label: "Shipping & Delivery",
    href: "/shipping-and-delivery",
  },
  {
    label: "Returns & Refunds",
    href: "/returns-and-refunds",
  },
  {
    label: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
];

export function SiteFooter() {
  const phoneUrl = `tel:${businessInfo.phone.replace(
    /[^\d+]/g,
    "",
  )}`;

  return (
    <footer className="border-t border-white/10 bg-[#24170F] text-[#FFFDF9]">
      <div className="grid lg:grid-cols-[1.3fr_0.7fr_0.8fr_1fr]">
        <div className="border-b border-white/10 px-6 py-12 sm:px-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
          <Link
            href="/"
            className="inline-block"
            aria-label="Handpicked homepage"
          >
            <Image
              src="/handpicked-header-logo.webp"
              alt="Handpicked"
              width={424}
              height={200}
              className="h-auto w-[165px] brightness-0 invert sm:w-[185px]"
            />
          </Link>

          <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
            Women&apos;s clothing, skincare, haircare, beauty and
            accessories — handpicked for you.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3">
            <a
              href={businessInfo.messengerUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border-b border-white/20 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 transition hover:border-[#D8BE99] hover:text-[#D8BE99]"
            >
              <MessageCircle
                className="h-4 w-4"
                strokeWidth={1.5}
              />
              Messenger
              <ArrowUpRight
                className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>

            <a
              href={businessInfo.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 border-b border-white/20 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75 transition hover:border-[#D8BE99] hover:text-[#D8BE99]"
            >
              Facebook
              <ArrowUpRight
                className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>

        <FooterColumn
          title="Shop"
          links={shopLinks}
        />

        <FooterColumn
          title="Customer Care"
          links={careLinks}
        />

        <div className="border-t border-white/10 px-6 py-10 sm:px-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-14">
          <FooterHeading>Contact</FooterHeading>

          <a
            href={phoneUrl}
            className="mt-6 flex items-start gap-3 text-sm text-white/70 transition hover:text-[#D8BE99]"
          >
            <Phone
              className="mt-0.5 h-4 w-4 shrink-0 text-[#D8BE99]"
              strokeWidth={1.5}
            />

            <span>
              {businessInfo.phone}

              <span className="mt-1 block text-[10px] uppercase tracking-[0.12em] text-white/35">
                {businessInfo.supportHours}
              </span>
            </span>
          </a>

          <div className="mt-9 border-y border-white/12">
            <div className="flex items-center justify-between gap-5 border-b border-white/10 py-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D8BE99]">
                  Inside Dhaka
                </p>

                <p className="mt-1 text-xs text-white/45">
                  Delivery
                </p>
              </div>

              <p className="text-lg font-semibold">
                ৳{businessInfo.insideDhakaDeliveryFee}
              </p>
            </div>

            <div className="flex items-center justify-between gap-5 py-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#D8BE99]">
                  Outside Dhaka
                </p>

                <p className="mt-1 text-xs text-white/45">
                  Delivery
                </p>
              </div>

              <p className="text-lg font-semibold">
                ৳{businessInfo.outsideDhakaDeliveryFee}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-white/10 px-6 py-5 text-[10px] text-white/35 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>
          © {new Date().getFullYear()} Handpicked. All rights
          reserved.
        </p>

        <p>
          Clothing · Beauty · Everyday essentials
        </p>
      </div>
    </footer>
  );
}

function FooterHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D8BE99]">
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

function FooterColumn({
  title,
  links,
}: FooterColumnProps) {
  return (
    <div className="border-t border-white/10 px-6 py-10 sm:px-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-14">
      <FooterHeading>{title}</FooterHeading>

      <nav className="mt-6 flex flex-col gap-3.5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="w-fit text-sm text-white/60 transition hover:translate-x-1 hover:text-[#D8BE99]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
