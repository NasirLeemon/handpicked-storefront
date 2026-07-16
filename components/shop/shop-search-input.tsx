import { Search } from "lucide-react";

type ShopSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ShopSearchInput({
  value,
  onChange,
}: ShopSearchInputProps) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 hidden text-[10px] font-semibold tracking-[0.24em] text-muted-gold uppercase md:block">
        Search
      </span>

      <div className="relative border-b border-warm-border transition focus-within:border-muted-gold">
        <Search
          className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-taupe"
          strokeWidth={1.7}
        />

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search products"
          className="h-11 w-full appearance-none border-0 bg-transparent pl-7 pr-2 text-sm text-deep-brown outline-none ring-0 transition placeholder:text-taupe focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 sm:h-12"
        />
      </div>
    </label>
  );
}