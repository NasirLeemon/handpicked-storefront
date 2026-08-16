type QuantitySelectorProps = {
  quantity: number;
  maxQuantity?: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantitySelector({
  quantity,
  maxQuantity,
  onDecrease,
  onIncrease,
}: QuantitySelectorProps) {
  const hasMaxQuantity = typeof maxQuantity === "number";
  const isAtMax = hasMaxQuantity && quantity >= maxQuantity;
  const isUnavailable = maxQuantity === 0;

  return (
    <div className="mt-4 sm:mt-6">
      <p className="mb-2 text-[0.76rem] font-semibold text-deep-brown sm:mb-3 sm:text-sm">
        Quantity
      </p>

      <div className="inline-flex h-10 items-center overflow-hidden rounded-full border border-warm-border bg-white/55 shadow-sm sm:h-12">
        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity <= 1 || isUnavailable}
          className="flex h-full w-10 items-center justify-center text-base text-deep-brown transition hover:bg-light-sand disabled:cursor-not-allowed disabled:text-taupe sm:w-12 sm:text-lg"
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span className="flex h-full min-w-12 items-center justify-center border-x border-warm-border px-4 text-[0.76rem] font-semibold text-deep-brown sm:min-w-14 sm:px-5 sm:text-sm">
          {quantity}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={isAtMax || isUnavailable}
          className="flex h-full w-10 items-center justify-center text-base text-deep-brown transition hover:bg-light-sand disabled:cursor-not-allowed disabled:text-taupe sm:w-12 sm:text-lg"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}