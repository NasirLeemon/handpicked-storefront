import Image from "next/image";
import { getCartSubtotal } from "@/lib/cart";
import type { CartItem } from "@/types/cart";

type CheckoutOrderSummaryProps = {
  items: CartItem[];
  deliveryCharge?: number;
};

export function CheckoutOrderSummary({
  items,
  deliveryCharge,
}: CheckoutOrderSummaryProps) {
  const subtotal = getCartSubtotal(items);
  const hasDeliveryCharge = typeof deliveryCharge === "number";
  const total = subtotal + (deliveryCharge ?? 0);

  const totalItems = items.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  return (
    <aside className="border border-warm-border bg-[#FFFDF9] p-4 shadow-[0_10px_30px_rgba(47,33,24,0.045)] sm:p-5">
      <div className="flex items-end justify-between gap-4 border-b border-warm-border pb-4">
        <div>
          <p className="text-[9px] font-semibold tracking-[0.18em] text-muted-gold uppercase">
            Your Order
          </p>

          <h2 className="mt-1 text-lg font-semibold tracking-[-0.025em] text-deep-brown">
            Order summary
          </h2>
        </div>

        <p className="text-[11px] text-soft-brown">
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </p>
      </div>

      {items.length === 0 ? (
        <p className="py-5 text-sm text-soft-brown">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="divide-y divide-warm-border">
            {items.map((item, index) => {
              const price = Number(item.price || 0);
              const quantity = Number(item.quantity || 0);
              const lineTotal = price * quantity;

              const variant = [item.size, item.color]
                .filter(Boolean)
                .join(" · ");

              return (
                <div
                  key={`${item.slug}-${item.size}-${index}`}
                  className="grid grid-cols-[54px_minmax(0,1fr)_auto] gap-3 py-4"
                >
                  <div className="relative h-[54px] w-[54px] overflow-hidden border border-warm-border bg-white">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="54px"
                        className="object-contain p-1"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0">
                    <p className="line-clamp-2 text-[12px] font-semibold leading-[1.15rem] text-deep-brown sm:text-[13px]">
                      {item.name}
                    </p>

                    {variant ? (
                      <p className="mt-1 text-[10px] leading-4 text-soft-brown">
                        {variant}
                      </p>
                    ) : null}

                    <p className="mt-1 text-[10px] text-taupe">
                      Qty {quantity}
                      {quantity > 1
                        ? ` · ৳${price.toLocaleString()} each`
                        : ""}
                    </p>
                  </div>

                  <p className="shrink-0 pt-0.5 text-[12px] font-semibold text-deep-brown sm:text-[13px]">
                    ৳{lineTotal.toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="border-t border-warm-border pt-4">
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-soft-brown">Subtotal</span>

                <span className="font-medium text-deep-brown">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-soft-brown">Delivery</span>

                <span className="font-medium text-deep-brown">
                  {hasDeliveryCharge
                    ? `৳${deliveryCharge.toLocaleString()}`
                    : "Select delivery area"}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-warm-border pt-4">
              <span className="text-base font-semibold text-deep-brown">
                Total
              </span>

              <span className="text-xl font-semibold tracking-[-0.035em] text-deep-brown">
                {hasDeliveryCharge
                  ? `৳${total.toLocaleString()}`
                  : "—"}
              </span>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
