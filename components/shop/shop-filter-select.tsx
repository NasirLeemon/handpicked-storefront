type ShopFilterOption = {
  label: string;
  value: string;
};

type ShopFilterSelectProps = {
  label: string;
  value: string;
  options: ShopFilterOption[];
  onChange: (value: string) => void;
};

export function ShopFilterSelect({
  label,
  value,
  options,
  onChange,
}: ShopFilterSelectProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-[0.18em] text-soft-brown uppercase">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-full border border-warm-border bg-soft-white px-4 text-sm text-deep-brown outline-none transition focus:border-muted-gold"
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
