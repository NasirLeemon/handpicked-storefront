"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Sparkles, Truck } from "lucide-react";
import { AvailabilityBadge } from "@/components/product/availability-badge";
import { OfferBadge } from "@/components/product/offer-badge";
import { ProductActionButtons } from "@/components/product-detail/product-action-buttons";
import { QuantitySelector } from "@/components/product-detail/quantity-selector";
import { SizeSelector } from "@/components/product-detail/size-selector";
import { trackMetaEvent } from "@/lib/meta-pixel";
import type { Product } from "@/types/product";

type ProductPurchasePanelProps = {
  product: Product;
  onSelectedVariantChange?: (
    variantId: string | null,
  ) => void;
};

export function ProductPurchasePanel({
  product,
  onSelectedVariantChange,
}: ProductPurchasePanelProps) {
  const productSizes = product.sizes.filter(Boolean);
  const productVariants = product.variants ?? [];

  const shadeOptions = [
    ...new Set(
      [...productVariants]
        .sort((a, b) =>
          Number(b.isDefault) - Number(a.isDefault)
        )
        .map((variant) => variant.color.trim())
        .filter(Boolean)
    ),
  ];

  const requiresShadeSelection = shadeOptions.length > 1;
  const requiresSizeSelection = productSizes.length > 1;

  const sellableShadeOptions = shadeOptions.filter(
    (shade) =>
      productVariants.some(
        (variant) =>
          variant.color === shade &&
          variant.availableStock > 0
      )
  );

  const [selectedShade, setSelectedShade] = useState(() =>
    shadeOptions.length === 1
      ? shadeOptions[0]
      : sellableShadeOptions.length === 1
        ? sellableShadeOptions[0]
        : ""
  );

  const [selectedSize, setSelectedSize] = useState(() =>
    productSizes.length === 1 ? productSizes[0] : ""
  );
  const [quantity, setQuantity] = useState(1);
  const [showSizeError, setShowSizeError] = useState(false);
  const [showShadeError, setShowShadeError] = useState(false);
  const [validationAttempt, setValidationAttempt] = useState(0);

  const shadeSectionRef = useRef<HTMLDivElement>(null);
  const sizeSectionRef = useRef<HTMLDivElement>(null);
  const viewContentTrackedRef = useRef(false);

  useEffect(() => {
    if (viewContentTrackedRef.current) {
      return;
    }

    viewContentTrackedRef.current = true;

    trackMetaEvent("ViewContent", {
      content_ids: [product.id],
      content_name: product.name,
      content_type: "product",
      contents: [
        {
          id: product.id,
          quantity: 1,
          item_price: Number(product.price),
        },
      ],
      value: Number(product.price),
      currency: "BDT",
    });
  }, [product.id, product.name, product.price]);

  const selectedVariant =
    productVariants.length > 0
      ? requiresShadeSelection
        ? selectedShade
          ? productVariants.find(
              (variant) =>
                variant.color === selectedShade &&
                (!selectedSize ||
                  !variant.size ||
                  variant.size === selectedSize)
            ) ??
            productVariants.find(
              (variant) =>
                variant.color === selectedShade
            )
          : undefined
        : selectedSize
          ? productVariants.find(
              (variant) =>
                variant.size === selectedSize
            )
          : productVariants.find(
              (variant) => variant.isDefault
            ) ?? productVariants[0]
      : undefined;

  useEffect(() => {
    onSelectedVariantChange?.(
      selectedVariant?.id ?? null,
    );
  }, [
    onSelectedVariantChange,
    selectedVariant?.id,
  ]);

  const availableStock = Number(
    selectedVariant?.availableStock ??
      product.availableStock ??
      0
  );

  const displayPrice =
    selectedVariant?.price ?? product.price;

  const displayCompareAtPrice =
    selectedVariant?.compareAtPrice ??
    product.compareAtPrice;

  const isSoldOut =
    product.availability === "sold-out" ||
    Boolean(
      selectedVariant &&
        selectedVariant.availableStock <= 0
    );

  const purchaseProduct = {
    ...product,
    price: displayPrice,
    compareAtPrice: displayCompareAtPrice,
    color:
      selectedVariant?.color ??
      (requiresShadeSelection ? "" : product.color),
    availableStock,
  };

  function decreaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1)
    );
  }

  function increaseQuantity() {
    setQuantity((currentQuantity) =>
      Math.min(availableStock, currentQuantity + 1)
    );
  }

  function handleSelectShade(shade: string) {
    const variant = productVariants.find(
      (item) => item.color === shade
    );

    setSelectedShade(shade);
    setShowShadeError(false);
    setQuantity(1);

    if (variant?.size) {
      setSelectedSize(variant.size);
    }
  }

  function handleSelectSize(size: string) {
    setSelectedSize(size);
    setShowSizeError(false);
    setQuantity(1);
  }

  function handleShadeRequired() {
    setShowShadeError(true);

    window.requestAnimationFrame(() => {
      shadeSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  function handleSizeRequired() {
    setShowSizeError(true);
    setValidationAttempt((currentAttempt) => currentAttempt + 1);

    window.requestAnimationFrame(() => {
      sizeSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  return (
    <aside className="self-start">
      <div className="px-1 py-1 sm:px-2 lg:px-3 lg:py-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase">
              {product.category}
            </p>

            <span className="hidden text-warm-border sm:inline">•</span>

            <div className="hidden items-center gap-1.5 text-[11px] text-soft-brown sm:flex">
              <Sparkles className="h-3.5 w-3.5 text-muted-gold" />
              Handpicked
            </div>
          </div>

          <AvailabilityBadge availability={product.availability} />
        </div>

        {!isSoldOut && product.offers?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.offers.map((offer) => (
              <OfferBadge
                key={offer.id}
                offer={offer}
              />
            ))}
          </div>
        ) : null}

        <h1 className="mt-3 max-w-[34rem] text-[1.35rem] font-semibold leading-[1.16] tracking-[-0.035em] text-deep-brown sm:text-[1.9rem] lg:text-[2rem]">
          {product.name}
        </h1>

        {!isSoldOut ? (
          <div className="mt-4 flex items-center justify-between border-b border-warm-border pb-4">
            <div className="flex items-baseline gap-3">
              <p className="text-[1.55rem] font-semibold tracking-[-0.035em] text-deep-brown">
                ৳ {displayPrice.toLocaleString()}
              </p>

              {displayCompareAtPrice != null &&
              displayCompareAtPrice > displayPrice ? (
                <p className="text-[1.22rem] font-normal text-[#D05C5C] line-through sm:text-[1.28rem]">
                  ৳ {displayCompareAtPrice.toLocaleString()}
                </p>
              ) : null}
            </div>

            <p className="hidden text-[11px] text-soft-brown sm:block">
              Ready to order
            </p>
          </div>
        ) : null}

        <p className="mt-4 hidden max-w-[32rem] text-[13px] leading-[1.7] text-soft-brown sm:block">
          {product.description}
        </p>

        {shadeOptions.length > 1 ? (
          <div
            ref={shadeSectionRef}
            className="mt-5 border-t border-warm-border pt-5"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-gold">
                  Choose your shade
                </p>

                <p className="mt-1 text-[12px] text-soft-brown">
                  {selectedShade ? (
                    <>
                      Selected{" "}
                      <span className="font-semibold text-deep-brown">
                        {selectedShade}
                      </span>
                    </>
                  ) : (
                    "Select your preferred shade"
                  )}
                </p>
              </div>

              {sellableShadeOptions.length === 1 ? (
                <p className="text-[10px] text-soft-brown">
                  1 shade available
                </p>
              ) : null}
            </div>

            <div className="mt-2.5 grid gap-1.5 sm:grid-cols-3">
              {shadeOptions.map((shade) => {
                const variant = productVariants.find(
                  (item) => item.color === shade
                );

                const soldOut =
                  !variant ||
                  variant.availableStock <= 0;

                const selected =
                  selectedShade === shade;

                const shadeParts = shade.split(" ");
                const shadeNumber = shadeParts[0];
                const shadeName =
                  shadeParts.slice(1).join(" ") || shade;

                return (
                  <button
                    key={shade}
                    type="button"
                    disabled={soldOut}
                    onClick={() =>
                      handleSelectShade(shade)
                    }
                    className={
                      soldOut
                        ? "group relative min-h-[58px] cursor-not-allowed rounded-xl border border-red-300 bg-red-50 px-3 py-2.5 text-left"
                        : selected
                          ? "group relative min-h-[58px] rounded-xl border border-[#3F2A20] bg-[#F7F1EA] px-3 py-2.5 text-left shadow-[0_5px_14px_rgba(63,42,32,0.07)] transition"
                          : "group relative min-h-[58px] rounded-xl border border-[#E4D8CC] bg-white px-3 py-2.5 text-left transition hover:border-[#A8876E] hover:bg-[#FCF9F6]"
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={
                          selected
                            ? "text-[13px] font-semibold tracking-[-0.02em] text-deep-brown"
                            : "text-[13px] font-semibold tracking-[-0.02em] text-[#5A4438]"
                        }
                      >
                        {shadeNumber}
                      </span>

                      {soldOut ? (
                        <span className="rounded-full border border-red-500 bg-red-500 px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.08em] text-white">
                          Sold out
                        </span>
                      ) : selected ? (
                        <span className="flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#6D4E3B]">
                          <span className="size-1.5 rounded-full bg-[#3F2A20]" />
                          Selected
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[8px] font-medium uppercase tracking-[0.08em] text-[#8D7566]">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          Available
                        </span>
                      )}
                    </div>

                    <p
                      className={
                        soldOut
                          ? "mt-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] text-red-600"
                          : "mt-1.5 text-[9px] font-medium uppercase tracking-[0.08em] text-[#765E50]"
                      }
                    >
                      {shadeName}
                    </p>
                  </button>
                );
              })}
            </div>

            {showShadeError ? (
              <p className="mt-2.5 text-[11px] font-medium text-[#B94A48]">
                Please choose a shade before ordering.
              </p>
            ) : null}

            {productSizes.length === 1 ? (
              <div className="mt-3 flex items-center gap-2 text-[10px] text-soft-brown">
                <span className="font-semibold uppercase tracking-[0.12em] text-muted-gold">
                  Size
                </span>

                <span className="h-3 w-px bg-warm-border" />

                <span className="font-semibold text-deep-brown">
                  {productSizes[0]}
                </span>
              </div>
            ) : null}
          </div>
        ) : null}

        {productSizes.length > 0 &&
        !(shadeOptions.length > 1 &&
          productSizes.length === 1) ? (

          <div className="mt-4 border-t border-warm-border pt-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-gold uppercase">
                Size
              </p>

              {!requiresShadeSelection && product.color ? (
                <p className="text-[11px] text-soft-brown">
                  Color{" "}
                  <span className="font-semibold text-deep-brown">
                    {product.color}
                  </span>
                </p>
              ) : null}
            </div>

            <SizeSelector
              ref={sizeSectionRef}
              sizes={productSizes}
              selectedSize={selectedSize}
              availableStock={availableStock}
              isSoldOut={isSoldOut}
              requiresSelection={requiresSizeSelection}
              showError={showSizeError}
              validationAttempt={validationAttempt}
              onSelectSize={handleSelectSize}
            />
          </div>
        ) : !requiresShadeSelection && product.color ? (
          <div className="mt-4 border-t border-warm-border pt-4">
            <p className="text-[11px] text-soft-brown">
              Color{" "}
              <span className="font-semibold text-deep-brown">
                {product.color}
              </span>
            </p>
          </div>
        ) : null}

        {!isSoldOut ? (
          <>
            <div className="mt-3.5">
              <QuantitySelector
                quantity={quantity}
                maxQuantity={availableStock}
                onDecrease={decreaseQuantity}
                onIncrease={increaseQuantity}
              />
            </div>

            <div className="mt-4">
              <ProductActionButtons
                product={purchaseProduct}
                isSoldOut={isSoldOut}
                selectedSize={selectedSize}
                selectedVariantId={selectedVariant?.id ?? ""}
                requiresVariantSelection={requiresShadeSelection}
                quantity={quantity}
                onVariantRequired={handleShadeRequired}
                onSizeRequired={handleSizeRequired}
              />
            </div>
          </>
        ) : null}

        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-warm-border pt-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-muted-gold" />
            <span className="text-[10px] text-soft-brown">
              Quality checked
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 shrink-0 text-muted-gold" />
            <span className="text-[10px] text-soft-brown">
              BD delivery
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-muted-gold" />
            <span className="text-[10px] text-soft-brown">
              Order reviewed
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
