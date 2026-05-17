"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { getInventoryAuthClient } from "@/lib/supabase/inventory-auth";
import type { CartItem } from "@/types/cart";

type CheckoutFormProps = {
  items: CartItem[];
  clearCartOnSubmit?: boolean;
};

type CustomerProfile = {
  full_name: string | null;
  phone: string | null;
  default_address: string | null;
};

export function CheckoutForm({ items }: CheckoutFormProps) {
  const { clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");

  const [status, setStatus] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      setIsSuccess(false);
      setStatus("Add at least one product before submitting your order request.");
      return;
    }

    const customerName = name.trim();
    const customerPhone = phone.trim();
    const customerAddress = address.trim();
    const orderNote = note.trim();

    if (!customerName || !customerPhone || !customerAddress) {
      setIsSuccess(false);
      setStatus("Name, phone number, and delivery address are required.");
      return;
    }

    setIsSubmitting(true);
    setIsSuccess(false);
    setStatus("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          phone: customerPhone,
          address: customerAddress,
          note: orderNote,
          items,
        }),
      });

      const responseText = await response.text();

      if (response.ok) {
        setIsSuccess(true);
        setStatus(
          "Order request submitted successfully. Our team will review stock, delivery charge, and payment details before confirming your order."
        );
        clearCart();
        return;
      }

      try {
        const result = responseText ? JSON.parse(responseText) : {};
        setStatus(result.error || "Failed to submit order request.");
      } catch {
        setStatus("Failed to submit order request. Please try again.");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown network error.";

      setStatus(`Failed to submit order request: ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-[1.5rem] border border-warm-border bg-soft-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D9E0CE] bg-[#F5F7F0] text-2xl text-[#5B654A]">
          ✓
        </div>

        <p className="mt-5 text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
          Request Submitted
        </p>

        <h2 className="mt-3 font-serif-brand text-4xl font-medium tracking-[-0.04em] text-deep-brown sm:text-5xl">
          Thank you
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-soft-brown sm:text-base">
          Your order request has been received. Our team will review stock,
          delivery charge, and payment details before confirming your order.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <a
            href="/shop"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold tracking-[0.16em] !text-[#FFFDF9] uppercase shadow-sm transition hover:bg-[#6F5A49]"
          >
            Continue Shopping
          </a>

          <a
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full border border-warm-border bg-soft-white px-6 text-xs font-semibold tracking-[0.16em] text-deep-brown uppercase shadow-sm transition hover:bg-light-sand"
          >
            Contact Us
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.5rem] border border-warm-border bg-soft-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
          Order Request
        </p>

        <p className="mt-2 text-sm leading-6 text-soft-brown">
          Fill in your contact and delivery information. We will review and
          confirm availability before dispatch.
        </p>

        {profileLoaded ? (
          <p className="mt-3 rounded-[1rem] border border-[#D9E0CE] bg-[#F5F7F0] px-3 py-2 text-xs leading-5 text-[#5B654A]">
            Your saved account details have been added automatically.
          </p>
        ) : null}
      </div>

      <div className="grid gap-4">
        <CheckoutInput
          label="Full Name"
          name="name"
          value={name}
          onChange={setName}
          required
        />

        <CheckoutInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={phone}
          onChange={setPhone}
          required
        />

        <CheckoutTextarea
          label="Delivery Address"
          name="address"
          value={address}
          onChange={setAddress}
          required
          rows={3}
        />

        <CheckoutTextarea
          label="Order Note"
          name="note"
          value={note}
          onChange={setNote}
          rows={3}
          placeholder="Optional: preferred delivery time, size note, etc."
        />
      </div>

      {status ? (
        <p
          className={`mt-5 rounded-[1rem] border p-3 text-sm leading-6 ${
            isSuccess
              ? "border-[#D9E0CE] bg-[#F5F7F0] text-[#5B654A]"
              : "border-muted-gold/30 bg-light-sand text-soft-brown"
          }`}
        >
          {status}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={items.length === 0 || isSubmitting}
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold tracking-[0.16em] !text-[#FFFDF9] uppercase shadow-sm transition hover:bg-[#6F5A49] disabled:cursor-not-allowed disabled:bg-taupe sm:h-12 sm:text-sm"
      >
        {isSubmitting ? "Submitting..." : "Submit Order Request"}
      </button>

      {items.length === 0 ? (
        <p className="mt-3 text-xs leading-5 text-soft-brown">
          Add at least one product before submitting your order request.
        </p>
      ) : (
        <p className="mt-3 text-xs leading-5 text-soft-brown">
          This is not a final confirmation. We will confirm stock and delivery
          details after review.
        </p>
      )}
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
};

function CheckoutInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
}: CheckoutInputProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold tracking-[0.2em] text-soft-brown uppercase">
        {label}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-[1rem] border border-warm-border bg-ivory px-4 text-sm text-deep-brown outline-none transition placeholder:text-taupe focus:border-muted-gold"
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
  placeholder?: string;
  rows?: number;
};

function CheckoutTextarea({
  label,
  name,
  value,
  onChange,
  required = false,
  placeholder,
  rows = 4,
}: CheckoutTextareaProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold tracking-[0.2em] text-soft-brown uppercase">
        {label}
      </span>

      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-none rounded-[1rem] border border-warm-border bg-ivory px-4 py-3 text-sm text-deep-brown outline-none transition placeholder:text-taupe focus:border-muted-gold"
      />
    </label>
  );
}
