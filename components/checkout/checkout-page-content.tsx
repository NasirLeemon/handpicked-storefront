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
    <div className="min-h-screen bg-ivory px-4 py-6 text-deep-brown sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 border-b border-warm-border pb-5">
          <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
            Order Request
          </p>

          <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="text-4xl font-medium tracking-[-0.045em] text-deep-brown sm:text-5xl">
              Checkout
            </h1>

            <p className="max-w-xl text-sm leading-6 text-soft-brown sm:text-base">
              Submit your delivery details. We’ll confirm stock, delivery
              charge, and payment before dispatch.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_390px] lg:gap-8">
          <CheckoutForm items={items} clearCartOnSubmit={clearCartOnSubmit} />
          <CheckoutOrderSummary items={items} />
        </div>
      </div>
    </div>
  );
}
