import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function EmptyCart() {
  return (
    <div className="mx-auto max-w-md rounded-[1.5rem] border border-warm-border bg-soft-white px-5 py-8 text-center shadow-sm sm:rounded-[2rem] sm:px-8 sm:py-12">
      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold sm:h-14 sm:w-14">
        <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.7} />
      </div>

      <h2 className="font-serif-brand text-3xl font-medium tracking-[-0.03em] text-deep-brown sm:text-4xl">
        Your cart is empty
      </h2>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-soft-brown sm:mt-4 sm:leading-7">
        Start shopping and add your favorite handpicked pieces.
      </p>

      <Link
        href="/shop"
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold tracking-[0.16em] !text-[#FFFDF9] uppercase transition hover:bg-[#6F5A49] sm:h-12 sm:px-8 sm:text-sm"
      >
        Shop Collection
      </Link>
    </div>
  );
}
