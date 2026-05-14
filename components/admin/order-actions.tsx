"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses = ["new", "contacted", "confirmed", "delivered", "cancelled"];

type OrderActionsProps = {
  orderId: string;
  currentStatus: string;
};

export function OrderActions({ orderId, currentStatus }: OrderActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  async function updateStatus(status: string) {
    const adminPassword = window.prompt("Enter admin password to update order:");

    if (!adminPassword) {
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminPassword,
          orderId,
          status,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to update order.");
        return;
      }

      router.refresh();
    } catch {
      alert("Failed to update order.");
    } finally {
      setIsUpdating(false);
    }
  }

  async function deleteOrder() {
    const adminPassword = window.prompt("Enter admin password to delete order:");

    if (!adminPassword) {
      return;
    }

    const confirmed = window.confirm("Delete this order?");
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminPassword,
          orderId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to delete order.");
        return;
      }

      router.refresh();
    } catch {
      alert("Failed to delete order.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:items-end">
      <select
        value={currentStatus}
        onChange={(event) => updateStatus(event.target.value)}
        disabled={isUpdating}
        className="h-9 rounded-full border border-warm-border bg-soft-white px-3 text-xs font-medium text-deep-brown outline-none transition focus:border-muted-gold disabled:opacity-60"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={deleteOrder}
        disabled={isDeleting}
        className="rounded-full border border-warm-border bg-soft-white px-4 py-2 text-xs font-semibold tracking-[0.14em] text-taupe uppercase transition hover:border-muted-gold hover:text-deep-brown disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}

export function ClearOrdersButton() {
  const router = useRouter();
  const [isClearing, setIsClearing] = useState(false);

  async function clearOrders() {
    const adminPassword = window.prompt("Enter admin password to clear orders:");

    if (!adminPassword) {
      return;
    }

    const confirmed = window.confirm(
      "Clear all orders? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setIsClearing(true);

    try {
      const response = await fetch("/api/admin/orders", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminPassword,
          clearAll: true,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to clear orders.");
        return;
      }

      router.refresh();
    } catch {
      alert("Failed to clear orders.");
    } finally {
      setIsClearing(false);
    }
  }

  return (
    <button
      type="button"
      onClick={clearOrders}
      disabled={isClearing}
      className="inline-flex h-10 items-center justify-center rounded-full border border-warm-border bg-soft-white px-5 text-xs font-semibold tracking-[0.14em] text-taupe uppercase transition hover:border-muted-gold hover:text-deep-brown disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isClearing ? "Clearing..." : "Clear All Orders"}
    </button>
  );
}
