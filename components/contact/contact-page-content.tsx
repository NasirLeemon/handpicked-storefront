import { ContactDeliverySection } from "@/components/contact/contact-delivery-section";
import { ContactFaqSection } from "@/components/contact/contact-faq-section";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactPromiseSection } from "@/components/contact/contact-promise-section";
import { ContactSupportSection } from "@/components/contact/contact-support-section";

export function ContactPageContent() {
  return (
    <div className="min-h-screen bg-ivory px-4 py-5 text-deep-brown sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <ContactHero />
        <ContactSupportSection />
        <ContactDeliverySection />
        <ContactPromiseSection />
        <ContactFaqSection />
      </div>
    </div>
  );
}