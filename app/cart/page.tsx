import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/cart-page-client";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your selected Handpicked products before submitting your order request.",
};

export default function CartPage() {
  return <CartPageClient />;
}
