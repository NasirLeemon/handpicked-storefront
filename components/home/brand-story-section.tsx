import { BoutiqueButton } from "@/components/common/boutique-button";

export function BrandStorySection() {
  return (
    <section className="bg-soft-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-warm-border bg-light-sand">
          <div className="flex aspect-[4/5] items-center justify-center px-8 text-center">
            <div>
              <p className="font-serif-brand text-4xl font-semibold text-deep-brown">
                Brand Image
              </p>
              <p className="mt-3 text-sm leading-7 text-soft-brown">
                Use a soft boutique lifestyle or product styling photo here.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
            Our Story
          </p>

          <h2 className="font-serif-brand text-4xl font-semibold leading-tight tracking-tight text-deep-brown sm:text-5xl">
            Thoughtfully Chosen, Beautifully Worn
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-soft-brown">
            Handpicked is built around the joy of finding clothing that
            feels personal, elegant, and easy to love. Each piece is selected
            with attention to style, comfort, and everyday beauty.
          </p>

          <p className="mt-5 max-w-xl text-base leading-8 text-soft-brown">
            Our collection is designed for women who love graceful silhouettes,
            soft colors, refined details, and clothing that feels special
            without being excessive.
          </p>

          <div className="mt-8">
            <BoutiqueButton href="/about" variant="secondary">
              Our Story
            </BoutiqueButton>
          </div>
        </div>
      </div>
    </section>
  );
}
