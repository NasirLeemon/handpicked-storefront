import type { Metadata } from "next";
import { PolicyPageShell } from "@/components/policies/policy-page-shell";
import { PolicySection } from "@/components/policies/policy-section";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the terms governing product availability, pricing, ordering, payment, delivery, cancellation and use of the Handpicked website.",
  alternates: {
    canonical: "https://handpickedbd.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <PolicyPageShell
      eyebrow="Store Terms"
      title="Terms & Conditions"
      description="By using the Handpicked website or placing an order, you agree to the following store terms and conditions."
    >
      <PolicySection title="Products and Availability">
        <p>
          All orders are subject to product availability. Adding a product to
          the cart or submitting an order request does not guarantee
          availability until confirmed by our team.
        </p>

        <p>
          We may correct product information, pricing, stock status, or other
          website errors when identified.
        </p>
      </PolicySection>

      <PolicySection title="Product Images and Colours">
        <p>
          We make reasonable efforts to display products accurately. However,
          product colours may appear slightly different because of lighting,
          photography, screen calibration, or device settings.
        </p>

        <p>
          Small variations in colour, finish, packaging, or pattern placement
          may not be considered defects where they are normal for the product.
        </p>
      </PolicySection>

      <PolicySection title="Prices">
        <p>
          Product prices are shown in Bangladeshi Taka. Delivery charges are
          added separately unless otherwise stated.
        </p>

        <p>
          Prices and promotional offers may change without prior notice, but a
          confirmed order will normally follow the price agreed during
          confirmation.
        </p>
      </PolicySection>

      <PolicySection title="Order Confirmation">
        <p>
          Customers must provide accurate contact and delivery information.
          Handpicked may contact the customer to verify an order before
          dispatch.
        </p>

        <p>
          We reserve the right to reject or cancel an order involving suspected
          fraud, false information, repeated refusal, abuse, stock error, or an
          inability to fulfil the order.
        </p>
      </PolicySection>

      <PolicySection title="Payments">
        <p>
          We currently accept Cash on Delivery and approved mobile-banking
          payments.
        </p>

        <p>
          Outside-Dhaka orders require advance payment of the applicable
          delivery charge before dispatch.
        </p>
      </PolicySection>

      <PolicySection title="Cancellation">
        <p>
          Customers may request cancellation before dispatch. Cancellation may
          not be possible after the parcel has been handed to the courier.
        </p>

        <p>
          Any approved refund for a paid and cancelled order is generally
          processed within 1–3 business days.
        </p>
      </PolicySection>

      <PolicySection title="Returns and Exchanges">
        <p>
          Returns, exchanges, and refunds are governed by our{" "}
          <a
            href="/returns-and-refunds"
            className="font-semibold text-deep-brown underline decoration-muted-gold/50 underline-offset-4"
          >
            Returns, Exchanges & Refunds Policy
          </a>
          .
        </p>
      </PolicySection>

      <PolicySection title="Website Use">
        <p>
          Website content, branding, graphics, photographs, product
          descriptions, and other materials may not be copied, republished, or
          used commercially without permission.
        </p>

        <p>
          Users must not attempt to disrupt the website, gain unauthorised
          access, submit fraudulent orders, or misuse store services.
        </p>
      </PolicySection>

      <PolicySection title="Changes to These Terms">
        <p>
          Handpicked may update these terms when business practices, services,
          or legal requirements change. The latest version will be published on
          this page.
        </p>
      </PolicySection>
    </PolicyPageShell>
  );
}