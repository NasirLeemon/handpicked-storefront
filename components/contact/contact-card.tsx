import { Globe, MessageCircle, Phone } from "lucide-react";
import { BoutiqueButton } from "@/components/common/boutique-button";

const facebookUrl = "https://web.facebook.com/profile.php?id=61585418970148";
const messengerUrl = "https://m.me/843144242224804";

export function ContactCard() {
  return (
    <section className="bg-ivory px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
        <div className="rounded-[2rem] border border-warm-border bg-soft-white p-8 sm:p-10">
          <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
            Message Us
          </p>

          <h2 className="mt-3 font-serif-brand text-4xl font-semibold text-deep-brown sm:text-5xl">
            Ask about size, availability, or delivery
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-8 text-soft-brown">
            For the fastest support, message us on Facebook. We can help confirm
            product availability, guide you with sizing, and answer delivery or
            payment questions before you place an order.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <BoutiqueButton href={messengerUrl}>Message on Facebook</BoutiqueButton>

            <BoutiqueButton href={facebookUrl} variant="secondary">
              Visit Facebook Page
            </BoutiqueButton>
          </div>
        </div>

        <div className="space-y-5">
          <ContactInfoItem
            icon="message"
            title="Messenger"
            description="Message us for product and order support."
            href={messengerUrl}
          />

          <ContactInfoItem
            icon="facebook"
            title="Facebook"
            description="Follow our latest pieces and boutique updates."
            href={facebookUrl}
          />

          <ContactInfoItem
            icon="phone"
            title="Phone"
            description="Add your customer support phone number here."
          />
        </div>
      </div>
    </section>
  );
}

type ContactInfoItemProps = {
  icon: "message" | "facebook" | "phone";
  title: string;
  description: string;
  href?: string;
};

function ContactInfoItem({
  icon,
  title,
  description,
  href,
}: ContactInfoItemProps) {
  const Icon =
    icon === "message" ? MessageCircle : icon === "facebook" ? Globe : Phone;

  const content = (
    <div className="rounded-[1.75rem] border border-warm-border bg-soft-white p-6 transition hover:border-muted-gold">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-muted-gold/40 bg-light-sand text-muted-gold">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-5 font-serif-brand text-3xl font-semibold text-deep-brown">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-soft-brown">{description}</p>
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {content}
    </a>
  );
}
