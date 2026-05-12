import { SectionHeading } from "@/components/home/section-heading";

const steps = [
  {
    number: "01",
    title: "Choose Your Piece",
    description:
      "Browse the collection and select your preferred style, size, and color.",
  },
  {
    number: "02",
    title: "Add to Cart",
    description:
      "Review your selected pieces before submitting your order request.",
  },
  {
    number: "03",
    title: "Submit Order Request",
    description:
      "Send your details and our team will confirm availability, delivery, and payment.",
  },
];

export function HowToOrderSection() {
  return (
    <section className="bg-ivory px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Simple Boutique Ordering"
          title="How to Order"
          description="A clear and personal ordering experience designed to make shopping easy, calm, and reliable."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-[1.75rem] border border-warm-border bg-soft-white p-7"
            >
              <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
                {step.number}
              </p>

              <h3 className="mt-5 font-serif-brand text-3xl font-semibold text-deep-brown">
                {step.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-soft-brown">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
