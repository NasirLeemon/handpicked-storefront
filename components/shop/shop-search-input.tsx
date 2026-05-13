import { Search } from "lucide-react";

type ShopSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ShopSearchInput({ value, onChange }: ShopSearchInputProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe"
        strokeWidth={1.7}
      />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products"
        className="h-11 w-full rounded-full border border-warm-border bg-soft-white pl-11 pr-4 text-sm text-deep-brown outline-none transition placeholder:text-taupe focus:border-muted-gold sm:h-12"
      />
    </div>
  );
}
