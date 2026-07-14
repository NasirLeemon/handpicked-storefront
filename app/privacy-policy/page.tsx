import type { Metadata } from "next";
import { PolicyPageShell } from "@/components/policies/policy-page-shell";
import { PolicySection } from "@/components/policies/policy-section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Handpicked collects, uses and protects customer information for orders, delivery, support and promotional communication.",
  alternates: {
    canonical: "https://handpickedbd.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PolicyPageShell
      eyebrow="Privacy"
      title="Privacy Policy"
      description="This policy explains what information Handpicked collects and how it is used when you browse our website, contact us, or place an order."
    >
      <PolicySection title="Information We Collect">
        <p>We may collect information such as:</p>

        <ul className="list-disc space-y-2 pl-5">
          <li>Your name.</li>
          <li>Your phone number.</li>
          <li>Your delivery address.</li>
          <li>Products and order details.</li>
          <li>Messages and support requests.</li>
          <li>
            Website usage information collected through analytics and session
            tools.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="How We Use Information">
        <p>Customer information may be used to:</p>

        <ul className="list-disc space-y-2 pl-5">
          <li>Confirm and process orders.</li>
          <li>Arrange delivery through courier partners.</li>
          <li>Provide product and customer support.</li>
          <li>Process mobile-banking payments and refunds.</li>
          <li>Prevent fraudulent or incorrect orders.</li>
          <li>Improve the website and shopping experience.</li>
          <li>
            Send product updates, offers, or promotional messages where
            appropriate.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Sharing of Information">
        <p>
          We may share necessary customer information with trusted service
          providers, including courier companies, hosting services, analytics
          providers, and payment services, only when required to operate the
          store or fulfil an order.
        </p>

        <p>
          Handpicked does not sell customer personal information to unrelated
          third parties.
        </p>
      </PolicySection>

      <PolicySection title="Analytics and Cookies">
        <p>
          Our website uses services including Google Analytics and Microsoft
          Clarity to understand visits, page usage, clicks, scrolling, device
          information, and general website performance.
        </p>

        <p>
          These services may use cookies or similar technologies. Customers can
          control cookies through their browser settings.
        </p>
      </PolicySection>

      <PolicySection title="Promotional Communication">
        <p>
          We may contact customers about new arrivals, offers, or other
          Handpicked updates. Customers may ask us to stop promotional
          communication at any time by messaging us.
        </p>

        <p>
          Important order, payment, delivery, refund, or support messages may
          still be sent when necessary.
        </p>
      </PolicySection>

      <PolicySection title="Information Security">
        <p>
          We take reasonable steps to protect customer information. However, no
          internet transmission or electronic storage method can be guaranteed
          to be completely secure.
        </p>
      </PolicySection>

      <PolicySection title="Updating or Removing Information">
        <p>
          Customers may contact us to request a correction or deletion of
          personal information, subject to any information we reasonably need
          to retain for order, accounting, fraud-prevention, or legal purposes.
        </p>
      </PolicySection>
    </PolicyPageShell>
  );
}