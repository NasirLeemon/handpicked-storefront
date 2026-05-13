import { BoutiqueButton } from "@/components/common/boutique-button";
import { CategoryCard } from "@/components/home/category-card";
import { SectionHeading } from "@/components/home/section-heading";
import { collections } from "@/data/collections";

export function ShopByCollectionSection() {
  const homepageCollections = collections.slice(0, 5);
  const featuredCategory =
    homepageCollections.find((collection) => collection.featured) ??
    homepageCollections[0];

  const secondaryCategories = homepageCollections.filter(
    (collection) => collection.id !== featuredCategory.id
  );

  return (
    <section className="bg-soft-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Curated Categories"
          title="Shop by Collection"
          description="Explore handpicked styles, accessories, and beauty pieces selected for soft elegance and refined everyday dressing."
        />

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[1.05fr_1fr]">
          <div className="h-full">
            <CategoryCard
              title={featuredCategory.title}
              description={featuredCategory.description}
              href={featuredCategory.href}
              image={featuredCategory.image}
              label={featuredCategory.label}
              featured
            />
          </div>

          <div className="grid h-full gap-5 sm:grid-cols-2 lg:grid-rows-2">
            {secondaryCategories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                description={category.description}
                href={category.href}
                image={category.image}
                label={category.label}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <BoutiqueButton href="/shop" variant="secondary">
            View All Collections
          </BoutiqueButton>
        </div>
      </div>
    </section>
  );
}
