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
    image: "https://res.cloudinary.com/dbmqkkesn/image/upload/v1778692428/peacock_green_n6yke2.png",
    label: "Featured",
    featured: true,
  },
  {
    id: "co-ords",
    title: "Co-ords",
    description: "Fresh matching sets for graceful everyday style.",
    href: "/shop?category=Co-ords",
    image: "https://res.cloudinary.com/dbmqkkesn/image/upload/v1778692428/white_co-ords_la2yuv.png",
    label: "Everyday",
  },
  {
    id: "tops",
    title: "Tops",
    description: "Polished tops made for easy, feminine styling.",
    href: "/shop?category=Tops",
    image: "https://res.cloudinary.com/dbmqkkesn/image/upload/v1778692734/red-top_si8fwy.jpg",
    label: "Essentials",
  },
  {
    id: "beauty",
    title: "Beauty",
    description: "Curated beauty add-ons for soft finishing touches.",
    href: "/shop?category=Beauty",
    image: "https://res.cloudinary.com/dbmqkkesn/image/upload/v1779557420/tsbwpqwensxwwqfge388.png",
    label: "Beauty",
  },
  {
    id: "accessories",
    title: "Accessories",
    description: "Delicate details to complete your boutique look.",
    href: "/shop?category=Accessories",
    image: "https://res.cloudinary.com/dbmqkkesn/image/upload/v1779558942/eiuat0uf2hq5ahub2prz.png",
    label: "Details",
  },
];
