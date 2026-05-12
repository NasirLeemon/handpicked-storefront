export type ProductAvailability = "available" | "low-stock" | "sold-out";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  description: string;
  details?: string;
  images: string[];
  color: string;
  sizes: string[];
  availability: ProductAvailability;
  featured: boolean;
  isNewArrival: boolean;
};
