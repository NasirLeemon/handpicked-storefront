type QuantitySelectorProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
}: QuantitySelectorProps) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-medium text-deep-brown">Quantity</p>

      <div className="inline-flex h-11 items-center overflow-hidden rounded-full border border-warm-border bg-soft-white">
        <button
          type="button"
          onClick={onDecrease}
          className="flex h-full w-11 items-center justify-center text-lg text-deep-brown transition hover:bg-light-sand"
          aria-label="Decrease quantity"
        >
          -
        </button>

        <span className="flex h-full min-w-12 items-center justify-center border-x border-warm-border px-4 text-sm font-medium text-deep-brown">
          {quantity}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          className="flex h-full w-11 items-center justify-center text-lg text-deep-brown transition hover:bg-light-sand"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
}
