type CheckoutInputProps = {
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function CheckoutInput({
  placeholder,
  type = "text",
  value,
  onChange,
}: CheckoutInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      className="h-12 w-full rounded-2xl border border-warm-border bg-soft-white px-4 text-sm text-deep-brown outline-none transition placeholder:text-taupe focus:border-muted-gold"
    />
  );
}
