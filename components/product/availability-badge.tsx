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
  available:
    "border-[#D9E0CE] bg-[#FFFDF9]/85 text-[#5B654A]",
  "low-stock":
    "border-[#E8D3A6] bg-[#FFFDF9]/85 text-[#9A6B2F]",
  "sold-out":
    "border-warm-border bg-[#FFFDF9]/85 text-taupe",
};

export function AvailabilityBadge({ availability }: AvailabilityBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold tracking-[0.16em] uppercase shadow-sm backdrop-blur-md ${availabilityStyles[availability]}`}
    >
      {availabilityLabels[availability]}
    </span>
  );
}
