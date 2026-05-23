import { PackageCheck } from "lucide-react";

export function DeliveryNoteSection() {
  return (
    <section className="bg-ivory px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_18px_55px_rgba(47,33,24,0.065)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

          <div className="relative flex flex-col gap-4 px-5 py-5 sm:px-7 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
                <PackageCheck className="h-4 w-4" strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.26em] text-muted-gold uppercase">
                  Delivery Note
                </p>

                <h2 className="mt-2 font-serif-brand text-3xl font-medium tracking-[-0.04em] text-deep-brown sm:text-3xl">
                  Outside Dhaka orders require advance payment
                </h2>
              </div>
            </div>

            <p className="max-w-lg text-sm leading-6 text-soft-brown md:text-right">
              After you submit your order request, our team will contact you
              with delivery and payment confirmation details.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
