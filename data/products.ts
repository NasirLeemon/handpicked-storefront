import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    slug: "soft-beige-coord-set",
    name: "Soft Beige Co-ord Set",
    price: 2450,
    category: "Co-ords",
    description:
      "A graceful everyday set designed with soft structure, refined comfort, and an effortlessly elegant silhouette.",
    details:
      "Perfect for casual outings, relaxed gatherings, and polished everyday wear.",
    images: [],
    color: "Beige",
    sizes: ["S", "M", "L"],
    availability: "available",
    featured: true,
    isNewArrival: true,
  },
  {
    id: "2",
    slug: "ivory-flowy-dress",
    name: "Ivory Flowy Dress",
    price: 2850,
    category: "Dresses",
    description:
      "A soft ivory dress with a graceful flow, made for elegant everyday moments.",
    details:
      "Designed with a relaxed feminine shape and refined boutique styling.",
    images: [],
    color: "Ivory",
    sizes: ["M", "L", "XL"],
    availability: "low-stock",
    featured: true,
    isNewArrival: true,
  },
  {
    id: "3",
    slug: "warm-brown-elegant-top",
    name: "Warm Brown Elegant Top",
    price: 1650,
    category: "Tops",
    description:
      "A refined warm brown top with a clean silhouette and timeless boutique appeal.",
    details:
      "Easy to style with trousers, skirts, or denim for a polished everyday look.",
    images: [],
    color: "Brown",
    sizes: ["S", "M", "L", "XL"],
    availability: "available",
    featured: false,
    isNewArrival: true,
  },
  {
    id: "4",
    slug: "muted-gold-detail-kurti",
    name: "Muted Gold Detail Kurti",
    price: 2250,
    category: "Ethnic",
    description:
      "An elegant kurti with subtle muted gold details for a graceful festive touch.",
    details:
      "A refined choice for family gatherings, casual occasions, and soft festive styling.",
    images: [],
    color: "Cream",
    sizes: ["M", "L"],
    availability: "sold-out",
    featured: true,
    isNewArrival: false,
  },
];
