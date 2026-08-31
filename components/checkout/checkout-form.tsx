"use client";

import { CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import {
  checkoutDeliveryAreas,
  type CheckoutDeliveryArea,
} from "@/components/checkout/checkout-form-options";
import { getInventoryAuthClient } from "@/lib/supabase/inventory-auth";
import type { CartItem } from "@/types/cart";

type CheckoutFormProps = {
  items: CartItem[];
  clearCartOnSubmit?: boolean;
  deliveryArea: CheckoutDeliveryArea | "";
  deliveryCharge?: number;
  onDeliveryAreaChange: (area: CheckoutDeliveryArea) => void;
};

type CustomerProfile = {
  full_name: string | null;
  phone: string | null;
  default_address: string | null;
};

export function CheckoutForm({
  items,
  clearCartOnSubmit = false,
  deliveryArea,
  deliveryCharge,
  onDeliveryAreaChange,
}: CheckoutFormProps) {
  const { clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [orderReference, setOrderReference] = useState("");
  const initiateCheckoutTrackedRef = useRef(false);

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const total = subtotal + (deliveryCharge ?? 0);
  const hasDeliveryArea =
    Boolean(deliveryArea) && typeof deliveryCharge === "number";

  useEffect(() => {
    if (initiateCheckoutTrackedRef.current || items.length === 0) {
      return;
    }

    const fbq = (
      window as typeof window & {
        fbq?: (...args: unknown[]) => void;
      }
    ).fbq;

    if (!fbq) {
      return;
    }

    fbq("track", "InitiateCheckout", {
      content_ids: items.map((item) => item.productId),
      content_type: "product",
      contents: items.map((item) => ({
        id: item.productId,
        quantity: Number(item.quantity),
        item_price: Number(item.price),
      })),
      num_items: items.reduce(
        (itemTotal, item) =>
          itemTotal + Number(item.quantity),
        0
      ),
      value: subtotal,
      currency: "BDT",
    });

    initiateCheckoutTrackedRef.current = true;
  }, [items, subtotal]);

  useEffect(() => {
    async function loadProfile() {
      try {
        const supabase = getInventoryAuthClient();
        const { data: userData } = await supabase.auth.getUser();

        if (!userData.user?.id) {
          return;
        }

        const { data } = await supabase
          .from("customer_profiles")
          .select("full_name, phone, default_address")
          .eq("user_id", userData.user.id)
          .single();

        setEmail(userData.user.email || "");

        if (!data) {
          return;
        }

        const profile = data as CustomerProfile;

        setName(profile.full_name || "");
        setPhone(profile.phone || "");
        setAddress(profile.default_address || "");
        setProfileLoaded(true);
      } catch {
        // Checkout still works without profile autofill.
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (items.length === 0) {
      setStatus("Your cart is empty.");
      return;
    }

    if (!deliveryArea || typeof deliveryCharge !== "number") {
      setStatus("Please select your delivery area.");
      return;
    }

    const customerName = name.trim();
    const customerPhone = phone.trim();
    const customerEmail = email.trim().toLowerCase();
    const customerAddress = address.trim();
    const orderNote = note.trim();

    if (
      !customerName ||
      !customerPhone ||
      !customerEmail ||
      !customerAddress
    ) {
      setStatus(
        "Please complete your name, phone, email, and delivery address."
      );
      return;
    }

    const emailPattern =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailPattern.test(customerEmail)) {
      setStatus("Enter a valid email address.");
      return;
    }

    const normalizedPhone = customerPhone.replace(/\D/g, "");

    if (!/^01\d{9}$/.test(normalizedPhone)) {
      setStatus(
        "Enter a valid 11-digit Bangladesh phone number."
      );
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          phone: normalizedPhone,
          address: customerAddress,
          note: orderNote,
          deliveryArea,
          deliveryCharge,
          items,
        }),
      });

      const responseText = await response.text();

      let result: {
        order?: {
          id?: string;
          order_number?: string;
        };
        error?: string;
      } = {};

      try {
        result = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        result = {};
      }

      if (!response.ok) {
        setStatus(
          result.error ||
            "Unable to place your order. Please try again."
        );
        return;
      }

      const order = result.order;

      if (order?.order_number) {
        setOrderReference(order.order_number);
      } else if (order?.id) {
        setOrderReference(
          `HP-${String(order.id).replace(/-/g, "").slice(0, 6).toUpperCase()}`
        );
      }

      try {
        if (order?.id) {
          sendGAEvent("event", "purchase", {
            transaction_id: String(order.id),
            value: total,
            currency: "BDT",
            shipping: deliveryCharge,
            items: items.map((item) => ({
              item_id: item.productId,
              item_name: item.name,
              item_variant:
                [item.color, item.size]
                  .filter(Boolean)
                  .join(" / ") || undefined,
              price: Number(item.price),
              quantity: Number(item.quantity),
            })),
          });

          const fbq = (
            window as typeof window & {
              fbq?: (...args: unknown[]) => void;
            }
          ).fbq;

          fbq?.("track", "Purchase", {
            value: total,
            currency: "BDT",
            content_type: "product",
            content_ids: items.map(
              (item) => item.productId
            ),
            contents: items.map((item) => ({
              id: item.productId,
              quantity: Number(item.quantity),
              item_price: Number(item.price),
            })),
            num_items: items.reduce(
              (itemTotal, item) =>
                itemTotal + Number(item.quantity),
              0
            ),
          });
        }
      } catch {
        // Analytics must never interrupt checkout.
      }

      setIsSuccess(true);

      if (clearCartOnSubmit) {
        clearCart();
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown network error.";

      setStatus(
        `Unable to place your order: ${message}`
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <section className="rounded-sm border border-warm-border bg-[#FFFDF9] p-6 text-center shadow-[0_12px_35px_rgba(47,33,24,0.055)] sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm bg-[#EEF5EC] text-[#4F7652]">
          <CheckCircle2
            className="h-7 w-7"
            strokeWidth={1.8}
          />
        </div>

        <p className="mt-5 text-[10px] font-semibold tracking-[0.2em] text-muted-gold uppercase">
          Order Received
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em] text-deep-brown sm:text-3xl">
          Thank you,{" "}
          {name.trim().split(" ")[0] || "Apu"}
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-soft-brown">
          Your order has been received successfully. We’ll send you a
          confirmation shortly.
        </p>

        {orderReference ? (
          <div className="mx-auto mt-5 max-w-sm rounded-sm bg-light-sand px-4 py-3">
            <p className="text-[9px] font-semibold tracking-[0.15em] text-muted-gold uppercase">
              Order number
            </p>

            <p className="mt-1 break-all text-xs font-semibold text-deep-brown">
              {orderReference}
            </p>
          </div>
        ) : null}

        <div className="mx-auto mt-5 flex max-w-sm items-center justify-between border-t border-warm-border pt-4">
          <span className="text-sm text-soft-brown">
            Order total
          </span>

          <span className="text-lg font-semibold text-deep-brown">
            ৳{total.toLocaleString()}
          </span>
        </div>

        <a
          href="/shop"
          className="mt-6 inline-flex h-11 min-w-48 items-center justify-center rounded-sm bg-[#3F2A20] px-6 text-xs font-semibold tracking-[0.12em] !text-white uppercase transition hover:bg-[#5B4435]"
        >
          Continue Shopping
        </a>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-warm-border bg-[#FFFDF9] shadow-[0_12px_35px_rgba(47,33,24,0.055)]"
    >
      <section className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-deep-brown">
              Contact information
            </h2>

            <p className="mt-1 text-xs text-soft-brown">
              We’ll use these details for your order.
            </p>
          </div>

          {profileLoaded ? (
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#EEF5EC] px-2.5 py-1.5 text-[9px] font-medium text-[#4F7652]">
              <Sparkles className="h-3 w-3" />
              Saved details
            </span>
          ) : null}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <CheckoutInput
            label="Full name"
            name="name"
            value={name}
            onChange={setName}
            required
            autoComplete="name"
            placeholder="Your full name"
          />

          <CheckoutInput
            label="Phone number"
            name="phone"
            type="tel"
            value={phone}
            onChange={setPhone}
            required
            autoComplete="tel"
            inputMode="numeric"
            placeholder="01XXXXXXXXX"
          />

          <div className="sm:col-span-2">
            <CheckoutInput
              label="Email address"
              name="email"
              type="email"
              value={email}
              onChange={setEmail}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-warm-border p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-gold" />

          <h2 className="text-base font-semibold text-deep-brown">
            Delivery
          </h2>
        </div>

        <p className="mt-1 text-xs text-soft-brown">
          Choose your delivery area.
        </p>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-3"
          role="radiogroup"
          aria-label="Delivery area"
        >
          {checkoutDeliveryAreas.map((option) => {
            const isSelected =
              deliveryArea === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() =>
                  onDeliveryAreaChange(option.value)
                }
                className={`rounded-sm border px-3 py-2 text-left transition ${
                  isSelected
                    ? "border-[#3F2A20] bg-[#F7F0E8] shadow-[0_0_0_1px_rgba(63,42,32,0.05)]"
                    : "border-warm-border bg-white hover:border-muted-gold"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-deep-brown">
                    {option.label}
                  </span>

                  <span className="shrink-0 text-xs font-semibold text-deep-brown">
                    ৳{option.charge}
                  </span>
                </div>

                {option.description ? (
                  <span className="mt-1 block text-[9px] leading-3.5 text-taupe">
                    {option.description}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-3">
          <CheckoutTextarea
            label="Delivery address"
            name="address"
            value={address}
            onChange={setAddress}
            required
            rows={2}
            autoComplete="street-address"
            placeholder="House, road, area, district"
          />

          <CheckoutTextarea
            label="Order note"
            optional
            name="note"
            value={note}
            onChange={setNote}
            rows={1}
            placeholder="Anything we should know?"
          />
        </div>
      </section>

      {status ? (
        <div className="mx-4 mb-4 rounded-sm border border-[#E7D2B2] bg-[#FFF8EC] px-3 py-2.5 text-xs leading-5 text-[#805C2E] sm:mx-5">
          {status}
        </div>
      ) : null}

      <div className="border-t border-warm-border p-4 sm:p-5">
        <button
          type="submit"
          disabled={
            items.length === 0 ||
            isSubmitting ||
            !hasDeliveryArea
          }
          className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-[#3F2A20] px-5 text-xs font-semibold tracking-[0.1em] !text-white uppercase shadow-[0_12px_28px_rgba(63,42,32,0.16)] transition hover:bg-[#5B4435] disabled:cursor-not-allowed disabled:bg-[#D8CAB9] disabled:shadow-none"
        >
          {isSubmitting
            ? "Placing Order..."
            : !hasDeliveryArea
              ? "Select Delivery Area"
              : `Place Order · ৳${total.toLocaleString()}`}
        </button>

        <p className="mt-2 text-center text-[10px] leading-4 text-soft-brown">
          Review your details and total before placing your
          order.
        </p>
      </div>
    </form>
  );
}

type CheckoutInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
};

function CheckoutInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  autoComplete,
  inputMode,
}: CheckoutInputProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-medium text-deep-brown">
        {label}

        {required ? (
          <span className="ml-0.5 text-[#B75A4B]">
            *
          </span>
        ) : null}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-10 w-full rounded-sm border border-warm-border bg-white px-3.5 text-sm text-deep-brown outline-none transition placeholder:text-[#B5A69B] focus:border-[#8D674D] focus:ring-2 focus:ring-[#8D674D]/10"
      />
    </label>
  );
}

type CheckoutTextareaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  rows?: number;
  autoComplete?: string;
};

function CheckoutTextarea({
  label,
  name,
  value,
  onChange,
  required = false,
  optional = false,
  placeholder,
  rows = 3,
  autoComplete,
}: CheckoutTextareaProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-medium text-deep-brown">
        {label}

        {required ? (
          <span className="ml-0.5 text-[#B75A4B]">
            *
          </span>
        ) : null}

        {optional ? (
          <span className="ml-1 font-normal text-taupe">
            (optional)
          </span>
        ) : null}
      </span>

      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full resize-none rounded-sm border border-warm-border bg-white px-3.5 py-3 text-sm leading-5 text-deep-brown outline-none transition placeholder:text-[#B5A69B] focus:border-[#8D674D] focus:ring-2 focus:ring-[#8D674D]/10"
      />
    </label>
  );
}
