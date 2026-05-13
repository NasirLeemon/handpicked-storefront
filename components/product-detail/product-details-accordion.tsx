import { Leaf, Ruler, Truck, WalletCards } from "lucide-react";
import type { Product } from "@/types/product";

type ProductDetailsAccordionProps = {
  product: Product;
};

const detailIcons = {
  details: Leaf,
  size: Ruler,
  delivery: Truck,
  payment: WalletCards,
};

export function ProductDetailsAccordion({
  product,
}: ProductDetailsAccordionProps) {
  return (
    <div className="mt-14 grid gap-4 md:grid-cols-2">
      <DetailItem title="Product Details" icon={detailIcons.details}>
        {product.details || product.description}
      </DetailItem>

      <DetailItem title="Size Guidance" icon={detailIcons.size}>
        Please check your preferred size before ordering. You can message us on
        Facebook for size help.
      </DetailItem>

      <DetailItem title="Delivery Information" icon={detailIcons.delivery}>
        Delivery time and charge may vary depending on your location. Our team
        will confirm details after your order request.
      </DetailItem>

      <DetailItem title="Payment Instruction" icon={detailIcons.payment}>
        Outside Dhaka orders require advance payment before dispatch. Payment
        details will be shared after order confirmation.
      </DetailItem>
    </div>
  );
}

type DetailItemProps = {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
};

function DetailItem({ title, icon: Icon, children }: DetailItemProps) {
  return (
    <div className="rounded-[1.75rem] border border-warm-border bg-soft-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold">
        <Icon className="h-5 w-5" strokeWidth={1.7} />
      </div>

      <h3 className="mt-5 font-serif-brand text-3xl font-medium text-deep-brown">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-soft-brown">{children}</p>
    </div>
  );
}
