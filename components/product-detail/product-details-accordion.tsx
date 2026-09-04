import {
  AlertTriangle,
  Check,
  Info,
  Sparkles,
} from "lucide-react";

import type { Product } from "@/types/product";

type ProductDetailsAccordionProps = {
  product: Product;
};

function cleanLines(value?: string) {
  if (!value) return [];

  return value
    .split(/\r?\n/)
    .map((line) =>
      line
        .trim()
        .replace(/^[•·▪◦✓✔\-–—]+\s*/, ""),
    )
    .filter(Boolean);
}

function getTypeHeading(product: Product) {
  const categories = [
    product.category,
    ...(product.categories ?? []),
  ]
    .join(" ")
    .toLowerCase();

  if (categories.includes("hair")) {
    return "Hair Type";
  }

  if (
    categories.includes("skin") ||
    categories.includes("body")
  ) {
    return "Skin Type";
  }

  if (
    categories.includes("cloth") ||
    categories.includes("fashion")
  ) {
    return "Fit & Style";
  }

  return "Best For";
}

export function ProductDetailsAccordion({
  product,
}: ProductDetailsAccordionProps) {
  const content = product.storefrontContent;

  const benefits = content?.benefits ?? [];
  const ingredients = content?.keyIngredients ?? [];
  const suitableFor = content?.suitableFor ?? [];
  const typeTags = content?.typeTags ?? [];

  const hasStructuredContent =
    benefits.length > 0 ||
    ingredients.length > 0 ||
    suitableFor.length > 0 ||
    typeTags.length > 0 ||
    Boolean(content?.howToUse) ||
    Boolean(content?.warnings) ||
    Boolean(content?.productInfo?.length);

  const legacyDetailLines = cleanLines(product.details);

  const informationRows = [
    product.brand
      ? {
          label: "Brand",
          value: product.brand,
        }
      : null,
    product.sizes.length > 0
      ? {
          label: "Available size",
          value: product.sizes.join(", "),
        }
      : null,
    product.countryOfOrigin
      ? {
          label: "Made in",
          value: product.countryOfOrigin,
        }
      : null,
    ...(content?.productInfo ?? []),
  ].filter(
    (
      item,
    ): item is {
      label: string;
      value: string;
    } => Boolean(item?.label && item?.value),
  );

  return (
    <div className="mx-auto mt-9 w-full max-w-[1180px] space-y-7 sm:mt-14">
      {hasStructuredContent ? (
        <>
          {benefits.length > 0 ? (
            <section className="rounded-[1.25rem] border border-warm-border bg-soft-white p-5 sm:rounded-[1.75rem] sm:p-7">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-full bg-ivory">
                  <Sparkles className="size-4 text-muted-gold" />
                </span>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-gold">
                    Why you’ll love it
                  </p>

                  <h2 className="mt-0.5 text-lg font-semibold text-deep-brown sm:text-xl">
                    Key Benefits
                  </h2>
                </div>
              </div>

              <div className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex gap-3 rounded-xl border border-warm-border/70 bg-ivory/55 px-3.5 py-3"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-deep-brown text-ivory">
                      <Check className="size-3" />
                    </span>

                    <p className="text-[13px] leading-5 text-deep-brown">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {(suitableFor.length > 0 ||
            typeTags.length > 0) ? (
            <section className="grid gap-4 sm:grid-cols-2">
              {suitableFor.length > 0 ? (
                <div className="rounded-[1.25rem] border border-warm-border bg-soft-white p-5 sm:rounded-[1.5rem] sm:p-6">
                  <h2 className="text-lg font-semibold text-deep-brown sm:text-xl">
                    Suitable For
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {suitableFor.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-warm-border bg-ivory px-3 py-1.5 text-[12px] font-medium text-deep-brown"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {typeTags.length > 0 ? (
                <div className="rounded-[1.25rem] border border-warm-border bg-soft-white p-5 sm:rounded-[1.5rem] sm:p-6">
                  <h2 className="text-lg font-semibold text-deep-brown sm:text-xl">
                    {getTypeHeading(product)}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {typeTags.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-warm-border bg-ivory px-3 py-1.5 text-[12px] font-medium text-deep-brown"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          ) : null}

          {content?.howToUse ? (
            <section className="rounded-[1.25rem] border border-warm-border bg-soft-white p-5 sm:rounded-[1.75rem] sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-gold">
                Simple routine
              </p>

              <h2 className="mt-1 text-lg font-semibold text-deep-brown sm:text-xl">
                How to Use
              </h2>

              <div className="mt-4 whitespace-pre-line text-[13px] leading-6 text-soft-brown sm:text-sm sm:leading-7">
                {content.howToUse}
              </div>
            </section>
          ) : product.sizeGuidance ? (
            <section className="rounded-[1.25rem] border border-warm-border bg-soft-white p-5 sm:rounded-[1.75rem] sm:p-7">
              <h2 className="text-lg font-semibold text-deep-brown">
                How to Use
              </h2>

              <p className="mt-3 whitespace-pre-line text-[13px] leading-6 text-soft-brown">
                {product.sizeGuidance}
              </p>
            </section>
          ) : null}

          {ingredients.length > 0 ? (
            <section className="rounded-[1.25rem] border border-warm-border bg-soft-white p-5 sm:rounded-[1.75rem] sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-gold">
                Formula highlights
              </p>

              <h2 className="mt-1 text-lg font-semibold text-deep-brown sm:text-xl">
                Key Ingredients
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="rounded-xl border border-warm-border bg-ivory px-3.5 py-2 text-[12px] font-medium text-deep-brown"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {content?.warnings ? (
            <section className="flex gap-3 rounded-[1.25rem] border border-warm-border bg-ivory/70 p-4 sm:p-5">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-muted-gold" />

              <div>
                <p className="text-[11px] font-semibold text-deep-brown">
                  Important to know
                </p>

                <p className="mt-1 whitespace-pre-line text-[12px] leading-5 text-soft-brown">
                  {content.warnings}
                </p>
              </div>
            </section>
          ) : null}
        </>
      ) : legacyDetailLines.length > 0 ? (
        <section className="py-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-gold">
            About this product
          </p>

          <h2 className="mt-1 text-xl font-semibold text-deep-brown sm:text-2xl">
            Product Details
          </h2>

          <div className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {legacyDetailLines.map((line) => (
              <div
                key={line}
                className="flex gap-3"
              >
                <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-deep-brown text-ivory">
                  <Check className="size-2.5" />
                </span>

                <p className="text-[13px] leading-5 text-soft-brown">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {informationRows.length > 0 ? (
        <section className="overflow-hidden rounded-2xl border border-warm-border bg-soft-white">
          <div className="flex items-center gap-2 border-b border-warm-border px-5 py-4 sm:px-6">
            <Info className="size-4 text-muted-gold" />

            <h2 className="text-base font-semibold text-deep-brown sm:text-lg">
              Product Information
            </h2>
          </div>

          <dl>
            {informationRows.map((item) => (
              <div
                key={`${item.label}-${item.value}`}
                className="grid grid-cols-[130px_1fr] gap-4 border-b border-warm-border/70 px-5 py-3.5 last:border-b-0 sm:grid-cols-[180px_1fr] sm:px-6"
              >
                <dt className="text-[11px] font-medium text-soft-brown">
                  {item.label}
                </dt>

                <dd className="text-[12px] font-semibold text-deep-brown sm:text-[13px]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {product.deliveryPaymentInfo ? (
        <details className="group rounded-xl border border-warm-border bg-soft-white">
          <summary className="cursor-pointer list-none px-5 py-4 text-[12px] font-semibold text-deep-brown sm:px-6 [&::-webkit-details-marker]:hidden">
            Delivery & Payment
          </summary>

          <p className="border-t border-warm-border px-5 py-4 whitespace-pre-line text-[12px] leading-5 text-soft-brown sm:px-6">
            {product.deliveryPaymentInfo}
          </p>
        </details>
      ) : null}
    </div>
  );
}
