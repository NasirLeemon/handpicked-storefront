import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CategoryCardProps = {
  title: string;
  description: string;
  href: string;
  image: string;
  label?: string;
};

export function CategoryCard({
  title,
  description,
  href,
  image,
  label = "Collection",
}: CategoryCardProps) {
  return (
    <Link href={href} className="group block">
      <article className="relative overflow-hidden rounded-[2rem] border border-warm-border bg-light-sand shadow-sm transition duration-500 hover:-translate-y-1 hover:border-muted-gold hover:shadow-[0_24px_70px_rgba(47,33,24,0.14)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#2F2118]/82 via-[#2F2118]/28 to-transparent" />
          <div className="absolute inset-0 bg-[#2F2118]/0 transition duration-500 group-hover:bg-[#2F2118]/10" />

          <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#FFFDF9]/15 px-4 py-2 backdrop-blur-md">
            <p className="text-[10px] font-semibold tracking-[0.22em] text-[#FFFDF9] uppercase">
              {label}
            </p>
          </div>

          <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-[#FFFDF9]/15 text-[#FFFDF9] opacity-0 backdrop-blur-md transition duration-500 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.7} />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <div className="rounded-[1.5rem] border border-white/20 bg-[#FFFDF9]/12 p-5 backdrop-blur-md transition duration-500 group-hover:bg-[#FFFDF9]/18">
              <h3 className="font-serif-brand text-3xl font-medium leading-none tracking-[-0.02em] text-[#FFFDF9]">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#FFFDF9]/82">
                {description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-soft-gold uppercase">
                <span>Explore</span>
                <span className="h-px w-8 bg-soft-gold transition duration-500 group-hover:w-12" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
