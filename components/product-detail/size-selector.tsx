import { forwardRef } from "react";
import { AlertCircle, Check } from "lucide-react";

type SizeSelectorProps = {
  sizes: string[];
  selectedSize: string;
  availableStock: number;
  isSoldOut: boolean;
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
    showError,
    validationAttempt,
    onSelectSize,
  },
  ref
) {
  const stockMessage =
    availableStock <= 0
      ? "Out of stock"
      : availableStock === 1
        ? "Only 1 left in stock"
        : availableStock <= 3
          ? `Only ${availableStock} left in stock`
          : `${availableStock} available`;

  return (
    <div ref={ref} className="scroll-mt-28">
      <div
        key={validationAttempt}
        className={`rounded-[1.25rem] border p-4 transition duration-300 ${
          showError
            ? "border-muted-gold bg-light-sand/70 shadow-[0_0_0_4px_rgba(176,138,85,0.12)]"
            : "border-transparent bg-transparent"
        }`}
        style={{
          animation:
            showError && validationAttempt > 0
              ? "size-selector-shake 380ms ease-in-out"
              : undefined,
        }}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-deep-brown">
            Size
          </p>

          {!selectedSize && !isSoldOut ? (
            <p className="text-[10px] font-semibold tracking-[0.18em] text-muted-gold uppercase">
              Required
            </p>
          ) : null}
        </div>

        {showError && !selectedSize && !isSoldOut ? (
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
                disabled={isSoldOut}
                onClick={() => onSelectSize(size)}
                aria-pressed={isSelected}
                className={`flex h-11 min-w-12 items-center justify-center rounded-full border px-5 text-sm font-semibold transition ${
                  isSelected
                    ? "border-[#3F2A20] bg-[#3F2A20] !text-[#FFFDF9] shadow-[0_10px_24px_rgba(63,42,32,0.16)]"
                    : "border-warm-border bg-white/55 text-deep-brown hover:border-muted-gold hover:text-muted-gold"
                } disabled:cursor-not-allowed disabled:opacity-50`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {selectedSize || isSoldOut ? (
          <div className="mt-3 flex items-center gap-2 text-xs text-soft-brown">
            {!isSoldOut ? (
              <Check
                className="h-4 w-4 shrink-0 text-muted-gold"
                strokeWidth={1.9}
              />
            ) : null}

            <span
              className={
                availableStock <= 3
                  ? "font-medium text-[#9A6B35]"
                  : undefined
              }
            >
              {stockMessage}
            </span>
          </div>
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