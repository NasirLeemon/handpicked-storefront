import type { Product } from "@/types/product";

type ProductDetailsAccordionProps = {
  product: Product;
};

export function ProductDetailsAccordion({
  product,
}: ProductDetailsAccordionProps) {
  return (
    <div className="mt-14 divide-y divide-warm-border rounded-[1.75rem] border border-warm-border bg-soft-white">
      <DetailItem title="Product Details">
        {product.details || product.description}
      </DetailItem>

      <DetailItem title="Size Guidance">
        Please check your preferred size before ordering. You can message us on
        Facebook for size help.
      </DetailItem>

      <DetailItem title="Delivery Information">
        Delivery time and charge may vary depending on your location. Our team
        will confirm details after your order request.
      </DetailItem>

      <DetailItem title="Payment Instruction">
        Outside Dhaka orders require advance payment before dispatch. Payment
        details will be shared after order confirmation.
      </DetailItem>
    </div>
  );
}

type DetailItemProps = {
  title: string;
  children: React.ReactNode;
};

function DetailItem({ title, children }: DetailItemProps) {
  return (
    <div className="p-6">
      <h3 className="font-serif-brand text-2xl font-semibold text-deep-brown">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-soft-brown">{children}</p>
    </div>
  );
}
