export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import { ShopPageContent } from "@/components/shop/shop-page-content";

export const metadata: Metadata = {
  title: "Shop Collection",
  description:
    "Browse Handpicked's premium boutique collection of co-ords, ethnic wear, tops, accessories, and beauty products.",
};

export default function ShopPage() {
  return <ShopPageContent />;
}
