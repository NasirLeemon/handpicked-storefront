type ProductImagePlaceholderProps = {
  title?: string;
  label?: string;
};

export function ProductImagePlaceholder({
  title = "Product Image",
  label = "Handpicked",
}: ProductImagePlaceholderProps) {
  return (
    <div className="flex h-full w-full items-center justify-center px-6 text-center">
      <div>
        <p className="font-serif-brand text-2xl font-semibold text-deep-brown sm:text-3xl">
          {title}
        </p>

        <p className="mt-2 text-xs font-semibold tracking-[0.22em] text-muted-gold uppercase">
          {label}
        </p>
      </div>
    </div>
  );
}
