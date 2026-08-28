export const dynamic = "force-dynamic";
export const revalidate = 0;

import { notFound } from "next/navigation";
import { CategoryScrollToTop } from "@/components/shop/category-scroll-to-top";
import { ShopPageContent } from "@/components/shop/shop-page-content";
import { ShopProductsClient } from "@/components/shop/shop-products-client";
import { getInventoryProductsForStorefront } from "@/lib/supabase/inventory-products";
import { toCategorySlug } from "@/lib/shop/category-slug";

const departmentSlugs = new Set([
  "new-in",
  "skincare",
  "haircare",
  "clothing",
  "makeup",
  "accessories",
]);

type ShopCategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function ShopCategoryPage({
  params,
}: ShopCategoryPageProps) {
  const { category: categorySlug } = await params;

  if (departmentSlugs.has(categorySlug)) {
    return <ShopPageContent />;
  }

  const products = await getInventoryProductsForStorefront();

  const categories = Array.from(
    new Set(
      products
        .flatMap((product) =>
          product.categories?.length
            ? product.categories
            : [product.category]
        )
        .filter(
          (category) =>
            category &&
            category !== "Uncategorized"
        )
    )
  );

  const categoryName = categories.find(
    (category) => toCategorySlug(category) === categorySlug
  );

  if (!categoryName) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) =>
      (
        product.categories?.length
          ? product.categories
          : [product.category]
      ).includes(categoryName)
  );

  return (
    <main className="min-h-screen bg-ivory text-deep-brown">
      <CategoryScrollToTop />

      <section className="px-4 pb-2 pt-4 sm:px-6 sm:pb-4 sm:pt-7 lg:px-8">
        <div className="mx-auto max-w-7xl md:text-center">
          <h1 className="font-serif-brand text-[2.15rem] font-medium leading-none tracking-[-0.04em] text-deep-brown sm:text-5xl">
            {categoryName}
          </h1>

          <p className="mt-2 text-[11px] text-soft-brown sm:text-sm">
            {categoryProducts.length}{" "}
            {categoryProducts.length === 1 ? "product" : "products"}
          </p>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ShopProductsClient
            products={products}
            initialCategory={categoryName}
            catalogOnly
          />
        </div>
      </section>
    </main>
  );
}
