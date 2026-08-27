"use client";

import { useEffect, useState } from "react";
import { CheckoutPageContent } from "@/components/checkout/checkout-page-content";
import { useCart } from "@/components/cart/cart-provider";
import type { CartItem } from "@/types/cart";

type CheckoutPageClientProps = {
  urlItems: CartItem[];
};

export function CheckoutPageClient({ urlItems }: CheckoutPageClientProps) {
  const { items: cartItems } = useCart();

  const isDirectOrder = urlItems.length > 0;

  const [checkoutItems, setCheckoutItems] =
    useState<CartItem[]>(urlItems);

  useEffect(() => {
    if (isDirectOrder) {
      setCheckoutItems(urlItems);
      return;
    }

    if (cartItems.length > 0) {
      setCheckoutItems(cartItems);
    }
  }, [cartItems, isDirectOrder, urlItems]);

  const items = isDirectOrder ? urlItems : checkoutItems;

  return (
    <CheckoutPageContent
      items={items}
      clearCartOnSubmit={!isDirectOrder}
      isDirectOrder={isDirectOrder}
    />
  );
}
