import { MessageCircle, Phone, Globe } from "lucide-react";
import { BoutiqueButton } from "@/components/common/boutique-button";

const messengerUrl = "https://m.me/843144242224804";
const facebookUrl = "https://web.facebook.com/profile.php?id=61585418970148";

export function ContactCard() {
  return (
    <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[1.5rem] border border-warm-border bg-soft-white p-5 shadow-sm sm:rounded-[2rem] sm:p-8">
        <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
          Message Us
        </p>

        <h2 className="mt-3 font-serif-brand text-4xl font-medium leading-tight tracking-[-0.035em] text-deep-brown sm:text-5xl">
          Ask about size, availability, or delivery
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-soft-brown sm:text-base">
          For the fastest support, message us on Facebook. We can confirm
          product availability, help with sizing, and answer delivery or payment
          questions before you place an order.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <BoutiqueButton href={messengerUrl}>Message on Facebook</BoutiqueButton>

          <BoutiqueButton href={facebookUrl} variant="secondary">
            Visit Facebook Page
          </BoutiqueButton>
        </div>
      </div>

      <div className="grid gap-4">
        <ContactInfoCard
          icon={MessageCircle}
          title="Messenger"
          description="Message us for product and order support."
        />

        <ContactInfoCard
          icon={Globe}
          title="Facebook"
          description="Follow our latest pieces and boutique updates."
        />

        <ContactInfoCard
          icon={Phone}
          title="Phone"
          description="Add your customer support phone number here."
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
    <div className="rounded-[1.5rem] border border-warm-border bg-soft-white p-5 shadow-sm">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold">
        <Icon className="h-4 w-4" strokeWidth={1.7} />
      </div>

      <h3 className="font-serif-brand text-3xl font-medium text-deep-brown">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-soft-brown">{description}</p>
    </div>
  );
}
