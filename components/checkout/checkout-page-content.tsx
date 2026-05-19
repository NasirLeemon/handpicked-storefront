import { ClipboardCheck } from "lucide-react";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary";
import type { CartItem } from "@/types/cart";

type CheckoutPageContentProps = {
  items: CartItem[];
  clearCartOnSubmit?: boolean;
};

export function CheckoutPageContent({
  items,
  clearCartOnSubmit = false,
}: CheckoutPageContentProps) {
  return (
    <div className="min-h-screen bg-ivory px-4 py-5 text-deep-brown sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_16px_45px_rgba(47,33,24,0.055)]">
          <div className="relative px-5 py-5 sm:px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.74))]" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
                  <ClipboardCheck className="h-4.5 w-4.5" strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-[0.26em] text-muted-gold uppercase">
                    Order Request
                  </p>

                  <h1 className="mt-1 text-3xl font-semibold tracking-[-0.045em] text-deep-brown sm:text-[2rem]">
                    Checkout
                  </h1>
                </div>
              </div>

              <div className="max-w-md border-t border-warm-border pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <p className="text-sm leading-6 text-soft-brown">
                  Submit your delivery details. We’ll confirm stock, delivery
                  charge, and payment before dispatch.
                </p>

                <p className="mt-1 text-xs font-medium tracking-[0.14em] text-muted-gold uppercase">
                  {items.length} {items.length === 1 ? "item" : "items"} in request
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
          <CheckoutForm items={items} clearCartOnSubmit={clearCartOnSubmit} />
          <CheckoutOrderSummary items={items} />
        </div>
      </div>
    </div>
  );
}
