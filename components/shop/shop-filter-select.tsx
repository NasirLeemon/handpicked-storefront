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
    <div className="relative min-w-[135px] sm:min-w-0">
      <span className="mb-1 block text-[9px] font-semibold tracking-[0.2em] text-muted-gold uppercase sm:text-xs">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-full border border-warm-border bg-soft-white px-3 text-xs font-medium text-deep-brown outline-none transition focus:border-muted-gold sm:h-12 sm:px-5 sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
