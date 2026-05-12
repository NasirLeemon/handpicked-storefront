"use client";

import { useState } from "react";
import { BoutiqueButton } from "@/components/common/boutique-button";

const messengerUrl = "https://m.me/843144242224804";

type OrderConfirmationProps = {
  orderMessage: string;
};

export function OrderConfirmation({ orderMessage }: OrderConfirmationProps) {
  const [wasCopied, setWasCopied] = useState(false);

  async function copyOrderMessage() {
    await navigator.clipboard.writeText(orderMessage);
    setWasCopied(true);

    window.setTimeout(() => {
      setWasCopied(false);
    }, 1800);
  }

  return (
    <div className="rounded-[1.75rem] border border-muted-gold/40 bg-soft-white p-8 text-center">
      <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
        Order Request Received
      </p>

      <h2 className="mt-3 font-serif-brand text-4xl font-semibold text-deep-brown">
        Thank you for choosing Handpicked
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-soft-brown">
        Your order request has been prepared. Copy the order summary or message
        us on Facebook to confirm availability, delivery, and payment details.
      </p>

      <div className="mt-8 rounded-2xl border border-warm-border bg-ivory p-4 text-left">
        <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-muted-gold uppercase">
          Order Summary Message
        </p>

        <pre className="max-h-72 overflow-auto whitespace-pre-wrap text-sm leading-7 text-soft-brown">
          {orderMessage}
        </pre>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={copyOrderMessage}
          className="inline-flex h-12 items-center justify-center rounded-full border border-warm-border bg-soft-white px-8 text-sm font-semibold tracking-[0.18em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
        >
          {wasCopied ? "Copied" : "Copy Summary"}
        </button>

        <BoutiqueButton href={messengerUrl}>Message on Facebook</BoutiqueButton>
      </div>

      <div className="mt-3 flex justify-center">
        <BoutiqueButton href="/shop" variant="secondary">
          Continue Shopping
        </BoutiqueButton>
      </div>
    </div>
  );
}
