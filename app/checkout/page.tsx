import type { Metadata } from "next";
import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { getCartItemsFromSearchParams } from "@/lib/cart-from-search-params";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your Handpicked checkout with delivery and contact details.",
};

type CheckoutPageProps = {
  searchParams: Promise<{
    product?: string;
    size?: string;
    qty?: string;
  }>;
};

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const resolvedSearchParams = await searchParams;
  const urlItems = await getCartItemsFromSearchParams(resolvedSearchParams, false);

  return <CheckoutPageClient urlItems={urlItems} />;
}
