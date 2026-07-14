import { BoutiqueButton } from "@/components/common/boutique-button";
import { HeroCarousel } from "@/components/home/hero-carousel";

export function HomeHero() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-deep-brown sm:min-h-[80vh] lg:min-h-[calc(92vh-112px)]">
      <HeroCarousel />

      <div className="absolute inset-0 bg-gradient-to-r from-[#2F2118]/70 via-[#2F2118]/32 to-[#2F2118]/6" />
<div className="absolute inset-0 bg-gradient-to-t from-[#2F2118]/48 via-transparent to-[#2F2118]/8" />

      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-7xl items-center px-4 py-12 sm:min-h-[80vh] sm:px-6 lg:min-h-[calc(92vh-112px)] lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-[10px] font-semibold tracking-[0.32em] text-soft-gold uppercase sm:text-xs">
            New Season Collection
          </p>

          <h1 className="font-serif-brand text-[3.1rem] font-medium leading-[0.9] tracking-[-0.055em] text-[#FFFDF9] sm:text-[5.4rem] lg:text-[6.7rem]">
            Modern
            <span className="block italic text-[#E8DCCB]">grace</span>
            in every piece
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#FFFDF9]/90 sm:text-base sm:leading-8">
            A curated collection of clothing, beauty, and accessories selected
            for soft elegance, refined details, and effortless everyday styling.
          </p>

          <div className="mt-7 flex flex-row flex-wrap gap-3">
            <BoutiqueButton href="/shop">
              Shop Collection
            </BoutiqueButton>

            <BoutiqueButton href="/about" variant="secondary">
              Our Story
            </BoutiqueButton>
          </div>

          <div className="mt-7 hidden max-w-xl grid-cols-3 gap-3 border-t border-white/18 pt-5 text-[#FFFDF9] md:grid">
            <HeroMeta
              label="Selected"
              value="Thoughtfully curated"
            />

            <HeroMeta
              label="Support"
              value="Personal assistance"
            />

            <HeroMeta
              label="Delivery"
              value="Across Bangladesh"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type HeroMetaProps = {
  label: string;
  value: string;
};

function HeroMeta({ label, value }: HeroMetaProps) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.22em] text-soft-gold uppercase">
        {label}
      </p>

      <p className="mt-1.5 text-xs text-[#FFFDF9]/85">
        {value}
      </p>
    </div>
  );
}