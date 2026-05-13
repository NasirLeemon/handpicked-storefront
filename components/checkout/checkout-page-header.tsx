import { ClipboardCheck } from "lucide-react";

export function CheckoutPageHeader() {
  return (
    <section className="rounded-[2.5rem] border border-warm-border bg-soft-white px-6 py-10 text-center shadow-sm sm:px-10">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold">
        <ClipboardCheck className="h-5 w-5" strokeWidth={1.7} />
      </div>

      <p className="mb-4 text-xs font-semibold tracking-[0.28em] text-muted-gold uppercase">
        Order Request
      </p>

      <h1 className="font-serif-brand text-5xl font-medium tracking-[-0.035em] text-deep-brown sm:text-6xl">
        Confirm Your Order
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-soft-brown">
        Submit your details and our team will confirm availability, delivery,
        and payment instructions.
      </p>
    </section>
  );
}
