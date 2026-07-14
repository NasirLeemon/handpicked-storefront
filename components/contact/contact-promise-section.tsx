import { Heart, ShieldCheck, Sparkles } from "lucide-react";

const promises = [
  {
    title: "Thoughtfully Selected",
    description:
      "Every product is chosen to fit the refined and practical Handpicked collection.",
    icon: Sparkles,
  },
  {
    title: "Personal Support",
    description:
      "Ask us about sizing, availability, colors, delivery, and payment before ordering.",
    icon: Heart,
  },
  {
    title: "Checked Before Dispatch",
    description:
      "Orders are checked and confirmed before they are prepared for delivery.",
    icon: ShieldCheck,
  },
];

export function ContactPromiseSection() {
  return (
    <section className="mt-10">
      <div className="text-center">
        <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
          The Handpicked Promise
        </p>

        <h2 className="mt-2 font-serif-brand text-4xl font-medium text-deep-brown">
          Shopping with care and confidence
        </h2>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {promises.map((promise) => {
          const Icon = promise.icon;

          return (
            <article
              key={promise.title}
              className="rounded-[1.5rem] border border-warm-border bg-[#FFFDF9] p-5 shadow-[0_14px_42px_rgba(47,33,24,0.055)]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
                <Icon className="h-4 w-4" strokeWidth={1.7} />
              </div>

              <h3 className="mt-5 font-serif-brand text-2xl font-medium text-deep-brown">
                {promise.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-soft-brown">
                {promise.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}