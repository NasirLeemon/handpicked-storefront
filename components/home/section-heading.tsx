import { Sparkles } from "lucide-react";
import { Reveal } from "@/components/common/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold">
          <Sparkles className="h-4 w-4" strokeWidth={1.6} />
        </div>

        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="font-serif-brand text-4xl font-medium tracking-[-0.02em] text-deep-brown sm:text-5xl">
          {title}
        </h2>

        {description ? (
          <p className="mt-4 text-sm leading-7 text-soft-brown sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
