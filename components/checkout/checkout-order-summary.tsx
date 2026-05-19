import { PackageCheck } from "lucide-react";
import { getCartSubtotal } from "@/lib/cart";
import type { CartItem } from "@/types/cart";

type CheckoutOrderSummaryProps = {
  items: CartItem[];
};

export function CheckoutOrderSummary({ items }: CheckoutOrderSummaryProps) {
  const subtotal = getCartSubtotal(items);

  return (
    <aside className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_18px_55px_rgba(47,33,24,0.075)] lg:sticky lg:top-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.12),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

      <div className="relative p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
            <PackageCheck className="h-4 w-4" strokeWidth={1.7} />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
              Summary
            </p>
            <p className="mt-0.5 text-xs text-soft-brown">
              Request details before confirmation.
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-sm leading-6 text-soft-brown">
            Your order summary is empty. Please add a product before submitting
            an order request.
          </p>
        ) : (
          <>
            <div className="space-y-3">
              {items.map((item, index) => {
                const price = Number(item.price || 0);
                const quantity = Number(item.quantity || 0);

                return (
                  <div
                    key={`${item.slug}-${item.size}-${index}`}
                    className="border-b border-warm-border pb-3 last:border-b-0"
                  >
                    <div className="flex justify-between gap-4">
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-semibold text-deep-brown">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-soft-brown">
                          Size: {item.size} · Color: {item.color}
                        </p>

                        <p className="mt-0.5 text-xs text-soft-brown">
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

            <div className="mt-4 flex items-end justify-between">
              <span className="text-xs font-semibold tracking-[0.18em] text-muted-gold uppercase">
                Total
              </span>

              <span className="text-2xl font-semibold tracking-[-0.04em] text-deep-brown">
                ৳ {subtotal.toLocaleString()}+
              </span>
            </div>

            <p className="mt-4 rounded-[1.15rem] border border-muted-gold/25 bg-light-sand px-4 py-3 text-xs leading-5 text-soft-brown">
              Final delivery charge and payment details will be confirmed by our
              team.
            </p>
          </>
        )}
      </div>
    </aside>
  );
}
