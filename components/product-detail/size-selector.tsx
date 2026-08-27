import { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

type SizeSelectorProps = {
  sizes: string[];
  selectedSize: string;
  availableStock: number;
  isSoldOut: boolean;
  requiresSelection: boolean;
  showError: boolean;
  validationAttempt: number;
  onSelectSize: (size: string) => void;
};

export const SizeSelector = forwardRef<
  HTMLDivElement,
  SizeSelectorProps
>(function SizeSelector(
  {
    sizes,
    selectedSize,
    availableStock,
    isSoldOut,
    requiresSelection,
    showError,
    validationAttempt,
    onSelectSize,
  },
  ref
) {
  const lowStockMessage =
    availableStock === 1
      ? "Only 1 left in stock"
      : availableStock > 1 && availableStock <= 3
        ? `Only ${availableStock} left in stock`
        : null;

  return (
    <div ref={ref} className="scroll-mt-28">
      <div
        key={validationAttempt}
        className={`transition duration-300 ${
          showError
            ? "rounded-xl border border-muted-gold bg-light-sand/60 p-3 shadow-[0_0_0_3px_rgba(176,138,85,0.10)]"
            : ""
        }`}
        style={{
          animation:
            showError && validationAttempt > 0
              ? "size-selector-shake 380ms ease-in-out"
              : undefined,
        }}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-deep-brown">
            {requiresSelection ? "Choose a size" : "Size"}
          </p>

          {requiresSelection && !selectedSize && !isSoldOut ? (
            <p className="text-[9px] font-medium tracking-[0.12em] text-muted-gold uppercase">
              Required
            </p>
          ) : null}
        </div>

        {showError &&
        requiresSelection &&
        !selectedSize &&
        !isSoldOut ? (
          <div
            role="alert"
            className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#9A6B35]"
          >
            <AlertCircle
              className="h-4 w-4 shrink-0"
              strokeWidth={1.8}
            />
            Please select a size.
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isSelected = selectedSize === size;

            return (
              <button
                key={size}
                type="button"
                disabled={isSoldOut || !requiresSelection}
                onClick={() => onSelectSize(size)}
                aria-pressed={isSelected}
                className={`flex h-9 min-w-[4.5rem] items-center justify-center rounded-lg border px-3 text-xs font-medium transition sm:h-10 sm:text-[13px] ${
                  isSelected
                    ? "border-[#3F2A20] bg-[#3F2A20] !text-[#FFFDF9] shadow-sm"
                    : "border-warm-border bg-white/70 text-deep-brown hover:border-muted-gold"
                } disabled:cursor-default disabled:opacity-100`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {lowStockMessage && !isSoldOut ? (
          <p className="mt-2 text-[11px] font-medium text-[#9A6B35]">
            {lowStockMessage}
          </p>
        ) : null}
      </div>

      <style jsx>{`
        @keyframes size-selector-shake {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-6px);
          }
          40% {
            transform: translateX(6px);
          }
          60% {
            transform: translateX(-4px);
          }
          80% {
            transform: translateX(4px);
          }
        }
      `}</style>
    </div>
  );
});
