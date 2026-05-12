import { CategoryCard } from "@/components/home/category-card";
import { SectionHeading } from "@/components/home/section-heading";

const categories = [
  {
    title: "Co-ords",
    description: "Fresh matching sets for graceful everyday style.",
    href: "/shop?category=Co-ords",
    image: "/images/products/blue coords.png",
  },
  {
    title: "Ethnic",
    description: "Elegant festive pieces with refined boutique charm.",
    href: "/shop?category=Ethnic",
    image: "/images/products/lemon green.png",
  },
  {
    title: "Tops",
    description: "Polished tops made for easy, feminine styling.",
    href: "/shop?category=Tops",
    image: "/images/products/red top.png",
  },
  {
    title: "Beauty",
    description: "Curated beauty add-ons for soft finishing touches.",
    href: "/shop?category=Beauty",
    image: "/images/products/blush.png",
  },
  {
    title: "Accessories",
    description: "Delicate details to complete your boutique look.",
    href: "/shop?category=Accessories",
    image: "/images/products/flower-clip.png",
  },
];

export function ShopByCollectionSection() {
  return (
    <section className="bg-soft-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Curated Categories"
          title="Shop by Collection"
          description="Explore handpicked styles, accessories, and beauty pieces made for effortless elegance, soft femininity, and refined everyday dressing."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              href={category.href}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
