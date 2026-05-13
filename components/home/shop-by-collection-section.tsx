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
    <section className="bg-soft-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Curated Categories"
          title="Shop by Collection"
          description="Explore handpicked styles, accessories, and beauty pieces selected for soft elegance and refined everyday dressing."
        />

        <div className="-mx-4 mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:mt-12 lg:grid lg:items-stretch lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 lg:grid-cols-[1.05fr_1fr]">
          <div className="min-w-[82vw] snap-start sm:min-w-[58vw] lg:min-w-0">
            <CategoryCard
              title={featuredCategory.title}
              description={featuredCategory.description}
              href={featuredCategory.href}
              image={featuredCategory.image}
              label={featuredCategory.label}
              featured
            />
          </div>

          <div className="contents lg:grid lg:h-full lg:grid-cols-2 lg:grid-rows-2 lg:gap-5">
            {secondaryCategories.map((category) => (
              <div
                key={category.id}
                className="min-w-[82vw] snap-start sm:min-w-[58vw] lg:min-w-0"
              >
                <CategoryCard
                  title={category.title}
                  description={category.description}
                  href={category.href}
                  image={category.image}
                  label={category.label}
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-2 text-center text-xs font-medium tracking-[0.18em] text-taupe uppercase lg:hidden">
          Swipe to explore collections
        </p>

        <div className="mt-10 flex justify-center lg:mt-12">
          <BoutiqueButton href="/shop" variant="secondary">
            View All Collections
          </BoutiqueButton>
        </div>
      </div>
    </section>
  );
}
