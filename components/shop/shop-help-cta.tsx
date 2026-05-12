import { BoutiqueButton } from "@/components/common/boutique-button";

export function ShopHelpCta() {
  return (
    <section className="bg-soft-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-warm-border bg-ivory px-6 py-10 text-center sm:px-10">
        <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
          Need Assistance?
        </p>

        <h2 className="mt-3 font-serif-brand text-4xl font-semibold text-deep-brown">
          Looking for the perfect piece?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-soft-brown">
          Message us for size guidance, availability, color details, or styling
          help before placing your order.
        </p>

        <div className="mt-7 flex justify-center">
          <BoutiqueButton href="/contact" variant="secondary">
            Contact Us
          </BoutiqueButton>
        </div>
      </div>
    </section>
  );
}
