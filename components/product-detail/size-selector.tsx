type SizeSelectorProps = {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
};

export function SizeSelector({
  sizes,
  selectedSize,
  onSelectSize,
}: SizeSelectorProps) {
  return (
    <div className="mt-6">
      <p className="mb-3 text-sm font-medium text-deep-brown">Size</p>

      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`flex h-11 min-w-12 items-center justify-center rounded-full border px-4 text-sm font-medium transition ${
                isSelected
                  ? "border-deep-brown bg-deep-brown text-soft-white"
                  : "border-warm-border bg-soft-white text-deep-brown hover:border-muted-gold hover:text-muted-gold"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
