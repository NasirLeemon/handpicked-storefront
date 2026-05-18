import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CategoryCardProps = {
  title: string;
  description: string;
  href: string;
  image: string;
  label?: string;
  featured?: boolean;
};

function getShortDescription(title: string, description: string) {
  const copy: Record<string, string> = {
    Ethnic: "Timeless pieces for graceful festive dressing.",
    "Co-ords": "Graceful sets for everyday elegance.",
    Tops: "Soft essentials for effortless styling.",
    Beauty: "Polished add-ons for a refined finish.",
    Accessories: "Delicate details for your boutique look.",
  };

  return copy[title] || description;
}

export function CategoryCard({
  title,
  description,
  href,
  image,
  label = "Collection",
  featured = false,
}: CategoryCardProps) {
  const displayDescription = getShortDescription(title, description);

  return (
    <Link href={href} className="group block h-full">
      <article className="relative h-full overflow-hidden rounded-[2rem] border border-warm-border bg-light-sand shadow-sm transition duration-500 hover:-translate-y-1 hover:border-muted-gold hover:shadow-[0_24px_70px_rgba(47,33,24,0.12)]">
        <div
          className={
            featured
              ? "relative h-full min-h-[390px] overflow-hidden lg:min-h-[620px]"
              : "relative h-full min-h-[390px] overflow-hidden lg:min-h-[300px]"
          }
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 50vw, 82vw"
                : "(min-width: 1024px) 25vw, 82vw"
            }
            className="object-cover object-top transition duration-700 group-hover:scale-105"
          />

          <div
            className={
              featured
                ? "absolute inset-0 bg-gradient-to-t from-[#21160F]/82 via-[#2F2118]/28 to-transparent"
                : "absolute inset-0 bg-gradient-to-t from-[#21160F]/88 via-[#2F2118]/42 to-[#2F2118]/8"
            }
          />

          <div
            className={
              featured
                ? "absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#21160F]/82 to-transparent"
                : "absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#21160F]/90 via-[#21160F]/42 to-transparent"
            }
          />

          <div className="absolute left-5 top-5 rounded-full border border-white/35 bg-[#FFFDF9]/82 px-4 py-2 shadow-sm backdrop-blur-md">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-deep-brown uppercase">
              {label}
            </p>
          </div>

          <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-[#FFFDF9]/82 text-deep-brown opacity-0 shadow-sm backdrop-blur-md transition duration-500 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
          </div>

          <div
            className={
              featured
                ? "absolute inset-x-0 bottom-0 p-5 lg:p-7"
                : "absolute inset-x-0 bottom-0 p-5"
            }
          >
            <div className={featured ? "max-w-md" : "max-w-[18rem]"}>
              <h3
                className={
                  featured
                    ? "drop-shadow-sm font-serif-brand text-4xl font-medium leading-none tracking-[-0.03em] text-[#FFFDF9] lg:text-5xl"
                    : "drop-shadow-sm font-serif-brand text-[2rem] font-medium leading-none tracking-[-0.03em] text-[#FFFDF9]"
                }
              >
                {title}
              </h3>

              <p
                className={
                  featured
                    ? "mt-3 max-w-md text-sm leading-6 text-[#FFFDF9]/90 lg:mt-4 lg:leading-7"
                    : "mt-2 line-clamp-2 text-sm leading-6 text-[#FFFDF9]/90"
                }
              >
                {displayDescription}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[10px] font-semibold tracking-[0.2em] text-[#FFF3D6] uppercase backdrop-blur-sm transition duration-500 group-hover:border-white/35 group-hover:bg-white/16 lg:mt-5">
                <span>Explore</span>
                <span className="h-px w-7 bg-[#FFF3D6] transition duration-500 group-hover:w-10" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
