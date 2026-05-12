const values = [
  {
    title: "Curated Selection",
    description:
      "Each piece is chosen with attention to style, comfort, and everyday elegance.",
  },
  {
    title: "Soft Boutique Feel",
    description:
      "We focus on graceful clothing that feels refined, feminine, and easy to wear.",
  },
  {
    title: "Personal Support",
    description:
      "Need help with size, color, or availability? Message us directly for guidance.",
  },
];

export function AboutValuesSection() {
  return (
    <section className="bg-soft-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
            Why Handpicked
          </p>

          <h2 className="font-serif-brand text-4xl font-semibold tracking-tight text-deep-brown sm:text-5xl">
            Refined, personal, and easy to love
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-[1.75rem] border border-warm-border bg-ivory p-7"
            >
              <h3 className="font-serif-brand text-3xl font-semibold text-deep-brown">
                {value.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-soft-brown">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
