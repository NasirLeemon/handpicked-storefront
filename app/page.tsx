import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";

export const metadata: Metadata = {
  title: "Boutique Clothing, Beauty Products & Accessories",
  description:
    "Discover Handpicked's curated collection of clothing, accessories, and beauty pieces selected for soft elegance and everyday style.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Handpicked",
  url: "https://handpickedbd.com",
  logo: "https://handpickedbd.com/images/brand/handpicked_logo.png",
  description:
    "Handpicked is a Bangladesh-based online boutique offering thoughtfully selected women's clothing, beauty products, and accessories.",
  sameAs: [
    "https://web.facebook.com/profile.php?id=61585418970148",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <HomePageContent />
    </>
  );
}