import {
  MessageCircle,
  PackageCheck,
  Sparkles,
} from "lucide-react";

const trustItems = [
  {
    number: "01",
    title: "Thoughtfully Selected",
    description:
      "Fashion and beauty products chosen with care, not stocked at random.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Personal Support",
    description:
      "Questions about products, sizing or delivery? Talk directly with us.",
    icon: MessageCircle,
  },
  {
    number: "03",
    title: "Easy Ordering",
    description:
      "Choose your favourites, checkout, and we'll take care of the rest.",
    icon: PackageCheck,
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-warm-border bg-[#FFFDF9]">
      <div className="grid w-full md:grid-cols-3">
        {trustItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className={`px-6 py-9 sm:px-8 sm:py-11 lg:px-12 ${
                index > 0
                  ? "border-t border-warm-border md:border-l md:border-t-0"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold tracking-[0.22em] text-muted-gold">
                  {item.number}
                </span>

                <Icon
                  className="h-5 w-5 text-muted-gold"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="mt-7 font-serif-brand text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-deep-brown sm:text-4xl">
                {item.title}
              </h3>

              <p className="mt-4 max-w-md text-sm leading-7 text-soft-brown">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
