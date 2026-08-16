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
    <div className="min-h-screen bg-ivory px-4 py-3 text-deep-brown sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 overflow-hidden rounded-[1.15rem] border border-warm-border bg-[#FFFDF9] sm:mb-6 sm:rounded-[1.75rem] shadow-[0_16px_45px_rgba(47,33,24,0.055)]">
          <div className="relative px-4 py-3 sm:px-6 sm:py-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.74))]" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11 border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
                  <ClipboardCheck className="h-4.5 w-4.5" strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-[8px] font-semibold tracking-[0.2em] text-muted-gold uppercase sm:text-[10px] sm:tracking-[0.26em]">
                    Order Request
                  </p>

                  <h1 className="mt-0.5 text-[1.45rem] font-semibold tracking-[-0.04em] text-deep-brown sm:mt-1 sm:text-[2rem]">
                    Checkout
                  </h1>
                </div>
              </div>

              <div className="max-w-md border-t border-warm-border pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <p className="text-[0.7rem] leading-5 text-soft-brown sm:text-sm sm:leading-6">
                  Submit your delivery details. We’ll confirm stock, delivery
                  charge, and payment before dispatch.
                </p>

                <p className="mt-1 text-[9px] font-medium tracking-[0.12em] text-muted-gold uppercase sm:text-xs sm:tracking-[0.14em]">
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
