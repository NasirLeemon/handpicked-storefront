import { MessageCircle } from "lucide-react";
import { businessInfo } from "@/data/business-info";

export function ContactHero() {
  return (
    <section className="mb-6 overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_16px_45px_rgba(47,33,24,0.055)]">
      <div className="relative px-5 py-6 sm:px-7 sm:py-7 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.74))]" />

        <div className="relative grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-0">
          <div className="flex min-w-0 items-center gap-4 pr-0 lg:pr-10">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
              <MessageCircle className="h-5 w-5" strokeWidth={1.7} />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-[0.26em] text-muted-gold uppercase">
                Contact
              </p>

              <h1 className="mt-1 text-3xl font-semibold leading-tight tracking-[-0.045em] text-deep-brown sm:text-4xl">
                We’re here before you order
              </h1>
            </div>
          </div>

          <div className="border-t border-warm-border pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="max-w-xl text-sm leading-7 text-soft-brown sm:text-base">
              Ask about sizing, colors, availability, delivery, or payment
              before placing your order.
            </p>

            <p className="mt-2 text-xs font-medium tracking-[0.16em] text-muted-gold uppercase">
              Support from {businessInfo.supportHours}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}