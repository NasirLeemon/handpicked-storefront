import { ArrowRight, PackageCheck } from "lucide-react";
import Link from "next/link";

export function DeliveryNoteSection() {
  return (
    <section className="border-b border-warm-border bg-[#F3ECE3]">
      <div className="grid w-full md:grid-cols-[0.9fr_1.1fr]">
        <div className="px-6 py-11 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
          <div className="flex items-center gap-3">
            <PackageCheck
              className="h-5 w-5 text-muted-gold"
              strokeWidth={1.5}
            />

            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-gold">
              Delivery
            </p>
          </div>

          <h2 className="mt-5 max-w-xl font-serif-brand text-4xl font-semibold leading-[0.98] tracking-[-0.045em] text-deep-brown sm:text-5xl">
            Delivered across Bangladesh.
          </h2>
        </div>

        <div className="border-t border-warm-border px-6 py-11 sm:px-8 md:border-l md:border-t-0 lg:px-12 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-base font-medium text-deep-brown">
              Outside Dhaka orders require advance payment.
            </p>

            <p className="mt-3 text-sm leading-7 text-soft-brown">
              Select your delivery area during checkout. We'll confirm your
              order and any required advance payment details before dispatch.
            </p>

            <Link
              href="/shipping-and-delivery"
              className="mt-7 inline-flex items-center gap-2 border-b border-deep-brown pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-deep-brown transition hover:text-muted-gold"
            >
              Shipping details
              <ArrowRight
                className="h-4 w-4"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
