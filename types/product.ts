export type ProductAvailability = "available" | "low-stock" | "sold-out";

export type ProductOffer = {
  id: string;
  name: string;
  discountPercent: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number | null;
  offers?: ProductOffer[];
  category: string;
  categories?: string[];
  description: string;
  details?: string;
  images: string[];
  color: string;
  sizes: string[];
  availability: ProductAvailability;
  featured: boolean;
  isNewArrival: boolean;
  createdAt?: string;
  availableStock?: number;
};
