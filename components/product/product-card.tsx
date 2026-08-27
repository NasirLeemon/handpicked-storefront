"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { AvailabilityBadge } from "@/components/product/availability-badge";
import { ProductImage } from "@/components/product/product-image";
import { useCart } from "@/components/cart/cart-provider";
import { AddedToCartPanel } from "@/components/cart/added-to-cart-panel";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [showAddedPanel, setShowAddedPanel] = useState(false);

  const imageSrc = product.images[0];
  const isSoldOut =
    product.availability === "sold-out" ||
    Number(product.availableStock ?? 0) <= 0;

  const productSizes = product.sizes.filter(Boolean);
  const requiresSizeSelection = productSizes.length > 1;
  const defaultSize =
    productSizes.length === 1 ? productSizes[0] : "";

  function handleAddToCart() {
    if (isSoldOut) {
      return;
    }

    if (requiresSizeSelection) {
      router.push(`/product/${product.slug}`);
      return;
    }

    addItem({
      product,
      size: defaultSize,
      quantity: 1,
    });

    setIsAdded(true);
    setShowAddedPanel(true);

    window.setTimeout(() => setIsAdded(false), 1500);
  }

  function handleOrderNow() {
    if (isSoldOut) {
      return;
    }

    if (requiresSizeSelection) {
      router.push(`/product/${product.slug}`);
      return;
    }

    const params = new URLSearchParams({
      product: product.slug,
      qty: "1",
    });

    if (defaultSize) {
      params.set("size", defaultSize);
    }

    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <>
      <article className="flex h-full flex-col overflow-hidden border border-[#DCCDBF] bg-[#FFFDF9] transition duration-300 hover:border-[#A98B72] hover:shadow-[0_12px_32px_rgba(47,33,24,0.07)]">
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative overflow-hidden bg-[#FFFDF9]">
          <div className="relative aspect-square overflow-hidden bg-[#FFFDF9]">
            <ProductImage
              src={imageSrc}
              alt={`${product.name} in ${product.color} – ${product.category} from Handpicked`}
              objectPosition="object-[center_42%]"
            />
          </div>

          <div className="absolute right-2 top-2 sm:right-3 sm:top-3">
            <AvailabilityBadge availability={product.availability} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col border-t border-[#E3D8CE] bg-[#F8F1E9] px-3 py-3 sm:px-3.5 sm:py-3.5">
        <Link href={`/product/${product.slug}`} className="group block">
          <p className="text-[7px] font-semibold tracking-[0.22em] text-[#9B7458] uppercase sm:text-[8px]">
            {product.category}
          </p>

          <h3 className="mt-1.5 line-clamp-2 min-h-[2.1rem] text-[0.72rem] font-medium leading-[1.05rem] tracking-[-0.01em] text-[#35231A] transition-colors duration-300 group-hover:text-[#8D674D] sm:min-h-[2.2rem] sm:text-[0.78rem] sm:leading-[1.1rem]">
            {product.name}
          </h3>

          {!isSoldOut ? (
            <div className="pt-2">
              <div className="mb-1.5 h-px w-6 bg-[#76503B]/35 transition-all duration-300 group-hover:w-10" />

              <p className="text-[0.78rem] font-semibold tracking-[-0.01em] text-[#3E291E] sm:text-[0.84rem]">
                ৳{product.price.toLocaleString()}
              </p>
            </div>
          ) : null}
        </Link>

        <div className={isSoldOut ? "hidden" : "mt-2.5 space-y-1.5"}>
          <button
            type="button"
            disabled={isSoldOut}
            onClick={handleAddToCart}
            className="inline-flex h-8 w-full items-center justify-center gap-1.5 whitespace-nowrap bg-[#3F2A20] px-3 text-[8px] font-semibold tracking-[0.08em] text-[#FFFDF9] uppercase transition hover:bg-[#5B4435] disabled:cursor-not-allowed disabled:bg-[#CFC2B5] sm:h-9 sm:text-[9px]"
          >
            {isAdded ? (
              <Check className="h-3 w-3 shrink-0" strokeWidth={2} />
            ) : (
              <ShoppingBag className="h-3 w-3 shrink-0" strokeWidth={1.8} />
            )}

            {isSoldOut ? "Sold Out" : isAdded ? "Added" : "Add to Cart"}
          </button>

          <button
            type="button"
            disabled={isSoldOut}
            onClick={handleOrderNow}
            className="inline-flex h-7 w-full items-center justify-center whitespace-nowrap border border-[#3F2A20]/60 text-[8px] font-semibold tracking-[0.1em] text-[#3F2A20] uppercase transition hover:text-[#8D674D] disabled:cursor-not-allowed disabled:text-[#A99788] sm:h-8 sm:text-[9px]"
          >
            {isSoldOut ? "Unavailable" : "Order Now"}
          </button>
        </div>
      </div>
      </article>

      {showAddedPanel ? (
        <AddedToCartPanel
          productName={product.name}
          quantity={1}
          price={product.price}
          onClose={() => setShowAddedPanel(false)}
        />
      ) : null}
    </>
  );
}
