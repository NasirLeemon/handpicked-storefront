import { Gem, PackageCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/common/reveal";

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
    icon: Gem,
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
    <section className="border-y border-warm-border bg-soft-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <Reveal key={item.title} delay={index * 0.08}>
                <div className="group flex min-h-[230px] flex-col justify-between rounded-[1.75rem] border border-warm-border bg-ivory p-6 transition duration-500 hover:-translate-y-1 hover:border-muted-gold hover:shadow-[0_18px_60px_rgba(47,33,24,0.08)] sm:p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
                        {item.number}
                      </p>

                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/30 bg-soft-white text-muted-gold transition duration-500 group-hover:bg-light-sand">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </div>
                    </div>

                    <h2 className="mt-5 font-serif-brand text-3xl font-medium leading-tight text-deep-brown sm:text-4xl">
                      {item.title}
                    </h2>
                  </div>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-soft-brown">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
