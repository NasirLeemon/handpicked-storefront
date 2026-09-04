import Link from "next/link";
import { ProductDetailsAccordion } from "@/components/product-detail/product-details-accordion";
import { ProductDetailPurchaseSection } from "@/components/product-detail/product-detail-purchase-section";
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

        <ProductDetailPurchaseSection
          product={product}
        />

        <ProductDetailsAccordion product={product} />

        <RelatedProductsSection product={product} />
      </div>
    </div>
  );
}
