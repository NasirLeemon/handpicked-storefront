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
    <div className="min-h-screen bg-ivory px-4 py-6 text-deep-brown sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5">
          <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase sm:text-xs">
            Order Request
          </p>

          <h1 className="mt-2 font-serif-brand text-4xl font-medium tracking-[-0.04em] text-deep-brown sm:text-6xl">
            Checkout
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-soft-brown sm:text-base sm:leading-7">
            Submit your details. We’ll confirm availability, delivery, and
            payment before dispatch.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_390px] lg:gap-8">
          <CheckoutForm items={items} clearCartOnSubmit={clearCartOnSubmit} />
          <CheckoutOrderSummary items={items} />
        </div>
      </div>
    </div>
  );
}
