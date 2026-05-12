import { ContactCard } from "@/components/contact/contact-card";
import { ContactFaqSection } from "@/components/contact/contact-faq-section";
import { ContactHero } from "@/components/contact/contact-hero";

export function ContactPageContent() {
  return (
    <div className="min-h-screen bg-ivory text-deep-brown">
      <ContactHero />
      <ContactCard />
      <ContactFaqSection />
    </div>
  );
}
