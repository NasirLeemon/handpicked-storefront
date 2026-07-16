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
    "border-[#D8E8D7] bg-[#FFFDF9]/94 text-[#2F8F57]",
  "low-stock":
    "border-[#EAD7A7] bg-[#FFFDF9]/94 text-[#B98218]",
  "sold-out":
    "border-[#E8CACA] bg-[#FFFDF9]/94 text-[#C54A4A]",
};

export function AvailabilityBadge({
  availability,
}: AvailabilityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-[3px] text-[8px] font-semibold tracking-[0.14em] uppercase shadow-[0_2px_6px_rgba(47,33,24,0.035)] backdrop-blur-sm ${availabilityStyles[availability]}`}
    >
      {availabilityLabels[availability]}
    </span>
  );
}