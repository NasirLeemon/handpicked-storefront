"use client";

import { X } from "lucide-react";
import { ShopFilterSelect } from "@/components/shop/shop-filter-select";

type FilterOption = {
  label: string;
  value: string;
};

type MobileFilterDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  availability: string;
  categoryOptions: FilterOption[];
  availabilityOptions: FilterOption[];
  onCategoryChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onClear: () => void;
  resultCount: number;
};

export function MobileFilterDrawer({
  isOpen,
  onClose,
  category,
  availability,
  categoryOptions,
  availabilityOptions,
  onCategoryChange,
  onAvailabilityChange,
  onClear,
  resultCount,
}: MobileFilterDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[99999] md:hidden">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-deep-brown/55"
        aria-label="Close filters"
      />

      <aside className="absolute right-0 top-0 flex h-dvh w-[82%] max-w-sm flex-col bg-ivory px-5 py-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-warm-border pb-5">
          <h2 className="text-2xl font-semibold tracking-[-0.03em] text-deep-brown">
            Filter
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-warm-border bg-soft-white text-deep-brown"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" strokeWidth={1.7} />
          </button>
        </div>

        <div className="grid gap-5 py-6">
          <ShopFilterSelect
            label="Category"
            value={category}
            options={categoryOptions}
            onChange={onCategoryChange}
          />

          <ShopFilterSelect
            label="Availability"
            value={availability}
            options={availabilityOptions}
            onChange={onAvailabilityChange}
          />
        </div>

        <div className="mt-auto border-t border-warm-border pt-5">
          <p className="mb-4 text-sm text-soft-brown">
            Showing{" "}
            <span className="font-medium text-deep-brown">{resultCount}</span>{" "}
            pieces
          </p>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#4A3327] px-5 text-xs font-semibold tracking-[0.16em] !text-[#FFFDF9] uppercase"
          >
            See Results
          </button>

          <button
            type="button"
            onClick={onClear}
            className="mt-4 w-full text-center text-xs font-semibold tracking-[0.18em] text-muted-gold uppercase"
          >
            Clear All
          </button>
        </div>
      </aside>
    </div>
  );
}
