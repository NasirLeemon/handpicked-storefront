import Link from "next/link";
import { ProductDetailsAccordion } from "@/components/product-detail/product-details-accordion";
import { ProductGallery } from "@/components/product-detail/product-gallery";
import { ProductPurchasePanel } from "@/components/product-detail/product-purchase-panel";
import { RelatedProductsSection } from "@/components/product-detail/related-products-section";
import type { Product } from "@/types/product";

type ProductDetailPageContentProps = {
  product: Product;
};

export function ProductDetailPageContent({
  product,
}: ProductDetailPageContentProps) {
  return (
    <div className="bg-ivory px-4 py-5 text-deep-brown sm:px-6 sm:py-8 lg:px-10 lg:py-7 xl:px-12">
      <div className="w-full">
        <nav className="mb-4 text-sm text-soft-brown sm:mb-6">
          <Link href="/" className="hover:text-deep-brown">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-deep-brown">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-deep-brown">{product.name}</span>
        </nav>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12 xl:gap-16">
          <ProductGallery product={product} />
          <ProductPurchasePanel product={product} />
        </div>

        <ProductDetailsAccordion product={product} />

        <RelatedProductsSection product={product} />
      </div>
    </div>
  );
}
