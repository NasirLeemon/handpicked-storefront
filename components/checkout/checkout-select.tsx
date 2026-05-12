type CheckoutSelectOption = {
  label: string;
  value: string;
};

type CheckoutSelectProps = {
  options: CheckoutSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
};

export function CheckoutSelect({
  options,
  value,
  onChange,
}: CheckoutSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      className="h-12 w-full rounded-2xl border border-warm-border bg-soft-white px-4 text-sm text-deep-brown outline-none transition focus:border-muted-gold"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
