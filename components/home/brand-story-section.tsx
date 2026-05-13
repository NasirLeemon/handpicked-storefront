import { BoutiqueButton } from "@/components/common/boutique-button";

export function BrandStorySection() {
  return (
    <section className="bg-ivory px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-warm-border bg-soft-white px-6 py-10 text-center shadow-sm sm:px-10">
        <p className="mb-3 text-xs font-semibold tracking-[0.28em] text-muted-gold uppercase">
          About Handpicked
        </p>

        <h2 className="font-serif-brand text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-deep-brown sm:text-5xl">
          Curated pieces for graceful everyday style
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-soft-brown sm:text-base">
          Handpicked brings together clothing, accessories, and beauty pieces
          selected with care, comfort, and soft elegance in mind.
        </p>

        <div className="mt-7 flex justify-center">
          <BoutiqueButton href="/about" variant="secondary">
            Our Story
          </BoutiqueButton>
        </div>
      </div>
    </section>
  );
}
