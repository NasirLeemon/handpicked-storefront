import { ClipboardCheck, MessageCircle, ShoppingBag } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";

const steps = [
  {
    number: "01",
    title: "Choose Your Piece",
    description: "Browse the collection and select your preferred style, size, and color.",
    icon: ShoppingBag,
  },
  {
    number: "02",
    title: "Add to Cart",
    description: "Review your selected pieces before submitting your order request.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Confirm with Us",
    description: "Our team will confirm availability, delivery, and payment details.",
    icon: MessageCircle,
  },
];

export function HowToOrderSection() {
  return (
    <section className="bg-ivory px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Simple Boutique Ordering"
          title="How to Order"
          description="A clear and personal ordering experience designed to make shopping easy, calm, and reliable."
        />

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="relative overflow-hidden rounded-[1.5rem] border border-warm-border bg-[#FFFDF9] shadow-[0_14px_42px_rgba(47,33,24,0.055)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.11),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.68))]" />

                <div className="relative p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
                        <Icon className="h-4 w-4" strokeWidth={1.7} />
                      </div>

                      <p className="mt-3 text-xs font-semibold tracking-[0.22em] text-muted-gold uppercase">
                        {step.number}
                      </p>
                    </div>

                    <span className="h-px w-10 bg-muted-gold/50" />
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-deep-brown">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-soft-brown">
                    {step.description}
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
