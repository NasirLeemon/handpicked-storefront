import type { Metadata } from "next";
import { PolicyPageShell } from "@/components/policies/policy-page-shell";
import { PolicySection } from "@/components/policies/policy-section";
import { businessInfo } from "@/data/business-info";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description:
    "Read Handpicked's delivery charges, estimated delivery times, advance payment requirements, and nationwide shipping information.",
  alternates: {
    canonical: "https://handpickedbd.com/shipping-and-delivery",
  },
};

export default function ShippingAndDeliveryPage() {
  return (
    <PolicyPageShell
      eyebrow="Customer Care"
      title="Shipping & Delivery Policy"
      description="Everything you need to know about delivery charges, payment requirements, and estimated delivery times for Handpicked orders."
    >
      <PolicySection title="Delivery Coverage">
        <p>
          Handpicked currently delivers orders throughout Bangladesh using
          third-party courier services.
        </p>
      </PolicySection>

      <PolicySection title="Delivery Charges">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Inside Dhaka:{" "}
            <strong className="text-deep-brown">
              ৳{businessInfo.insideDhakaDeliveryFee}
            </strong>
          </li>
          <li>
            Outside Dhaka:{" "}
            <strong className="text-deep-brown">
              ৳{businessInfo.outsideDhakaDeliveryFee}
            </strong>
          </li>
        </ul>
      </PolicySection>

      <PolicySection title="Estimated Delivery Time">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Inside Dhaka: {businessInfo.insideDhakaDeliveryTime}
          </li>
          <li>
            Outside Dhaka: {businessInfo.outsideDhakaDeliveryTime}
          </li>
        </ul>

        <p>
          Delivery times are estimates. Delays may occur because of courier
          operations, weather, public holidays, strikes, traffic, remote
          locations, or other circumstances outside our control.
        </p>
      </PolicySection>

      <PolicySection title="Payment and Advance Requirements">
        <p>
          Cash on Delivery is available for orders inside and outside Dhaka.
        </p>

        <p>
          For outside-Dhaka orders, the ৳
          {businessInfo.outsideDhakaDeliveryFee} delivery charge must be paid
          in advance before dispatch. The remaining product amount may be paid
          through Cash on Delivery.
        </p>

        <p>
          We currently accept Cash on Delivery and approved mobile-banking
          payments.
        </p>
      </PolicySection>

      <PolicySection title="Order Confirmation and Dispatch">
        <p>
          An order request is not considered fully confirmed until our team has
          verified product availability, customer information, delivery charge,
          and any required advance payment.
        </p>

        <p>
          Customers should provide a complete name, active phone number, and
          accurate delivery address. Incorrect or incomplete information may
          delay or prevent delivery.
        </p>
      </PolicySection>

      <PolicySection title="Courier Communication">
        <p>
          Customers should keep their phone available when an order is out for
          delivery. Repeated failed delivery attempts, refusal to receive the
          parcel, or inability to contact the customer may result in the order
          being returned.
        </p>
      </PolicySection>
    </PolicyPageShell>
  );
}