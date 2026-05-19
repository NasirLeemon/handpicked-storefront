import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="bg-ivory px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_18px_55px_rgba(47,33,24,0.065)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

          <div className="relative flex flex-col gap-5 px-5 py-6 sm:px-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
                <Sparkles className="h-4 w-4" strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.26em] text-muted-gold uppercase">
                  About Handpicked
                </p>

                <h2 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-deep-brown sm:text-4xl">
                  Curated pieces for graceful everyday style
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-soft-brown">
                  Handpicked brings together clothing, accessories, and beauty
                  pieces selected with care, comfort, and soft elegance in mind.
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex h-11 shrink-0 items-center justify-center gap-3 rounded-full border border-warm-border bg-white/45 px-6 text-xs font-semibold tracking-[0.18em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
            >
              Our Story
              <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
