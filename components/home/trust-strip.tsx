import { PackageCheck, Sparkles, WandSparkles } from "lucide-react";

const trustItems = [
  {
    number: "01",
    title: "Carefully Selected",
    description:
      "Every piece is chosen with attention to silhouette, comfort, color, and everyday elegance.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Refined Boutique Feel",
    description:
      "A calm shopping experience with graceful pieces, soft details, and polished styling.",
    icon: WandSparkles,
  },
  {
    number: "03",
    title: "Simple Ordering",
    description:
      "Choose your piece, submit your order request, and our team will confirm the details.",
    icon: PackageCheck,
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-warm-border bg-soft-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
        {trustItems.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="relative overflow-hidden rounded-[1.5rem] border border-warm-border bg-[#FFFDF9] shadow-[0_14px_42px_rgba(47,33,24,0.055)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.12),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.68))]" />

              <div className="relative p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
                    {item.number}
                  </p>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
                    <Icon className="h-4 w-4" strokeWidth={1.7} />
                  </div>
                </div>

                <h3 className="mt-7 font-serif-brand text-3xl font-medium tracking-[-0.04em] text-deep-brown">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-soft-brown">
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
