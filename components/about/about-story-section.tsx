export function AboutStorySection() {
  return (
    <section className="bg-ivory px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-warm-border bg-light-sand">
          <div className="flex aspect-[4/5] items-center justify-center px-8 text-center">
            <div>
              <p className="font-serif-brand text-4xl font-semibold text-deep-brown">
                Brand Image
              </p>
              <p className="mt-3 text-sm leading-7 text-soft-brown">
                Add a soft lifestyle or boutique product photo here.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
            Handpicked With Care
          </p>

          <h2 className="font-serif-brand text-4xl font-semibold leading-tight tracking-tight text-deep-brown sm:text-5xl">
            Elegant pieces for everyday confidence
          </h2>

          <div className="mt-6 space-y-5 text-base leading-8 text-soft-brown">
            <p>
              At Handpicked, every piece is chosen with care. We believe
              clothing should feel elegant, comfortable, and personal — something
              you can wear with confidence in your everyday life.
            </p>

            <p>
              Our collection is built around soft details, refined colors,
              graceful silhouettes, and pieces that feel special without being
              excessive.
            </p>

            <p>
              We want your shopping experience to feel personal and calm, with
              support for size guidance, product availability, delivery, and
              order confirmation whenever you need it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
