type ShopFilterSelectOption = {
  label: string;
  value: string;
};

type ShopFilterSelectProps = {
  label: string;
  value: string;
  options: ShopFilterSelectOption[];
  onChange: (value: string) => void;
};

export function ShopFilterSelect({
  label,
  value,
  options,
  onChange,
}: ShopFilterSelectProps) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full border-b border-warm-border bg-transparent px-0 text-sm text-deep-brown outline-none transition focus:border-muted-gold sm:h-12"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
