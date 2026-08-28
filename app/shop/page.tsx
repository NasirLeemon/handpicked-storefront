export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import { ShopPageContent } from "@/components/shop/shop-page-content";

export const metadata: Metadata = {
  title: "Shop All",
  description:
    "Shop the complete Handpicked collection of women's clothing, skincare, haircare, beauty, and accessories.",
};

export default function ShopPage() {
  return <ShopPageContent />;
}
