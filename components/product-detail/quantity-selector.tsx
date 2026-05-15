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

  return (
    <div className="mt-5 sm:mt-7">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-deep-brown">Quantity</p>

        {hasMaxQuantity ? (
          <p className="text-xs text-soft-brown">
            {maxQuantity <= 0
              ? "Out of stock"
              : maxQuantity <= 3
                ? `Only ${maxQuantity} available`
                : "In stock"}
          </p>
        ) : null}
      </div>

      <div className="inline-flex h-11 items-center overflow-hidden rounded-full border border-warm-border bg-soft-white shadow-sm sm:h-12">
        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="flex h-full w-11 items-center justify-center text-lg text-deep-brown transition hover:bg-light-sand disabled:cursor-not-allowed disabled:text-taupe sm:w-12"
          aria-label="Decrease quantity"
        >
          -
        </button>

        <span className="flex h-full min-w-12 items-center justify-center border-x border-warm-border px-4 text-sm font-medium text-deep-brown sm:min-w-14 sm:px-5">
          {quantity}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          disabled={isAtMax || maxQuantity === 0}
          className="flex h-full w-11 items-center justify-center text-lg text-deep-brown transition hover:bg-light-sand disabled:cursor-not-allowed disabled:text-taupe sm:w-12"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
