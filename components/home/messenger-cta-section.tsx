import { MessageCircle } from "lucide-react";
import { BoutiqueButton } from "@/components/common/boutique-button";

const messengerUrl = "https://m.me/843144242224804";

export function MessengerCtaSection() {
  return (
    <section className="bg-soft-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-warm-border bg-ivory px-6 py-12 text-center sm:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-muted-gold/40 bg-light-sand text-muted-gold">
          <MessageCircle className="h-6 w-6" />
        </div>

        <p className="mt-6 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
          Personal Support
        </p>

        <h2 className="mt-3 font-serif-brand text-4xl font-semibold tracking-tight text-deep-brown sm:text-5xl">
          Need Help Choosing?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-soft-brown sm:text-base">
          Message us on Facebook for size guidance, product availability,
          delivery questions, or styling help before placing your order.
        </p>

        <div className="mt-8 flex justify-center">
          <BoutiqueButton href={messengerUrl}>Message on Facebook</BoutiqueButton>
        </div>
      </div>
    </section>
  );
}
