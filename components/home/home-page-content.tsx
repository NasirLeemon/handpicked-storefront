import { DeliveryNoteSection } from "@/components/home/delivery-note-section";
import { HomeHero } from "@/components/home/home-hero";
import { MessengerCtaSection } from "@/components/home/messenger-cta-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { TrustStrip } from "@/components/home/trust-strip";
import { VisualCategorySection } from "@/components/home/visual-category-section";

export function HomePageContent() {
  return (
    <div className="min-h-screen bg-ivory text-deep-brown">
      <HomeHero />
      <NewArrivalsSection />
      <VisualCategorySection />
      <TrustStrip />
      <DeliveryNoteSection />
      <MessengerCtaSection />
    </div>
  );
}
