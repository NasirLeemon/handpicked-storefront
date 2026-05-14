"use client";

import type { CartItem } from "@/types/cart";

type CheckoutFormProps = {
  items: CartItem[];
  clearCartOnSubmit?: boolean;
};

export function CheckoutForm({ items }: CheckoutFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      return;
    }

    alert(
      "Order request submitted. Our team will contact you to confirm availability, delivery charge, and payment details."
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.5rem] border border-warm-border bg-soft-white p-5 shadow-sm"
    >
      <div className="mb-5">
        <p className="text-xs font-semibold tracking-[0.24em] text-muted-gold uppercase">
          Customer Details
        </p>

        <p className="mt-2 text-sm leading-6 text-soft-brown">
          Fill in your contact and delivery information.
        </p>
      </div>

      <div className="grid gap-4">
        <CheckoutInput label="Full Name" name="name" required />
        <CheckoutInput label="Phone Number" name="phone" type="tel" required />

        <CheckoutTextarea
          label="Delivery Address"
          name="address"
          required
          rows={3}
        />

        <CheckoutTextarea
          label="Order Note"
          name="note"
          rows={3}
          placeholder="Optional: preferred delivery time, size note, etc."
        />
      </div>

      <button
        type="submit"
        disabled={items.length === 0}
        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-[#4A3327] px-6 text-xs font-semibold tracking-[0.16em] !text-[#FFFDF9] uppercase shadow-sm transition hover:bg-[#6F5A49] disabled:cursor-not-allowed disabled:bg-taupe sm:h-12 sm:text-sm"
      >
        Submit Order Request
      </button>

      {items.length === 0 ? (
        <p className="mt-3 text-xs leading-5 text-soft-brown">
          Add at least one product before submitting your order.
        </p>
      ) : (
        <p className="mt-3 text-xs leading-5 text-soft-brown">
          Your selected products will remain visible in the order summary.
        </p>
      )}
    </form>
  );
}

type CheckoutInputProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
};

function CheckoutInput({
  label,
  name,
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
        className="h-11 w-full rounded-[1rem] border border-warm-border bg-ivory px-4 text-sm text-deep-brown outline-none transition placeholder:text-taupe focus:border-muted-gold"
      />
    </label>
  );
}

type CheckoutTextareaProps = {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
};

function CheckoutTextarea({
  label,
  name,
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
        className="w-full resize-none rounded-[1rem] border border-warm-border bg-ivory px-4 py-3 text-sm text-deep-brown outline-none transition placeholder:text-taupe focus:border-muted-gold"
      />
    </label>
  );
}
