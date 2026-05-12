import { MessengerCtaSection } from "@/components/home/messenger-cta-section";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStorySection } from "@/components/about/about-story-section";
import { AboutValuesSection } from "@/components/about/about-values-section";

export function AboutPageContent() {
  return (
    <div className="min-h-screen bg-ivory text-deep-brown">
      <AboutHero />
      <AboutStorySection />
      <AboutValuesSection />
      <MessengerCtaSection />
    </div>
  );
}
