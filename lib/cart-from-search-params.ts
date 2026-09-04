import type { CartItem } from "@/types/cart";
import { mockCartItems } from "@/data/cart";
import { getInventoryProductBySlug } from "@/lib/supabase/inventory-products";

type CartSearchParams = {
  product?: string;
  variant?: string;
  color?: string;
  size?: string;
  qty?: string;
};

export async function getCartItemsFromSearchParams(
  searchParams: CartSearchParams,
  fallbackToMock = true
): Promise<CartItem[]> {
  const productSlug = searchParams.product;
  const requestedVariantId =
    searchParams.variant || "";
  const requestedColor =
    searchParams.color || "";
  const requestedSize =
    searchParams.size || "";
  const quantity = Number(searchParams.qty || "1");

  if (!productSlug) {
    return fallbackToMock ? mockCartItems : [];
  }

  const product = await getInventoryProductBySlug(productSlug);

  if (!product) {
    return fallbackToMock ? mockCartItems : [];
  }

  const productVariants =
    product.variants ?? [];

  const selectedVariant =
    (requestedVariantId
      ? productVariants.find(
          (variant) =>
            variant.id === requestedVariantId,
        )
      : undefined) ??
    (requestedColor
      ? productVariants.find(
          (variant) =>
            variant.color === requestedColor &&
            (!requestedSize ||
              variant.size === requestedSize),
        )
      : undefined);

  if (
    (requestedVariantId || requestedColor) &&
    !selectedVariant
  ) {
    return [];
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

  const cartSize =
    selectedVariant?.size ||
    selectedSize;

  const cartStock =
    selectedVariant?.availableStock ??
    product.availableStock;

  return [
    {
      id: `cart-${product.id}-${
        selectedVariant?.id ||
        cartSize ||
        "default"
      }`,
      productId: product.id,
      variantId: selectedVariant?.id,
      slug: product.slug,
      name: product.name,
      price:
        selectedVariant?.price ??
        product.price,
      image: product.images[0] || "",
      color:
        selectedVariant?.color ||
        product.color,
      size: cartSize,
      quantity:
        Number.isFinite(quantity) && quantity > 0
          ? Math.min(
              quantity,
              Math.max(
                1,
                Number(cartStock ?? quantity),
              ),
            )
          : 1,
      availableStock: cartStock,
    },
  ];
}
