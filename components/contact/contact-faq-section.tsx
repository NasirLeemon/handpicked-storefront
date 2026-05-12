const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Choose your product, add it to cart, and submit the order request form. Our team will contact you to confirm availability and delivery details.",
  },
  {
    question: "Is advance payment required?",
    answer:
      "For orders outside Dhaka, advance payment is required before dispatch.",
  },
  {
    question: "Can I ask about size before ordering?",
    answer:
      "Yes. You can message us on Facebook for size guidance before placing your order.",
  },
  {
    question: "Is delivery available outside Dhaka?",
    answer:
      "Yes. Outside Dhaka delivery is available with advance payment confirmation.",
  },
];

export function ContactFaqSection() {
  return (
    <section className="bg-soft-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
            Questions
          </p>

          <h2 className="font-serif-brand text-4xl font-semibold tracking-tight text-deep-brown sm:text-5xl">
            Helpful ordering information
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-[1.75rem] border border-warm-border bg-ivory p-6"
            >
              <h3 className="font-serif-brand text-2xl font-semibold text-deep-brown">
                {faq.question}
              </h3>

              <p className="mt-3 text-sm leading-7 text-soft-brown">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
