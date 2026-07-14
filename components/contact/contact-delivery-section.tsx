import { Clock3, Truck } from "lucide-react";
import { businessInfo } from "@/data/business-info";

export function ContactDeliverySection() {
  return (
    <section className="mt-8 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
      <article className="rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] p-6 shadow-[0_16px_45px_rgba(47,33,24,0.055)] sm:p-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
          <Truck className="h-5 w-5" strokeWidth={1.7} />
        </div>

        <p className="mt-5 text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
          Delivery Information
        </p>

        <h2 className="mt-2 font-serif-brand text-3xl font-medium text-deep-brown">
          Delivery across Bangladesh
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-7 text-soft-brown">
          <div className="flex items-start justify-between gap-5 border-b border-warm-border pb-3">
            <div>
              <p className="font-semibold text-deep-brown">Inside Dhaka</p>
              <p>{businessInfo.insideDhakaDeliveryTime}</p>
            </div>

            <p className="text-lg font-semibold text-deep-brown">
              ৳{businessInfo.insideDhakaDeliveryFee}
            </p>
          </div>

          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="font-semibold text-deep-brown">Outside Dhaka</p>
              <p>{businessInfo.outsideDhakaDeliveryTime}</p>
            </div>

            <p className="text-lg font-semibold text-deep-brown">
              ৳{businessInfo.outsideDhakaDeliveryFee}
            </p>
          </div>
        </div>

        <p className="mt-5 rounded-2xl bg-light-sand px-4 py-3 text-xs leading-6 text-soft-brown">
          Outside Dhaka orders require advance payment before dispatch.
        </p>
      </article>

      <article className="flex flex-col rounded-[1.75rem] border border-warm-border bg-light-sand p-6 shadow-[0_16px_45px_rgba(47,33,24,0.055)] sm:p-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/25 bg-[#FFFDF9] text-muted-gold">
          <Clock3 className="h-5 w-5" strokeWidth={1.7} />
        </div>

        <p className="mt-5 text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
          Support Hours
        </p>

        <h2 className="mt-2 font-serif-brand text-3xl font-medium text-deep-brown">
          Message us when you need help
        </h2>

        <p className="mt-4 text-sm leading-7 text-soft-brown">
          We usually reply during{" "}
          <span className="font-semibold text-deep-brown">
            {businessInfo.supportHours}
          </span>
          . Messenger is the fastest way to reach us.
        </p>

        <a
          href={businessInfo.messengerUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex h-11 w-fit items-center justify-center rounded-full bg-[#3F2A20] px-7 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase transition hover:bg-[#5B4435]"
        >
          Start a Conversation
        </a>
      </article>
    </section>
  );
}