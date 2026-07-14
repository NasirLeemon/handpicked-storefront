import {
  Clock3,
  Heart,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { ContactCard } from "@/components/contact/contact-card";
import { businessInfo } from "@/data/business-info";

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

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Choose a product and submit your order request, or message us directly on Facebook. We will confirm availability, delivery charges, and payment details.",
  },
  {
    question: "What are the delivery charges?",
    answer: `Delivery is ৳${businessInfo.insideDhakaDeliveryFee} inside Dhaka and ৳${businessInfo.outsideDhakaDeliveryFee} outside Dhaka.`,
  },
  {
    question: "How long does delivery take?",
    answer: `${businessInfo.insideDhakaDeliveryTime} inside Dhaka and ${businessInfo.outsideDhakaDeliveryTime.toLowerCase()} outside Dhaka.`,
  },
  {
    question: "Can I get help with sizing or product details?",
    answer:
      "Yes. Message us before ordering and we will help with sizing, color, availability, and other product information.",
  },
];

export function ContactPageContent() {
  return (
    <div className="min-h-screen bg-ivory px-4 py-5 text-deep-brown sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_16px_45px_rgba(47,33,24,0.055)]">
          <div className="relative px-5 py-5 sm:px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.74))]" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
                  <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold tracking-[0.26em] text-muted-gold uppercase">
                    Contact
                  </p>

                  <h1 className="mt-1 text-3xl font-semibold tracking-[-0.045em] text-deep-brown sm:text-[2rem]">
                    We’re here before you order
                  </h1>
                </div>
              </div>

              <div className="max-w-md border-t border-warm-border pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <p className="text-sm leading-6 text-soft-brown">
                  Message us for size, color, availability, delivery, or
                  payment support before placing your order.
                </p>

                <p className="mt-1 text-xs font-medium tracking-[0.14em] text-muted-gold uppercase">
                  Support from {businessInfo.supportHours}
                </p>
              </div>
            </div>
          </div>
        </div>

        <ContactCard />

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] p-6 shadow-[0_16px_45px_rgba(47,33,24,0.055)] sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
              <Truck className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <p className="mt-5 text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
              Delivery Information
            </p>

            <h2 className="mt-2 font-serif-brand text-3xl font-medium text-deep-brown">
              Delivery across Bangladesh
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-soft-brown">
              <div className="flex items-start justify-between gap-5 border-b border-warm-border pb-3">
                <div>
                  <p className="font-semibold text-deep-brown">Inside Dhaka</p>
                  <p>{businessInfo.insideDhakaDeliveryTime}</p>
                </div>

                <p className="font-semibold text-deep-brown">
                  ৳{businessInfo.insideDhakaDeliveryFee}
                </p>
              </div>

              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-semibold text-deep-brown">
                    Outside Dhaka
                  </p>
                  <p>{businessInfo.outsideDhakaDeliveryTime}</p>
                </div>

                <p className="font-semibold text-deep-brown">
                  ৳{businessInfo.outsideDhakaDeliveryFee}
                </p>
              </div>
            </div>

            <p className="mt-5 rounded-2xl bg-light-sand px-4 py-3 text-xs leading-6 text-soft-brown">
              Outside Dhaka orders require advance payment before dispatch.
            </p>
          </article>

          <article className="rounded-[1.75rem] border border-warm-border bg-light-sand p-6 shadow-[0_16px_45px_rgba(47,33,24,0.055)] sm:p-7">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/25 bg-[#FFFDF9] text-muted-gold">
              <Clock3 className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <p className="mt-5 text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
              Support Hours
            </p>

            <h2 className="mt-2 font-serif-brand text-3xl font-medium text-deep-brown">
              Message us when you need help
            </h2>

            <p className="mt-4 text-sm leading-7 text-soft-brown">
              Our support hours are{" "}
              <span className="font-semibold text-deep-brown">
                {businessInfo.supportHours}
              </span>
              . Messenger is generally the fastest way to reach us.
            </p>

            <a
              href={businessInfo.messengerUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#3F2A20] px-7 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase transition hover:bg-[#5B4435]"
            >
              Start a Conversation
            </a>
          </article>
        </section>

        <section className="mt-6">
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

        <section className="mt-6 rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] p-6 shadow-[0_16px_45px_rgba(47,33,24,0.055)] sm:p-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
              Quick Answers
            </p>

            <h2 className="mt-2 font-serif-brand text-4xl font-medium text-deep-brown">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-[1.25rem] border border-warm-border bg-light-sand/55 p-5"
              >
                <h3 className="text-base font-semibold text-deep-brown">
                  {faq.question}
                </h3>

                <p className="mt-2 text-sm leading-7 text-soft-brown">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}