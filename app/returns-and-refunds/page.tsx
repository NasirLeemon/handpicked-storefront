import type { Metadata } from "next";
import { PolicyPageShell } from "@/components/policies/policy-page-shell";
import { PolicySection } from "@/components/policies/policy-section";

export const metadata: Metadata = {
  title: "Returns, Exchanges & Refunds",
  description:
    "Read Handpicked's return, exchange and refund policy for damaged, incorrect, defective or size-mismatched products.",
  alternates: {
    canonical: "https://handpickedbd.com/returns-and-refunds",
  },
};

export default function ReturnsAndRefundsPage() {
  return (
    <PolicyPageShell
      eyebrow="Customer Care"
      title="Returns, Exchanges & Refunds"
      description="We want every Handpicked order to arrive correctly and in good condition. Please review the following rules before accepting your delivery."
    >
      <PolicySection title="Inspecting the Product">
        <p>
          Customers are requested to inspect the order in the presence of the
          delivery rider whenever the courier permits it.
        </p>

        <p>
          Any visible problem should be reported to Handpicked immediately when
          receiving the product. Please contact us before using, washing, or
          altering the item.
        </p>
      </PolicySection>

      <PolicySection title="Eligible Reasons">
        <p>Returns or exchanges may be accepted when:</p>

        <ul className="list-disc space-y-2 pl-5">
          <li>The wrong product was delivered.</li>
          <li>The product arrived damaged or defective.</li>
          <li>The delivered size does not match the confirmed order.</li>
          <li>
            A beauty product was already damaged, defective, expired, leaking,
            or unusable when received.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Product Condition">
        <p>
          Clothing and accessories must remain unused and unwashed. Original
          tags and packaging are preferred but are not mandatory when a valid
          product problem is reported immediately upon delivery.
        </p>

        <p>
          Beauty products may only be returned after opening when the customer
          discovers that the product was already damaged or defective.
        </p>
      </PolicySection>

      <PolicySection title="Return Delivery Charges">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Handpicked will cover the applicable return delivery charge when
            the product is damaged, defective, incorrect, or the delivered size
            does not match the confirmed order.
          </li>
          <li>
            When the customer changes their mind without a product fault, the
            customer must pay the return delivery charge.
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Size-Related Requests">
        <p>
          Customers are encouraged to ask for size guidance before ordering.
          An exchange may be accepted when the delivered size is incorrect or
          when our team has approved the exchange request.
        </p>

        <p>
          Product availability may affect whether an exchange can be completed.
          If a replacement is unavailable, we will discuss an appropriate
          alternative or refund.
        </p>
      </PolicySection>

      <PolicySection title="Refund Processing">
        <p>
          Approved refunds are normally processed within 1–3 business days.
          The time required for the amount to appear may depend on the selected
          mobile-banking or payment service.
        </p>

        <p>
          Refunds are made only after the return has been approved and, when
          applicable, the returned product has been received or inspected.
        </p>
      </PolicySection>

      <PolicySection title="Cancellation">
        <p>
          An order may be cancelled before dispatch. Once an order has been
          handed to the courier, cancellation may no longer be possible and
          return-delivery charges may apply.
        </p>
      </PolicySection>
    </PolicyPageShell>
  );
}