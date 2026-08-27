import {
  MessageCircle,
  PackageCheck,
  Sparkles,
} from "lucide-react";

const trustItems = [
  {
    title: "Thoughtfully Selected",
    description:
      "Fashion and beauty products chosen with care instead of stocked at random.",
    icon: Sparkles,
  },
  {
    title: "Personal Support",
    description:
      "Questions about products, sizing or delivery? Talk directly with us.",
    icon: MessageCircle,
  },
  {
    title: "Easy Ordering",
    description:
      "Add your favourites, checkout, and we'll take care of the rest.",
    icon: PackageCheck,
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-warm-border bg-[#FFFDF9] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl md:grid-cols-3">
        {trustItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className={`flex gap-4 py-6 md:px-7 md:py-8 ${
                index > 0
                  ? "border-t border-warm-border md:border-l md:border-t-0"
                  : ""
              }`}
            >
              <Icon
                className="mt-0.5 h-5 w-5 shrink-0 text-muted-gold"
                strokeWidth={1.6}
              />

              <div>
                <h3 className="text-sm font-semibold text-deep-brown">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-soft-brown">
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
