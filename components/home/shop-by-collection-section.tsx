import { CategoryCard } from "@/components/home/category-card";
import { SectionHeading } from "@/components/home/section-heading";

const categories = [
  {
    title: "New Arrivals",
    description: "Freshly selected pieces for graceful everyday style.",
    href: "/shop",
  },
  {
    title: "Dresses",
    description: "Soft, feminine silhouettes with timeless boutique charm.",
    href: "/shop",
  },
  {
    title: "Tops",
    description: "Elegant tops made for easy, polished styling.",
    href: "/shop",
  },
  {
    title: "Co-ords",
    description: "Effortless matching sets for refined daily wear.",
    href: "/shop",
  },
];

export function ShopByCollectionSection() {
  return (
    <section className="bg-soft-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Curated Categories"
          title="Shop by Collection"
          description="Explore handpicked styles made for effortless elegance, soft femininity, and refined everyday dressing."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              description={category.description}
              href={category.href}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
