import { MessageCircle } from "lucide-react";
import { BoutiqueButton } from "@/components/common/boutique-button";
import { businessInfo } from "@/data/business-info";

export function MessengerCtaSection() {
  return (
    <section className="bg-soft-white px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[1.5rem] border border-warm-border bg-ivory px-5 py-7 text-left shadow-sm sm:rounded-[2rem] sm:px-10 sm:py-12 sm:text-center">
        <div className="mb-4 flex items-center gap-3 sm:block">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-muted-gold/40 bg-light-sand text-muted-gold sm:mx-auto sm:h-14 sm:w-14">
            <MessageCircle className="h-4 w-4 sm:h-6 sm:w-6" strokeWidth={1.7} />
          </div>

          <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase sm:mt-6 sm:text-xs sm:tracking-[0.26em]">
            Personal Support
          </p>
        </div>

        <h2 className="font-serif-brand text-3xl font-medium leading-tight tracking-[-0.02em] text-deep-brown sm:text-5xl">
          Need help choosing?
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-soft-brown sm:mx-auto sm:mt-5 sm:text-base sm:leading-7">
          Message us for size guidance, product availability, delivery
          questions, or styling help.
        </p>

        <div className="mt-6 flex sm:mt-8 sm:justify-center">
          <BoutiqueButton href={businessInfo.messengerUrl}>
            Message on Facebook
          </BoutiqueButton>
        </div>
      </div>
    </section>
  );
}
