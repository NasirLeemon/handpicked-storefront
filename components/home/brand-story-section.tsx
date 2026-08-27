import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BrandStorySection() {
  return (
    <section className="bg-[#342319] px-4 py-9 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-serif-brand text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
          Fashion. Beauty. Handpicked.
        </h2>

        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white"
        >
          Our story
          <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
        </Link>
      </div>
    </section>
  );
}
