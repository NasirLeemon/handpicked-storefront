import { BrandStorySection } from "@/components/home/brand-story-section";
import { DeliveryNoteSection } from "@/components/home/delivery-note-section";
import { HomeHero } from "@/components/home/home-hero";
import { HowToOrderSection } from "@/components/home/how-to-order-section";
import { MessengerCtaSection } from "@/components/home/messenger-cta-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { ShopByCollectionSection } from "@/components/home/shop-by-collection-section";
import { TrustStrip } from "@/components/home/trust-strip";

export function HomePageContent() {
  return (
    <div className="min-h-screen bg-ivory text-deep-brown">
      <HomeHero />
<TrustStrip />
<ShopByCollectionSection />
<NewArrivalsSection />
<BrandStorySection />
<HowToOrderSection />
<DeliveryNoteSection />
<MessengerCtaSection />
    </div>
  );
}
