"use client";

import {
  usePathname,
  useSearchParams,
} from "next/navigation";

const departmentHeadings: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  "new-in": {
    eyebrow: "Latest arrivals",
    title: "New In",
    description: "The newest additions to Handpicked.",
  },
  skincare: {
    eyebrow: "Beauty",
    title: "Skincare",
    description: "Skin essentials, handpicked.",
  },
  haircare: {
    eyebrow: "Beauty",
    title: "Haircare",
    description: "Hair essentials, handpicked.",
  },
  clothing: {
    eyebrow: "Fashion",
    title: "Clothing",
    description: "Women's styles, handpicked.",
  },
  makeup: {
    eyebrow: "Beauty",
    title: "Makeup",
    description: "Makeup favourites, handpicked.",
  },
  accessories: {
    eyebrow: "Finishing touches",
    title: "Accessories",
    description: "Details to complete your look.",
  },
};

export function ShopPageHeader() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const cleanDepartment =
    pathname.match(
      /^\/shop\/(new-in|skincare|haircare|clothing|makeup|accessories)\/?$/
    )?.[1] ?? "";

  const department =
    cleanDepartment ||
    searchParams.get("department")?.trim().toLowerCase() ||
    "";

  const content =
    departmentHeadings[department] ?? {
      eyebrow: "The collection",
      title: "Shop",
      description: "Explore the Handpicked collection.",
    };

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 border-b border-warm-border bg-[#F8F3ED]">
      <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9">
        <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-gold sm:text-[10px]">
          {content.eyebrow}
        </p>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-serif-brand text-4xl font-semibold leading-none tracking-[-0.05em] text-deep-brown sm:text-5xl lg:text-[3.7rem]">
            {content.title}
          </h1>

          <p className="max-w-sm text-sm leading-6 text-soft-brown sm:text-right">
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}
