import Link from "next/link";

type CategoryCardProps = {
  title: string;
  description: string;
  href: string;
};

export function CategoryCard({ title, description, href }: CategoryCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="overflow-hidden rounded-[1.75rem] border border-warm-border bg-light-sand transition duration-300 group-hover:border-muted-gold">
        <div className="flex aspect-[4/5] items-end p-6">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-muted-gold uppercase">
              View Collection
            </p>

            <h3 className="font-serif-brand text-3xl font-semibold text-deep-brown transition group-hover:text-muted-gold">
              {title}
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-soft-brown">
              {description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
