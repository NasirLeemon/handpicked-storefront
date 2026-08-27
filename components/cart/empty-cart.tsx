import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

export function EmptyCart() {
  return (
    <section className="mx-auto max-w-xl py-12 text-center sm:py-16">
      <div className="mx-auto flex h-11 w-11 items-center justify-center border border-warm-border bg-light-sand text-muted-gold">
        <ShoppingBag className="h-5 w-5" strokeWidth={1.6} />
      </div>

      <p className="mt-6 text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase">
        Your Cart
      </p>

      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-deep-brown sm:text-3xl">
        Your cart is empty
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-soft-brown">
        Discover something you love and add it to your cart.
      </p>

      <div className="mx-auto mt-7 max-w-sm border-y border-warm-border py-6">
        <Link
          href="/shop"
          className="inline-flex h-11 min-w-[220px] items-center justify-center gap-2 bg-[#3F2A20] px-6 text-[11px] font-semibold tracking-[0.12em] !text-white uppercase transition hover:bg-[#5B4435]"
        >
          Shop Collection
          <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
        </Link>

        <p className="mt-3 text-[10px] text-taupe">
          Browse skincare, hair care, beauty and more
        </p>
      </div>
    </section>
  );
}
