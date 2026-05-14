"use client";

import { CheckoutPageContent } from "@/components/checkout/checkout-page-content";
import { useCart } from "@/components/cart/cart-provider";
import type { CartItem } from "@/types/cart";

type CheckoutPageClientProps = {
  urlItems: CartItem[];
};

export function CheckoutPageClient({ urlItems }: CheckoutPageClientProps) {
  const { items: cartItems } = useCart();

  const isDirectOrder = urlItems.length > 0;
  const items = isDirectOrder ? urlItems : cartItems;

  return (
    <CheckoutPageContent
      items={items}
      clearCartOnSubmit={false}
    />
  );
}
