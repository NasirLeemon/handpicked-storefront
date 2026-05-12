import { ShopProductsClient } from "@/components/shop/shop-products-client";
import { getAllProducts } from "@/lib/products";

export function ShopProductSection() {
  const products = getAllProducts();

  return (
    <section className="bg-ivory px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ShopProductsClient products={products} />
      </div>
    </section>
  );
}
