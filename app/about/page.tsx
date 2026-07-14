import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/about-page-content";

export const metadata: Metadata = {
  title: "About Handpicked",
  description:
    "Learn about Handpicked, a Bangladesh-based online boutique offering thoughtfully selected women's clothing, beauty products, and accessories.",
  alternates: {
    canonical: "https://handpickedbd.com/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}