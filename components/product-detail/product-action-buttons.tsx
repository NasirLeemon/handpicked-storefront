"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { AddedToCartPanel } from "@/components/cart/added-to-cart-panel";
import { trackMetaEvent } from "@/lib/meta-pixel";
import type { Product } from "@/types/product";

type ProductActionButtonsProps = {
  product: Product;
  isSoldOut: boolean;
  selectedSize: string;
  quantity: number;
  onSizeRequired: () => void;
};

export function ProductActionButtons({
  product,
  isSoldOut,
  selectedSize,
  quantity,
  onSizeRequired,
}: ProductActionButtonsProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [showAddedPanel, setShowAddedPanel] = useState(false);

  const requiresSizeSelection =
    product.sizes.filter(Boolean).length > 1;

  function validateSize() {
    if (requiresSizeSelection && !selectedSize) {
      onSizeRequired();
      return false;
    }

    return true;
  }

  function handleAddToCart() {
    if (isSoldOut || !validateSize()) {
      return;
    }

    addItem({
      product,
      size: selectedSize,
      quantity,
    });

    try {
      trackMetaEvent("AddToCart", {
        content_ids: [product.id],
        content_name: product.name,
        content_type: "product",
        contents: [
          {
            id: product.id,
            quantity,
            item_price: Number(product.price),
          },
        ],
        value: Number(product.price) * quantity,
        currency: "BDT",
      });
    } catch {
      // Analytics must never interrupt cart actions.
    }

    setShowAddedPanel(true);
  }

  function handleOrderNow() {
    if (isSoldOut || !validateSize()) {
      return;
    }

    const params = new URLSearchParams({
      product: product.slug,
      qty: String(quantity),
    });

    if (selectedSize) {
      params.set("size", selectedSize);
    }

    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <>
      <div className="grid gap-2.5 sm:gap-3">
      <button
        type="button"
        onClick={handleAddToCart}
        className="group inline-flex h-10 w-full items-center justify-center gap-2.5 rounded-full bg-[#3F2A20] px-5 text-[0.7rem] font-semibold tracking-[0.15em] !text-[#FFFDF9] uppercase shadow-[0_16px_34px_rgba(63,42,32,0.18)] transition hover:bg-[#5B4435] sm:h-12 sm:gap-3 sm:px-7 sm:text-xs sm:tracking-[0.2em]"
      >
        <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
        Add to Cart
      </button>

      <button
        type="button"
        onClick={handleOrderNow}
        className="group inline-flex h-10 w-full items-center justify-center gap-2.5 rounded-full border border-[#3F2A20] bg-transparent px-5 text-[0.7rem] font-semibold tracking-[0.15em] text-deep-brown uppercase transition hover:bg-[#3F2A20] hover:!text-[#FFFDF9] sm:h-12 sm:gap-3 sm:px-7 sm:text-xs sm:tracking-[0.2em]"
      >
        Order Now
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </button>
      </div>

      {showAddedPanel ? (
        <AddedToCartPanel
          productName={product.name}
          quantity={quantity}
          price={product.price}
          onClose={() => setShowAddedPanel(false)}
        />
      ) : null}
    </>
  );
}
