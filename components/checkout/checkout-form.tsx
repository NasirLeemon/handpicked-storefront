"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
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
      <div className="overflow-hidden rounded-[2rem] border border-warm-border bg-[#FFFDF9] p-8 text-center shadow-[0_22px_70px_rgba(47,33,24,0.08)] sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D9E0CE] bg-[#F5F7F0] text-[#5B654A]">
          <CheckCircle2 className="h-7 w-7" strokeWidth={1.7} />
        </div>

        <p className="mt-6 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
          Request Submitted
        </p>

        <h2 className="mt-3 text-4xl font-medium tracking-[-0.045em] text-deep-brown sm:text-5xl">
          Thank you
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-soft-brown sm:text-base">
          Your order request has been received. Our team will review stock,
          delivery charge, and payment details before confirming your order.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a
            href="/shop"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#3F2A20] px-6 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase shadow-[0_16px_34px_rgba(63,42,32,0.18)] transition hover:bg-[#5B4435]"
          >
            Continue Shopping
          </a>

          <a
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-full border border-warm-border bg-transparent px-6 text-xs font-semibold tracking-[0.18em] text-deep-brown uppercase transition hover:border-muted-gold hover:text-muted-gold"
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
      className="overflow-hidden rounded-[2rem] border border-warm-border bg-[#FFFDF9] shadow-[0_22px_70px_rgba(47,33,24,0.08)]"
    >
      <div className="border-b border-warm-border px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
              Delivery Details
            </p>

            <p className="mt-2 max-w-xl text-sm leading-6 text-soft-brown">
              Fill in your contact and delivery information. We will review and
              confirm availability before dispatch.
            </p>
          </div>

          {profileLoaded ? (
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D9E0CE] bg-[#F5F7F0] px-3 py-2 text-xs leading-5 text-[#5B654A]">
              <Sparkles className="h-3.5 w-3.5" />
              Saved details added
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 px-5 py-5 sm:px-6">
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
          rows={2}
        />

        <CheckoutTextarea
          label="Order Note"
          name="note"
          value={note}
          onChange={setNote}
          rows={2}
          placeholder="Optional: preferred delivery time, size note, etc."
        />
      </div>

      {status ? (
        <p
          className={`mx-5 rounded-[1rem] border px-4 py-3 text-sm leading-6 sm:mx-7 ${
            isSuccess
              ? "border-[#D9E0CE] bg-[#F5F7F0] text-[#5B654A]"
              : "border-muted-gold/30 bg-light-sand text-soft-brown"
          }`}
        >
          {status}
        </p>
      ) : null}

      <div className="px-5 pb-5 pt-1 sm:px-6">
        <button
          type="submit"
          disabled={items.length === 0 || isSubmitting}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#3F2A20] px-6 text-xs font-semibold tracking-[0.18em] !text-[#FFFDF9] uppercase shadow-[0_16px_34px_rgba(63,42,32,0.18)] transition hover:bg-[#5B4435] disabled:cursor-not-allowed disabled:bg-[#D8CAB9] disabled:shadow-none sm:h-13"
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
      <span className="mb-2 block text-[10px] font-semibold tracking-[0.22em] text-muted-gold uppercase">
        {label}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full border-b border-warm-border bg-transparent px-0 text-sm text-deep-brown outline-none transition placeholder:text-taupe focus:border-muted-gold"
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
      <span className="mb-2 block text-[10px] font-semibold tracking-[0.22em] text-muted-gold uppercase">
        {label}
      </span>

      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full resize-none border-b border-warm-border bg-transparent px-0 py-2 text-sm leading-6 text-deep-brown outline-none transition placeholder:text-taupe focus:border-muted-gold"
      />
    </label>
  );
}
