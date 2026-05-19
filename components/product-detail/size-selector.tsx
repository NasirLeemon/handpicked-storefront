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
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-deep-brown">Size</p>
        <p className="text-[10px] font-semibold tracking-[0.18em] text-muted-gold uppercase">
          Required
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`flex h-11 min-w-12 items-center justify-center rounded-full border px-5 text-sm font-semibold transition ${
                isSelected
                  ? "border-[#3F2A20] bg-[#3F2A20] !text-[#FFFDF9] shadow-[0_10px_24px_rgba(63,42,32,0.16)]"
                  : "border-warm-border bg-white/55 text-deep-brown hover:border-muted-gold hover:text-muted-gold"
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
