import { PackageCheck } from "lucide-react";
import { getCartSubtotal } from "@/lib/cart";
import type { CartItem } from "@/types/cart";

type CheckoutOrderSummaryProps = {
  items: CartItem[];
};

export function CheckoutOrderSummary({ items }: CheckoutOrderSummaryProps) {
  const subtotal = getCartSubtotal(items);

  return (
    <aside className="rounded-[1.5rem] border border-warm-border bg-soft-white p-5 shadow-sm lg:sticky lg:top-32">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold">
          <PackageCheck className="h-4 w-4" strokeWidth={1.7} />
        </div>

        <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
          Summary
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-sm leading-6 text-soft-brown">
          Your order summary is empty. Please add a product before submitting an
          order request.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item, index) => {
              const price = Number(item.price || 0);
              const quantity = Number(item.quantity || 0);

              return (
                <div
                  key={`${item.slug}-${item.size}-${index}`}
                  className="border-b border-warm-border pb-4 last:border-b-0"
                >
                  <div className="flex justify-between gap-4">
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-medium text-deep-brown">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-soft-brown">
                        Size: {item.size} · Color: {item.color}
                      </p>

                      <p className="mt-1 text-xs text-soft-brown">
                        Qty: {quantity}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-deep-brown">
                      ৳ {(price * quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 space-y-3 border-t border-warm-border pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-soft-brown">Subtotal</span>
              <span className="font-medium text-deep-brown">
                ৳ {subtotal.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-soft-brown">Delivery</span>
              <span className="text-deep-brown">To be confirmed</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-2xl font-semibold text-deep-brown">Total</span>
            <span className="text-2xl font-semibold text-deep-brown">
              ৳ {subtotal.toLocaleString()}+
            </span>
          </div>

          <p className="mt-3 rounded-[1rem] border border-muted-gold/30 bg-light-sand p-3 text-xs leading-5 text-soft-brown">
            Final delivery charge and payment details will be confirmed by our
            team.
          </p>
        </>
      )}
    </aside>
  );
}
