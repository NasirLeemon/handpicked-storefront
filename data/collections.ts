export type Collection = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  label: string;
  featured?: boolean;
};

export const collections: Collection[] = [
  {
    id: "ethnic",
    title: "Ethnic",
    description: "Elegant festive pieces with refined boutique charm.",
    href: "/shop?category=Ethnic",
    image: "/images/products/lemon green.png",
    label: "Featured",
    featured: true,
  },
  {
    id: "co-ords",
    title: "Co-ords",
    description: "Fresh matching sets for graceful everyday style.",
    href: "/shop?category=Co-ords",
    image: "/images/products/blue coords.png",
    label: "Everyday",
  },
  {
    id: "tops",
    title: "Tops",
    description: "Polished tops made for easy, feminine styling.",
    href: "/shop?category=Tops",
    image: "/images/products/red top.png",
    label: "Essentials",
  },
  {
    id: "beauty",
    title: "Beauty",
    description: "Curated beauty add-ons for soft finishing touches.",
    href: "/shop?category=Beauty",
    image: "/images/products/blush.png",
    label: "Beauty",
  },
  {
    id: "accessories",
    title: "Accessories",
    description: "Delicate details to complete your boutique look.",
    href: "/shop?category=Accessories",
    image: "/images/products/flower-clip.png",
    label: "Details",
  },
];
