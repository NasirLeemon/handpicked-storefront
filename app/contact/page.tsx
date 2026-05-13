import type { Metadata } from "next";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Handpicked for product availability, size guidance, delivery support, and order questions.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
