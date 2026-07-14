import {
  ArrowRight,
  Globe,
  MessageCircle,
  Phone,
} from "lucide-react";
import { ContactInfoCard } from "@/components/contact/contact-info-card";
import { businessInfo } from "@/data/business-info";

export function ContactSupportSection() {
  const phoneUrl = `tel:${businessInfo.phone.replace(/[^\d+]/g, "")}`;

  return (
    <section className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
      <article className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_18px_55px_rgba(47,33,24,0.075)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

        <div className="relative p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
              <MessageCircle className="h-4 w-4" strokeWidth={1.7} />
            </div>

            <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
              Message Us
            </p>
          </div>

          <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-deep-brown sm:text-[2.15rem]">
            Need help choosing your piece?
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-soft-brown">
            Contact us for product details, sizing, color, availability,
            delivery charges, payment information, or order support.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={businessInfo.messengerUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-3 rounded-full bg-[#3F2A20] px-6 text-xs font-semibold tracking-[0.17em] !text-[#FFFDF9] uppercase shadow-[0_14px_30px_rgba(63,42,32,0.16)] transition hover:bg-[#5B4435]"
            >
              Message on Facebook
              <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
            </a>

            <a
              href={businessInfo.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-warm-border bg-white/45 px-6 text-xs font-semibold tracking-[0.17em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
            >
              Visit Facebook Page
            </a>
          </div>
        </div>
      </article>

      <div className="grid gap-3">
        <ContactInfoCard
          href={businessInfo.messengerUrl}
          icon={MessageCircle}
          title="Messenger"
          description="Our fastest support channel. Tap to start chatting."
          external
        />

        <ContactInfoCard
          href={businessInfo.facebookUrl}
          icon={Globe}
          title="Facebook"
          description="See new arrivals, product updates, and boutique posts."
          external
        />

        <ContactInfoCard
          href={phoneUrl}
          icon={Phone}
          title="Phone"
          description={`${businessInfo.phone} · ${businessInfo.supportHours}`}
        />
      </div>
    </section>
  );
}