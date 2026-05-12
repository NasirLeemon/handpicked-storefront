import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { getCartItemsFromSearchParams } from "@/lib/cart-from-search-params";

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
  const urlItems = getCartItemsFromSearchParams(resolvedSearchParams, false);

  return <CheckoutPageClient urlItems={urlItems} />;
}
