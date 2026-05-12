const trustItems = [
  {
    title: "Carefully Selected",
    description:
      "Each piece is chosen with attention to style, comfort, and everyday elegance.",
  },
  {
    title: "Boutique Feel",
    description:
      "A soft, refined shopping experience made for graceful wardrobe choices.",
  },
  {
    title: "Easy Ordering",
    description:
      "Submit your order request and our team will confirm availability, delivery, and payment.",
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-warm-border bg-soft-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        {trustItems.map((item) => (
          <div key={item.title}>
            <p className="font-serif-brand text-3xl font-semibold text-deep-brown">
              {item.title}
            </p>
            <p className="mt-3 text-sm leading-7 text-soft-brown">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}