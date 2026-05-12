export function DeliveryNoteSection() {
  return (
    <section className="bg-ivory px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-muted-gold/40 bg-light-sand px-6 py-8 text-center sm:px-10">
          <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
            Delivery Note
          </p>

          <h2 className="mt-3 font-serif-brand text-3xl font-semibold text-deep-brown sm:text-4xl">
            Outside Dhaka Orders Require Advance Payment
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-soft-brown sm:text-base">
            For orders outside Dhaka, advance payment is required before
            dispatch. After you submit your order request, our team will contact
            you with payment confirmation details.
          </p>
        </div>
      </div>
    </section>
  );
}
