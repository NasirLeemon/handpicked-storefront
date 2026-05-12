type ShopSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ShopSearchInput({ value, onChange }: ShopSearchInputProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-[0.18em] text-soft-brown uppercase">
        Search
      </span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products..."
        className="h-11 w-full rounded-full border border-warm-border bg-soft-white px-4 text-sm text-deep-brown outline-none transition placeholder:text-taupe focus:border-muted-gold"
      />
    </label>
  );
}
