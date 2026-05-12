import { BoutiqueButton } from "@/components/common/boutique-button";

const messengerUrl = "https://m.me/843144242224804";

export function OrderConfirmation() {
  return (
    <div className="rounded-[1.75rem] border border-muted-gold/40 bg-soft-white p-8 text-center">
      <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
        Order Request Received
      </p>

      <h2 className="mt-3 font-serif-brand text-4xl font-semibold text-deep-brown">
        Thank you for choosing Handpicked
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-soft-brown">
        Your order request has been received. Our team will contact you soon to
        confirm product availability, delivery details, and payment
        instructions.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <BoutiqueButton href="/shop" variant="secondary">
          Continue Shopping
        </BoutiqueButton>

        <BoutiqueButton href={messengerUrl}>
          Message on Facebook
        </BoutiqueButton>
      </div>
    </div>
  );
}
