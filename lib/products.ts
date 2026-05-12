import { products } from "@/data/products";

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}

export function getNewArrivals() {
  return products.filter((product) => product.isNewArrival);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(category: string, currentProductId: string) {
  return products.filter(
    (product) =>
      product.category === category && product.id !== currentProductId
  );
}
