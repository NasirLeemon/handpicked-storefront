import type { ProductAvailability } from "@/types/product";

type AvailabilityBadgeProps = {
  availability: ProductAvailability;
};

const availabilityLabels: Record<ProductAvailability, string> = {
  available: "Available",
  "low-stock": "Low Stock",
  "sold-out": "Sold Out",
};

const availabilityStyles: Record<ProductAvailability, string> = {
  available: "bg-[#EEF1E8] text-[#5B654A]",
  "low-stock": "bg-[#F6EEDC] text-[#9A6B2F]",
  "sold-out": "bg-[#EFEAE4] text-taupe",
};

export function AvailabilityBadge({ availability }: AvailabilityBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase ${availabilityStyles[availability]}`}
    >
      {availabilityLabels[availability]}
    </span>
  );
}