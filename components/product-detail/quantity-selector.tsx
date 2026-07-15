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
    <div className="mt-6">
      <p className="mb-3 text-sm font-semibold text-deep-brown">
        Quantity
      </p>

      <div className="inline-flex h-12 items-center overflow-hidden rounded-full border border-warm-border bg-white/55 shadow-sm">
        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity <= 1 || isUnavailable}
          className="flex h-full w-12 items-center justify-center text-lg text-deep-brown transition hover:bg-light-sand disabled:cursor-not-allowed disabled:text-taupe"
          aria-label="Decrease quantity"
        >
          −
        </button>

        <span className="flex h-full min-w-14 items-center justify-center border-x border-warm-border px-5 text-sm font-semibold text-deep-brown">
          {quantity}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={isAtMax || isUnavailable}
          className="flex h-full w-12 items-center justify-center text-lg text-deep-brown transition hover:bg-light-sand disabled:cursor-not-allowed disabled:text-taupe"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}