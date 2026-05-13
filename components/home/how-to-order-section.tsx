import { ShoppingBag, ClipboardCheck, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/home/section-heading";

const steps = [
  {
    number: "01",
    title: "Choose Your Piece",
    description:
      "Browse the collection and select your preferred style, size, and color.",
    icon: ShoppingBag,
  },
  {
    number: "02",
    title: "Add to Cart",
    description:
      "Review your selected pieces before submitting your order request.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Confirm with Us",
    description:
      "Our team will confirm availability, delivery, and payment details.",
    icon: MessageCircle,
  },
];

export function HowToOrderSection() {
  return (
    <section className="bg-ivory px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Simple Boutique Ordering"
          title="How to Order"
          description="A clear and personal ordering experience designed to make shopping easy, calm, and reliable."
        />

        <div className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-5">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-[1.5rem] border border-warm-border bg-soft-white p-4 shadow-sm md:rounded-[1.75rem] md:p-7"
              >
                <div className="flex items-start gap-4 md:block">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold md:h-11 md:w-11">
                    <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.7} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold tracking-[0.22em] text-muted-gold uppercase md:text-xs md:tracking-[0.26em]">
                      {step.number}
                    </p>

                    <h3 className="mt-1 font-serif-brand text-2xl font-medium leading-tight text-deep-brown md:mt-5 md:text-3xl">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-soft-brown md:mt-4 md:leading-7">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
