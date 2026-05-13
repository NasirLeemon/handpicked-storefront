import { CategoryCard } from "@/components/home/category-card";
import { SectionHeading } from "@/components/home/section-heading";

const categories = [
  {
    title: "Ethnic",
    description: "Elegant festive pieces with refined boutique charm.",
    href: "/shop?category=Ethnic",
    image: "/images/products/lemon green.png",
    label: "Featured",
  },
  {
    title: "Co-ords",
    description: "Fresh matching sets for graceful everyday style.",
    href: "/shop?category=Co-ords",
    image: "/images/products/blue coords.png",
    label: "Everyday",
  },
  {
    title: "Tops",
    description: "Polished tops made for easy, feminine styling.",
    href: "/shop?category=Tops",
    image: "/images/products/red top.png",
    label: "Essentials",
  },
  {
    title: "Beauty",
    description: "Curated beauty add-ons for soft finishing touches.",
    href: "/shop?category=Beauty",
    image: "/images/products/blush.png",
    label: "Beauty",
  },
  {
    title: "Accessories",
    description: "Delicate details to complete your boutique look.",
    href: "/shop?category=Accessories",
    image: "/images/products/flower-clip.png",
    label: "Details",
  },
];

export function ShopByCollectionSection() {
  const [featuredCategory, ...secondaryCategories] = categories;

  return (
    <section className="bg-soft-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Curated Categories"
          title="Shop by Collection"
          description="Explore handpicked styles, accessories, and beauty pieces selected for soft elegance and refined everyday dressing."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <div className="lg:min-h-[620px]">
            <CategoryCard
              title={featuredCategory.title}
              description={featuredCategory.description}
              href={featuredCategory.href}
              image={featuredCategory.image}
              label={featuredCategory.label}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {secondaryCategories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                description={category.description}
                href={category.href}
                image={category.image}
                label={category.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
