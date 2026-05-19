import { ArrowRight, Globe, MessageCircle, Phone } from "lucide-react";
import { businessInfo } from "@/data/business-info";

export function ContactCard() {
  return (
    <section className="grid items-start gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-[#FFFDF9] shadow-[0_18px_55px_rgba(47,33,24,0.075)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.13),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.72))]" />

        <div className="relative p-5 sm:p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
            <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.7} />
          </div>

          <p className="mt-6 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
            Message Us
          </p>

          <h2 className="mt-2 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.045em] text-deep-brown sm:text-4xl">
            Ask about size, availability, or delivery
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-soft-brown">
            Message us on Facebook for product availability, size guidance,
            delivery, and payment questions before you order.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={businessInfo.messengerUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-3 rounded-full bg-[#3F2A20] px-7 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase shadow-[0_14px_30px_rgba(63,42,32,0.16)] transition hover:bg-[#5B4435]"
            >
              Message on Facebook
              <ArrowRight className="h-4 w-4" strokeWidth={1.7} />
            </a>

            <a
              href={businessInfo.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-warm-border bg-white/45 px-7 text-xs font-semibold tracking-[0.18em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
            >
              Visit Facebook Page
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <ContactInfoCard
          icon={MessageCircle}
          title="Messenger"
          description="Fastest way to ask about products and orders."
        />

        <ContactInfoCard
          icon={Globe}
          title="Facebook"
          description="Follow latest pieces and boutique updates."
        />

        <ContactInfoCard
          icon={Phone}
          title="Phone"
          description={businessInfo.phone}
        />
      </div>
    </section>
  );
}

type ContactInfoCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

function ContactInfoCard({
  icon: Icon,
  title,
  description,
}: ContactInfoCardProps) {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] border border-warm-border bg-[#FFFDF9] shadow-[0_14px_42px_rgba(47,33,24,0.055)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.10),transparent_34%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.64))]" />

      <div className="relative flex items-start gap-4 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
          <Icon className="h-4 w-4" strokeWidth={1.7} />
        </div>

        <div>
          <h3 className="text-lg font-semibold tracking-[-0.025em] text-deep-brown">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-soft-brown">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
