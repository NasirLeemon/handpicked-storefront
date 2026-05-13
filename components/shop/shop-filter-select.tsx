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
      <span className="mb-1.5 block text-[10px] font-semibold tracking-[0.22em] text-muted-gold uppercase md:text-[10px]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-full border border-warm-border bg-soft-white px-4 text-sm text-deep-brown outline-none transition focus:border-muted-gold sm:h-12"
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
