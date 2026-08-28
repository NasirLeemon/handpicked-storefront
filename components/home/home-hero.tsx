import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const heroVisuals = {
  clothing: {
    label: "Clothing",
    href: "/shop/clothing",
    image: "/homepage_clothing_v2.png",
    alt: "Handpicked women's clothing collection",
  },
  skincare: {
    label: "Skincare",
    href: "/shop/skincare",
    image: "/homepage_skincare.jpg",
    alt: "Handpicked skincare collection",
  },
  haircare: {
    label: "Haircare",
    href: "/shop/haircare",
    image: "/homepage_haircare.png",
    alt: "Handpicked haircare collection",
  },
};

export function HomeHero() {
  return (
    <section className="bg-[#FFFDF9]">
      <div className="mx-auto max-w-7xl px-4 pb-4 pt-5 sm:px-6 sm:pb-5 lg:px-8">
        <div className="flex items-end justify-between">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-muted-gold">
            Fashion + Beauty
          </p>

          <Link
            href="/shop"
            className="hidden items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-deep-brown sm:inline-flex"
          >
            Shop all
            <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
          </Link>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-[3px] md:grid-cols-[1.35fr_0.65fr] md:grid-rows-2">
        <HeroVisual
          {...heroVisuals.clothing}
          featured
        />

        <HeroVisual {...heroVisuals.skincare} />

        <HeroVisual {...heroVisuals.haircare} />
      </div>

      <div className="px-3 sm:hidden">
        <Link
          href="/shop"
          className="my-3 flex h-11 items-center justify-center gap-2 bg-deep-brown text-[9px] font-semibold uppercase tracking-[0.2em] text-white"
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
          ? "col-span-2 min-h-[330px] md:col-span-1 md:row-span-2 md:min-h-[560px]"
          : "min-h-[205px] md:min-h-0"
      }`}
    >
      <Image
        src={image}
        alt={alt}
        fill
        priority={featured}
        sizes={
          featured
            ? "(max-width: 767px) 100vw, 68vw"
            : "(max-width: 767px) 50vw, 32vw"
        }
        className="object-cover transition duration-700 group-hover:scale-[1.02]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#2F2118]/58 via-transparent to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6 lg:p-7">
        <h2
          className={`font-serif-brand font-medium tracking-[-0.04em] text-white ${
            featured
              ? "text-4xl sm:text-5xl"
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
