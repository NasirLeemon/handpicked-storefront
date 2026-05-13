"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { CheckoutInput } from "@/components/checkout/checkout-input";
import { CheckoutSelect } from "@/components/checkout/checkout-select";
import { DeliveryAreaNotice } from "@/components/checkout/delivery-area-notice";
import { FieldError } from "@/components/checkout/field-error";
import {
  deliveryAreaOptions,
  insideDhakaPaymentOptions,
  outsideDhakaPaymentOptions,
} from "@/components/checkout/checkout-form-options";
import { FormField } from "@/components/checkout/form-field";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";
import { createOrderMessage } from "@/lib/order-message";
import type { CartItem } from "@/types/cart";
import type { DeliveryArea } from "@/types/order";

type CheckoutFormErrors = {
  fullName?: string;
  phone?: string;
  address?: string;
  order?: string;
};

type CheckoutFormProps = {
  items: CartItem[];
  clearCartOnSubmit?: boolean;
};

export function CheckoutForm({
  items,
  clearCartOnSubmit = false,
}: CheckoutFormProps) {
  const { clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentType, setPaymentType] = useState("cash-on-delivery");
  const [deliveryArea, setDeliveryArea] =
    useState<DeliveryArea>("inside-dhaka");
  const [orderMessage, setOrderMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<CheckoutFormErrors>({});

  const hasItems = items.length > 0;

  const paymentOptions = useMemo(() => {
    if (deliveryArea === "outside-dhaka") {
      return outsideDhakaPaymentOptions;
    }

    return insideDhakaPaymentOptions;
  }, [deliveryArea]);

  function handleDeliveryAreaChange(value: string) {
    const nextDeliveryArea = value as DeliveryArea;

    setDeliveryArea(nextDeliveryArea);

    if (nextDeliveryArea === "outside-dhaka") {
      setPaymentType("bkash");
      return;
    }

    setPaymentType("cash-on-delivery");
  }

  function validateForm() {
    const nextErrors: CheckoutFormErrors = {};

    if (!hasItems) {
      nextErrors.order =
        "Please add a product before submitting an order request.";
    }

    if (!fullName.trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }

    if (!phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    }

    if (!address.trim()) {
      nextErrors.address = "Please enter your full delivery address.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const message = createOrderMessage({
      items,
      fullName,
      phone,
      address,
      deliveryArea,
      paymentType,
      note,
    });

    setOrderMessage(message);

    if (clearCartOnSubmit) {
      clearCart();
    }

    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return <OrderConfirmation orderMessage={orderMessage} />;
  }

  return (
    <form className="rounded-[1.75rem] border border-warm-border bg-soft-white p-6">
      <p className="mb-6 text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
        Customer Details
      </p>

      {!hasItems ? (
        <div className="mb-6 rounded-2xl border border-muted-gold/40 bg-light-sand p-5">
          <p className="text-xs font-semibold tracking-[0.22em] text-muted-gold uppercase">
            Empty Order
          </p>

          <p className="mt-3 text-sm leading-7 text-soft-brown">
            Please add a product before submitting an order request. You can
            browse the collection and choose your preferred size and quantity.
          </p>
        </div>
      ) : null}

      <div className="grid gap-5">
        <FormField label="Full Name">
          <CheckoutInput
            placeholder="Enter your full name"
            value={fullName}
            onChange={setFullName}
          />
          <FieldError message={errors.fullName} />
        </FormField>

        <FormField label="Phone Number">
          <CheckoutInput
            placeholder="01XXXXXXXXX"
            type="tel"
            value={phone}
            onChange={setPhone}
          />
          <FieldError message={errors.phone} />
        </FormField>

        <FormField label="Full Address">
          <textarea
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="House, road, area, city"
            rows={4}
            className="w-full rounded-2xl border border-warm-border bg-soft-white px-4 py-3 text-sm text-deep-brown outline-none transition placeholder:text-taupe focus:border-muted-gold"
          />
          <FieldError message={errors.address} />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Delivery Area">
            <CheckoutSelect
              options={deliveryAreaOptions}
              value={deliveryArea}
              onChange={handleDeliveryAreaChange}
            />
          </FormField>

          <FormField label="Payment Type">
            <CheckoutSelect
              options={paymentOptions}
              value={paymentType}
              onChange={setPaymentType}
            />
          </FormField>
        </div>

        {deliveryArea === "outside-dhaka" ? <DeliveryAreaNotice /> : null}

        <FormField label="Order Note">
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Any size, delivery, or product note?"
            rows={4}
            className="w-full rounded-2xl border border-warm-border bg-soft-white px-4 py-3 text-sm text-deep-brown outline-none transition placeholder:text-taupe focus:border-muted-gold"
          />
        </FormField>

        <FieldError message={errors.order} />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!hasItems}
          className="mt-2 h-12 rounded-full bg-[#4A3327] px-6 text-sm font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase shadow-sm transition hover:bg-[#6F5A49] disabled:cursor-not-allowed disabled:bg-taupe"
        >
          Submit Order Request
        </button>
      </div>
    </form>
  );
}
