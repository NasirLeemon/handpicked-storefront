import Link from "next/link";
import { Heart, MessageCircle, Sparkles, ShoppingBag } from "lucide-react";

const values = [
  {
    title: "Carefully Chosen",
    description:
      "Every piece is selected for wearable elegance, comfort, and everyday styling.",
    icon: Sparkles,
  },
  {
    title: "Soft Boutique Feel",
    description:
      "A calm, personal shopping experience with feminine details and refined pieces.",
    icon: Heart,
  },
  {
    title: "Easy Support",
    description:
      "Message us for size help, availability, delivery, and payment confirmation.",
    icon: MessageCircle,
  },
];

export function AboutPageContent() {
  return (
    <div className="min-h-screen bg-ivory px-4 py-8 text-deep-brown sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[1.75rem] border border-warm-border bg-soft-white p-6 shadow-sm sm:rounded-[2.5rem] sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold tracking-[0.28em] text-muted-gold uppercase">
                About Handpicked
              </p>

              <h1 className="mt-4 font-serif-brand text-5xl font-medium leading-[0.94] tracking-[-0.045em] text-deep-brown sm:text-7xl">
                Boutique pieces,
                <span className="block italic text-soft-brown">
                  thoughtfully selected
                </span>
              </h1>
            </div>

            <div>
              <p className="text-base leading-8 text-soft-brown">
                Handpicked is a curated boutique collection of clothing,
                accessories, and beauty pieces selected for graceful everyday
                style. We focus on pieces that feel elegant, wearable, and easy
                to love.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold tracking-[0.16em] !text-[#FFFDF9] uppercase transition hover:bg-[#6F5A49]"
                >
                  Shop Collection
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-warm-border bg-soft-white px-6 text-xs font-semibold tracking-[0.16em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="rounded-[1.5rem] border border-warm-border bg-soft-white p-5 shadow-sm sm:p-6"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold">
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </div>

                <h2 className="font-serif-brand text-3xl font-medium leading-tight text-deep-brown">
                  {value.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-soft-brown">
                  {value.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="mt-6 rounded-[1.5rem] border border-muted-gold/35 bg-light-sand p-5 shadow-sm sm:p-7">
          <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/30 bg-soft-white text-muted-gold">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
                How ordering works
              </p>

              <p className="mt-2 text-sm leading-7 text-soft-brown">
                Choose your piece, submit your order request, and our team will
                confirm availability, delivery charge, and payment details.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex h-11 items-center justify-center rounded-full border border-warm-border bg-soft-white px-6 text-xs font-semibold tracking-[0.16em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
            >
              Start Shopping
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
