import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata: Metadata = {
  title: "Contact Handpicked",
  description:
    "Contact Handpicked for product availability, size guidance, delivery information, payment support, and order assistance across Bangladesh.",
  alternates: {
    canonical: "https://handpickedbd.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}