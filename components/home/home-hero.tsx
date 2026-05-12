import { BoutiqueButton } from "@/components/common/boutique-button";

export function HomeHero() {
    return (
        <section className="mx-auto grid min-h-[calc(100vh-120px)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div>
                <p className="mb-5 text-xs font-semibold tracking-[0.28em] text-muted-gold uppercase">
                    Premium Boutique Collection
                </p>

                <h1 className="font-serif-brand text-5xl font-semibold leading-[0.95] tracking-tight text-deep-brown sm:text-6xl lg:text-7xl">
                    Curated Elegance, Handpicked
                </h1>

                <p className="mt-7 max-w-xl text-base leading-8 text-soft-brown sm:text-lg">
                    Discover thoughtfully selected clothing pieces designed for graceful
                    everyday style, soft femininity, and timeless boutique charm.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                    <BoutiqueButton href="/shop">Shop New Arrivals</BoutiqueButton>

                    <BoutiqueButton href="/shop" variant="secondary">
                        Explore Collection
                    </BoutiqueButton>
                </div>
            </div>

            <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] border border-warm-border bg-light-sand shadow-sm">
                    <div className="flex h-full items-center justify-center px-8 text-center">
                        <div>
                            <p className="font-serif-brand text-4xl font-semibold text-deep-brown">
                                Product Image
                            </p>
                            <p className="mt-3 text-sm leading-7 text-soft-brown">
                                Replace this area with a beautiful boutique clothing photo.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-6 -left-4 hidden rounded-2xl border border-warm-border bg-soft-white px-6 py-5 shadow-sm sm:block">
                    <p className="text-xs font-semibold tracking-[0.22em] text-muted-gold uppercase">
                        New Season
                    </p>
                    <p className="mt-1 font-serif-brand text-2xl font-semibold text-deep-brown">
                        Soft Neutrals
                    </p>
                </div>
            </div>
        </section>
    );
}