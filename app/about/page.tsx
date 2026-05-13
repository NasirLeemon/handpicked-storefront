import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/about-page-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Handpicked, a premium boutique collection built around graceful clothing, soft details, and personal shopping support.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
