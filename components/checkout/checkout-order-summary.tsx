import { PackageCheck } from "lucide-react";
import { getCartSubtotal } from "@/lib/cart";
import type { CartItem } from "@/types/cart";

type CheckoutOrderSummaryProps = {
  items: CartItem[];
};

export function CheckoutOrderSummary({ items }: CheckoutOrderSummaryProps) {
  const subtotal = getCartSubtotal(items);

  return (
    <aside className="rounded-[2rem] border border-warm-border bg-soft-white p-6 shadow-sm lg:sticky lg:top-32">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold">
        <PackageCheck className="h-5 w-5" strokeWidth={1.7} />
      </div>

      <p className="mt-5 text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
        Order Summary
      </p>

      {items.length === 0 ? (
        <p className="mt-6 text-sm leading-7 text-soft-brown">
          Your order summary is empty. Please add a product before submitting an
          order request.
        </p>
      ) : (
        <>
          <div className="mt-6 space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="border-b border-warm-border pb-5 last:border-b-0"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium text-deep-brown">{item.name}</p>
                    <p className="mt-1 text-sm text-soft-brown">
                      Size: {item.size} · Color: {item.color}
                    </p>
                    <p className="mt-1 text-sm text-soft-brown">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 font-medium text-deep-brown">
                    ৳ {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-4 border-t border-warm-border pt-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-soft-brown">Subtotal</span>
              <span className="font-medium text-deep-brown">
                ৳ {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-soft-brown">Delivery charge</span>
              <span className="text-deep-brown">To be confirmed</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-2xl font-semibold text-deep-brown">
              Total
            </span>
            <span className="text-2xl font-semibold text-deep-brown">
              ৳ {subtotal.toLocaleString()}+
            </span>
          </div>

          <div className="mt-5 rounded-[1.25rem] border border-muted-gold/30 bg-light-sand p-4">
            <p className="text-sm leading-7 text-soft-brown">
              Final delivery charge and product availability will be confirmed
              by our team before dispatch.
            </p>
          </div>
        </>
      )}
    </aside>
  );
}
