import type { Metadata } from "next";
import { HomePageContent } from "@/components/home/home-page-content";

export const metadata: Metadata = {
  title: "Premium Boutique Clothing",
  description:
    "Discover Handpicked's curated collection of clothing, accessories, and beauty pieces selected for soft elegance and everyday style.",
};

export default function HomePage() {
  return <HomePageContent />;
}
