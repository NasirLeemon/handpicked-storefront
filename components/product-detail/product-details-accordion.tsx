import type { Product } from "@/types/product";

type ProductDetailsAccordionProps = {
  product: Product;
};

const getDetails = (product: Product) => [
  {
    title: "Product Details",
    content: product.details || product.description,
  },
  {
    title: "Size Guidance",
    content:
      "Please check your preferred size before ordering. Message us for size help.",
  },
  {
    title: "Delivery & Payment",
    content:
      "Delivery charge, availability, and payment details will be confirmed after your order request. Outside Dhaka orders require advance payment.",
  },
];

export function ProductDetailsAccordion({
  product,
}: ProductDetailsAccordionProps) {
  return (
    <div className="mt-6 rounded-[1.25rem] border border-warm-border bg-soft-white sm:mt-12 sm:rounded-[1.75rem]">
      {getDetails(product).map((item) => (
        <details
          key={item.title}
          className="group border-b border-warm-border px-4 py-4 last:border-b-0 sm:px-6 sm:py-5"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <h3 className="text-sm font-semibold tracking-[0.08em] text-deep-brown uppercase">
              {item.title}
            </h3>

            <span className="text-xl text-muted-gold transition group-open:rotate-45">
              +
            </span>
          </summary>

          <p className="mt-3 text-sm leading-6 text-soft-brown">
            {item.content}
          </p>
        </details>
      ))}
    </div>
  );
}
