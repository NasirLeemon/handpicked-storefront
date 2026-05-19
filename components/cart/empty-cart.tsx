import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="relative mx-auto max-w-xl overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_18px_55px_rgba(47,33,24,0.075)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

      <div className="relative p-6 text-center sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
          <ShoppingBag className="h-5 w-5" strokeWidth={1.7} />
        </div>

        <p className="mt-5 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
          Your Selection
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-deep-brown sm:text-4xl">
          Your cart is empty
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-soft-brown">
          Browse the collection and add your favorite Handpicked pieces before
          submitting an order request.
        </p>

        <Link
          href="/shop"
          className="mt-6 inline-flex h-11 items-center justify-center gap-3 rounded-full bg-[#3F2A20] px-7 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase shadow-[0_14px_30px_rgba(63,42,32,0.16)] transition hover:bg-[#5B4435]"
        >
          Shop Collection
          <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
        </Link>
      </div>
    </div>
  );
}
