import { CartItemCard } from "@/components/cart/cart-item-card";
import { CartSummary } from "@/components/cart/cart-summary";
import { EmptyCart } from "@/components/cart/empty-cart";
import type { CartItem } from "@/types/cart";

type CartPageContentProps = {
  items: CartItem[];
};

export function CartPageContent({ items }: CartPageContentProps) {
  return (
    <div className="min-h-screen bg-ivory px-4 py-5 text-deep-brown sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-warm-border pb-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase">
              Your Selection
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-deep-brown sm:text-3xl">
              Cart
            </h1>
          </div>

          <p className="hidden max-w-md text-right text-sm leading-6 text-soft-brown sm:block">
            Review your selected pieces before checkout.
          </p>
        </div>

        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            <CartSummary items={items} />
          </div>
        )}
      </div>
    </div>
  );
}
