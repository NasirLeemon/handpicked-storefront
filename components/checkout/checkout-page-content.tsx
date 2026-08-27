"use client";

import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useState } from "react";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary";
import {
  checkoutDeliveryCharges,
  type CheckoutDeliveryArea,
} from "@/components/checkout/checkout-form-options";
import type { CartItem } from "@/types/cart";

type CheckoutPageContentProps = {
  items: CartItem[];
  clearCartOnSubmit?: boolean;
  isDirectOrder?: boolean;
};

export function CheckoutPageContent({
  items,
  clearCartOnSubmit = false,
  isDirectOrder = false,
}: CheckoutPageContentProps) {
  const [deliveryArea, setDeliveryArea] =
    useState<CheckoutDeliveryArea | "">("");

  const deliveryCharge = deliveryArea
    ? checkoutDeliveryCharges[deliveryArea]
    : undefined;

  return (
    <main className="min-h-screen bg-ivory px-4 py-5 text-deep-brown sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-end justify-between gap-4 border-b border-warm-border pb-4 sm:mb-6">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.2em] text-muted-gold uppercase sm:text-[10px]">
              Secure Checkout
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-deep-brown sm:text-3xl">
              Checkout
            </h1>

            <p className="mt-1 text-xs text-soft-brown sm:text-sm">
              Complete your details to place your order.
            </p>
          </div>

          <div className="hidden items-center gap-2 text-xs text-soft-brown sm:flex">
            <LockKeyhole className="h-3.5 w-3.5" />
            Your details are protected
          </div>
        </div>

        <Link
          href={
            isDirectOrder && items[0]
              ? `/product/${items[0].slug}`
              : "/cart"
          }
          className="mb-4 inline-flex items-center gap-1.5 text-[11px] font-medium text-soft-brown transition hover:text-deep-brown"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {isDirectOrder ? "Back to product" : "Back to cart"}
        </Link>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <div className="order-1">
            <CheckoutForm
              items={items}
              clearCartOnSubmit={clearCartOnSubmit}
              deliveryArea={deliveryArea}
              deliveryCharge={deliveryCharge}
              onDeliveryAreaChange={setDeliveryArea}
            />
          </div>

          <div className="order-2">
            <CheckoutOrderSummary
              items={items}
              deliveryCharge={deliveryCharge}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
