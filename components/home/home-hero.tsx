import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const heroVisuals = {
  clothing: {
    label: "Clothing",
    href: "/shop?department=clothing",
    image: "/homepage_clothing.jpg",
    alt: "Handpicked women's clothing collection",
  },
  skincare: {
    label: "Skincare",
    href: "/shop?department=skincare",
    image: "/homepage_skincare.jpg",
    alt: "Handpicked skincare collection",
  },
  haircare: {
    label: "Haircare",
    href: "/shop?department=haircare",
    image: "/homepage_haircare.jpg",
    alt: "Handpicked haircare collection",
  },
};

export function HomeHero() {
  return (
    <section className="bg-[#FFFDF9] px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-muted-gold">
              Fashion + Beauty
            </p>

            <h1 className="mt-1 font-serif-brand text-3xl font-medium tracking-[-0.045em] text-deep-brown sm:text-4xl">
              Handpicked for her.
            </h1>
          </div>

          <Link
            href="/shop"
            className="hidden items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-deep-brown sm:inline-flex"
          >
            Shop all
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-[1.35fr_0.65fr] md:grid-rows-2">
          <HeroVisual
            {...heroVisuals.clothing}
            featured
          />

          <HeroVisual
            {...heroVisuals.skincare}
          />

          <HeroVisual
            {...heroVisuals.haircare}
          />
        </div>

        <Link
          href="/shop"
          className="mt-3 flex h-11 items-center justify-center gap-2 bg-deep-brown text-[9px] font-semibold uppercase tracking-[0.2em] text-white sm:hidden"
        >
          Shop New In
          <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
        </Link>
      </div>
    </section>
  );
}

type HeroVisualProps = {
  label: string;
  href: string;
  image: string;
  alt: string;
  featured?: boolean;
};

function HeroVisual({
  label,
  href,
  image,
  alt,
  featured = false,
}: HeroVisualProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden bg-[#EFE7DD] ${
        featured
          ? "col-span-2 min-h-[310px] md:col-span-1 md:row-span-2 md:min-h-[520px]"
          : "min-h-[190px] md:min-h-0"
      }`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority={featured}
        sizes={
          featured
            ? "(max-width: 767px) 100vw, 65vw"
            : "(max-width: 767px) 50vw, 35vw"
        }
        className="object-cover transition duration-700 group-hover:scale-[1.025]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#2F2118]/60 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <h2
          className={`font-serif-brand font-medium tracking-[-0.04em] text-white ${
            featured
              ? "text-3xl sm:text-5xl"
              : "text-2xl sm:text-3xl"
          }`}
        >
          {label}
        </h2>

        <ArrowRight
          className="h-5 w-5 shrink-0 text-white transition group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      </div>
    </Link>
  );
}
