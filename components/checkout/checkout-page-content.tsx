import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary";
import { CheckoutPageHeader } from "@/components/checkout/checkout-page-header";
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
    <div className="min-h-screen bg-ivory px-4 py-12 text-deep-brown sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <CheckoutPageHeader />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_390px]">
          <CheckoutForm items={items} clearCartOnSubmit={clearCartOnSubmit} />
          <CheckoutOrderSummary items={items} />
        </div>
      </div>
    </div>
  );
}
