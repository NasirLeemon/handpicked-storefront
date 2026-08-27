import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";

export const metadata: Metadata = {
  title: "Women's Clothing, Beauty, Skincare & Haircare",
  description:
    "Shop Handpicked for women's clothing, skincare, haircare, makeup, beauty products and accessories in Bangladesh.",
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