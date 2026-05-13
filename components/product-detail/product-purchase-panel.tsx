"use client";

import { ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { AvailabilityBadge } from "@/components/product/availability-badge";
import { ProductActionButtons } from "@/components/product-detail/product-action-buttons";
import { QuantitySelector } from "@/components/product-detail/quantity-selector";
import { SizeSelector } from "@/components/product-detail/size-selector";
import type { Product } from "@/types/product";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const isSoldOut = product.availability === "sold-out";

  function decreaseQuantity() {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity - 1));
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) => currentQuantity + 1);
  }

  return (
    <aside className="rounded-[2rem] border border-warm-border bg-soft-white p-6 shadow-sm lg:sticky lg:top-32 lg:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
          {product.category}
        </p>

        <AvailabilityBadge availability={product.availability} />
      </div>

      <h1 className="mt-5 font-serif-brand text-5xl font-medium leading-[0.95] tracking-[-0.035em] text-deep-brown sm:text-6xl">
        {product.name}
      </h1>

      <p className="mt-5 text-2xl font-medium text-deep-brown">
        ৳ {product.price.toLocaleString()}
      </p>

      <p className="mt-6 text-base leading-8 text-soft-brown">
        {product.description}
      </p>

      <div className="mt-8 rounded-[1.5rem] border border-warm-border bg-ivory p-5">
        <p className="text-sm font-medium text-deep-brown">
          Color: <span className="text-soft-brown">{product.color}</span>
        </p>

        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />

        <QuantitySelector
          quantity={quantity}
          onDecrease={decreaseQuantity}
          onIncrease={increaseQuantity}
        />
      </div>

      <ProductActionButtons
        isSoldOut={isSoldOut}
        selectedSize={selectedSize}
        quantity={quantity}
        productSlug={product.slug}
      />

      <div className="mt-6 grid gap-3">
        <ProductNote
          icon={<Truck className="h-5 w-5" strokeWidth={1.7} />}
          title="Delivery support"
          description="Inside Dhaka delivery is available. Outside Dhaka orders require advance payment before dispatch."
        />

        <ProductNote
          icon={<ShieldCheck className="h-5 w-5" strokeWidth={1.7} />}
          title="Order confirmation"
          description="Our team will confirm availability, delivery charge, and payment details after your order request."
        />
      </div>
    </aside>
  );
}

type ProductNoteProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function ProductNote({ icon, title, description }: ProductNoteProps) {
  return (
    <div className="flex gap-4 rounded-[1.25rem] border border-muted-gold/30 bg-light-sand p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-muted-gold/30 bg-soft-white text-muted-gold">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-deep-brown">{title}</p>
        <p className="mt-1 text-sm leading-6 text-soft-brown">{description}</p>
      </div>
    </div>
  );
}
