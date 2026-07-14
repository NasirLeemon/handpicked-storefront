import {
  MessageCircle,
  PackageCheck,
  Sparkles,
} from "lucide-react";

const trustItems = [
  {
    title: "Thoughtfully Selected",
    description:
      "Clothing, beauty, and accessories chosen with care for everyday elegance.",
    icon: Sparkles,
  },
  {
    title: "Personal Support",
    description:
      "Ask about sizing, colors, availability, delivery, or payment before ordering.",
    icon: MessageCircle,
  },
  {
    title: "Simple Ordering",
    description:
      "Submit your order request and our team will confirm every detail.",
    icon: PackageCheck,
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-warm-border bg-[#FFFDF9] px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid divide-y divide-warm-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="group flex items-start gap-4 px-1 py-5 first:pt-0 last:pb-0 md:px-7 md:py-2 md:first:pl-0 md:last:pr-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold transition duration-300 group-hover:border-muted-gold/45 group-hover:bg-[#F2E5D2]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                </div>

                <div className="min-w-0">
                  <h2 className="font-serif-brand text-[1.55rem] font-medium leading-tight tracking-[-0.03em] text-deep-brown sm:text-[1.7rem]">
                    {item.title}
                  </h2>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-soft-brown">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}