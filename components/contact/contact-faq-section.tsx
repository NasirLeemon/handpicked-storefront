import { ChevronDown, HelpCircle } from "lucide-react";
import { businessInfo } from "@/data/business-info";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Choose a product and submit your order request, or message us on Facebook. We will confirm availability, delivery charges, and payment details.",
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
      "Yes. Message us before ordering and we will help with sizing, color, availability, and other product details.",
  },
  {
    question: "Is advance payment required?",
    answer:
      "Outside Dhaka orders require advance delivery charge payment before dispatch. Our team will confirm the exact payment details after receiving your order request.",
  },
];

export function ContactFaqSection() {
  return (
    <section className="mt-10 overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_16px_45px_rgba(47,33,24,0.055)]">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.72fr_1.28fr] lg:p-10">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
            <HelpCircle className="h-5 w-5" strokeWidth={1.7} />
          </div>

          <p className="mt-5 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
            Quick Answers
          </p>

          <h2 className="mt-2 font-serif-brand text-4xl font-medium leading-tight text-deep-brown">
            Frequently asked questions
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-7 text-soft-brown">
            Find quick answers about orders, delivery, payment, and product
            support.
          </p>
        </div>

        <div className="divide-y divide-warm-border border-y border-warm-border">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left">
                <span className="text-base font-semibold text-deep-brown">
                  {faq.question}
                </span>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-warm-border bg-light-sand text-muted-gold">
                  <ChevronDown className="h-4 w-4 transition duration-300 group-open:rotate-180" />
                </span>
              </summary>

              <p className="max-w-2xl pb-5 pr-12 text-sm leading-7 text-soft-brown">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}