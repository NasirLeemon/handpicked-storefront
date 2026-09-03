import type { ProductOffer } from "@/types/product";

const burstShape = {
  clipPath:
    "polygon(50% 0%,58% 10%,69% 4%,74% 17%,87% 13%,87% 27%,100% 31%,91% 42%,100% 50%,91% 58%,100% 69%,87% 73%,87% 87%,74% 83%,69% 96%,58% 90%,50% 100%,42% 90%,31% 96%,26% 83%,13% 87%,13% 73%,0% 69%,9% 58%,0% 50%,9% 42%,0% 31%,13% 27%,13% 13%,26% 17%,31% 4%,42% 10%)",
};

export function OfferBadge({
  offer,
  compact = false,
}: {
  offer: ProductOffer;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <span
        title={offer.name}
        style={burstShape}
        className="flex size-[58px] shrink-0 flex-col items-center justify-center bg-[#D71920] text-center text-white shadow-[0_5px_14px_rgba(151,20,27,0.28)] sm:size-[64px]"
      >
        <span className="text-[15px] font-extrabold leading-none tracking-[-0.03em] sm:text-[17px]">
          {offer.discountPercent}%
        </span>

        <span className="mt-0.5 text-[9px] font-extrabold leading-none tracking-[0.05em] sm:text-[10px]">
          OFF
        </span>
      </span>
    );
  }

  return (
    <span
      title={offer.name}
      style={burstShape}
      className="flex size-[76px] shrink-0 flex-col items-center justify-center bg-[#D71920] text-center text-white shadow-[0_7px_18px_rgba(151,20,27,0.25)]"
    >
      <span className="text-[20px] font-extrabold leading-none tracking-[-0.03em]">
        {offer.discountPercent}%
      </span>

      <span className="mt-1 text-[11px] font-extrabold leading-none tracking-[0.06em]">
        OFF
      </span>
    </span>
  );
}
