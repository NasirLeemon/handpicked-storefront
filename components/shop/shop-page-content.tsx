import { ShopHelpCta } from "@/components/shop/shop-help-cta";
import { ShopPageHeader } from "@/components/shop/shop-page-header";
import { ShopProductSection } from "@/components/shop/shop-product-section";

export function ShopPageContent() {
  return (
    <div className="min-h-screen bg-ivory text-deep-brown">
      <ShopPageHeader />
      <ShopProductSection />
      <ShopHelpCta />
    </div>
  );
}
