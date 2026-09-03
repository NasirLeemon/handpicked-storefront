"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Offer = {
  id: string;
  name: string;
  discountPercent: number;
  endsAt: string | null;
  appliesToAllProducts: boolean;
};

export function OfferTicker() {
  const [offer, setOffer] = useState<Offer | null>(null);

  useEffect(() => {
    fetch("/api/storefront-offer", { cache: "no-store" })
      .then((response) => response.json())
      .then((result) => setOffer(result.offer ?? null))
      .catch(() => setOffer(null));
  }, []);

  const endLabel = useMemo(() => {
    if (!offer?.endsAt) return null;

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "Asia/Dhaka",
    })
      .format(new Date(offer.endsAt))
      .toUpperCase();
  }, [offer]);

  if (!offer) return null;

  return (
    <Link
      href="/shop/new-in"
      className="block overflow-hidden bg-[#C92F3E] py-3.5 text-white sm:py-4"
    >
      <div className="handpicked-offer-ticker-track flex w-max items-center whitespace-nowrap">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center gap-3 px-8 text-white sm:gap-5 sm:px-12"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-white sm:text-[12px]">
              WEBSITE EXCLUSIVE
            </span>

            <span className="text-white">✦</span>

            <span className="text-[21px] font-black leading-none tracking-[-0.02em] text-white sm:text-[26px]">
              {offer.discountPercent}% OFF
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:text-[12px]">
              {offer.appliesToAllProducts
                ? "ALL PRODUCTS"
                : "SELECTED PRODUCTS"}
            </span>

            {endLabel && (
              <>
                <span className="text-white">✦</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:text-[12px]">
                  ENDS {endLabel}
                </span>
              </>
            )}

            <span className="text-white">✦</span>

            <span className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-white sm:text-[12px]">
              SHOP NOW
            </span>
          </div>
        ))}
      </div>
    </Link>
  );
}
