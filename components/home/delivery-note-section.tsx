import { WalletCards } from "lucide-react";

export function DeliveryNoteSection() {
  return (
    <section className="bg-ivory px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[1.5rem] border border-muted-gold/40 bg-light-sand px-5 py-6 text-left shadow-sm sm:rounded-[2rem] sm:px-10 sm:py-8 sm:text-center">
          <div className="mb-4 flex items-center gap-3 sm:justify-center">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-muted-gold/30 bg-soft-white text-muted-gold">
              <WalletCards className="h-4 w-4" strokeWidth={1.7} />
            </div>

            <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase sm:text-xs">
              Delivery Note
            </p>
          </div>

          <h2 className="font-serif-brand text-3xl font-medium leading-tight tracking-[-0.02em] text-deep-brown sm:text-4xl">
            Outside Dhaka orders require advance payment
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-soft-brown sm:mx-auto sm:mt-4 sm:leading-7 sm:text-base">
            After you submit your order request, our team will contact you with
            delivery and payment confirmation details.
          </p>
        </div>
      </div>
    </section>
  );
}
