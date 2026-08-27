import type { CartItem } from "@/types/cart";
import { mockCartItems } from "@/data/cart";
import { getInventoryProductBySlug } from "@/lib/supabase/inventory-products";

type CartSearchParams = {
  product?: string;
  size?: string;
  qty?: string;
};

export async function getCartItemsFromSearchParams(
  searchParams: CartSearchParams,
  fallbackToMock = true
): Promise<CartItem[]> {
  const productSlug = searchParams.product;
  const requestedSize = searchParams.size || "";
  const quantity = Number(searchParams.qty || "1");

  if (!productSlug) {
    return fallbackToMock ? mockCartItems : [];
  }

  const product = await getInventoryProductBySlug(productSlug);

  if (!product) {
    return fallbackToMock ? mockCartItems : [];
  }

  const productSizes = product.sizes.filter(Boolean);

  if (
    productSizes.length > 1 &&
    (!requestedSize || !productSizes.includes(requestedSize))
  ) {
    return [];
  }

  const selectedSize =
    requestedSize ||
    (productSizes.length === 1 ? productSizes[0] : "");

  return [
    {
      id: `cart-${product.id}-${selectedSize || "default"}`,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] || "",
      color: product.color,
      size: selectedSize,
      quantity:
        Number.isFinite(quantity) && quantity > 0
          ? quantity
          : 1,
      availableStock: product.availableStock,
    },
  ];
}
