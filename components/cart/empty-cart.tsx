import { BoutiqueButton } from "@/components/common/boutique-button";

export function EmptyCart() {
  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] border border-warm-border bg-soft-white px-6 py-16 text-center">
      <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
        Your Selection
      </p>

      <h1 className="mt-3 font-serif-brand text-5xl font-semibold text-deep-brown">
        Your cart is empty
      </h1>

      <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-soft-brown">
        Browse the collection and add your favorite handpicked pieces.
      </p>

      <div className="mt-8 flex justify-center">
        <BoutiqueButton href="/shop">Shop Collection</BoutiqueButton>
      </div>
    </div>
  );
}
