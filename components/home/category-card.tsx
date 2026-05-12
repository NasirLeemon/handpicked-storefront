import Image from "next/image";
import Link from "next/link";

type CategoryCardProps = {
  title: string;
  description: string;
  href: string;
  image: string;
};

export function CategoryCard({
  title,
  description,
  href,
  image,
}: CategoryCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-warm-border bg-light-sand transition duration-300 group-hover:border-muted-gold">
        <div className="relative aspect-[4/5]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#2F2118]/75 via-[#2F2118]/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-soft-gold uppercase">
              View Collection
            </p>

            <h3 className="font-serif-brand text-3xl font-semibold text-soft-white">
              {title}
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-[#FFFDF9]/85">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
