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
        <div className="mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-muted-gold/30 bg-light-sand text-muted-gold">
          <Sparkles className="h-4 w-4" strokeWidth={1.6} />
        </div>

        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-muted-gold uppercase">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="font-serif-brand text-4xl font-medium leading-[0.98] tracking-[-0.035em] text-deep-brown sm:text-5xl lg:text-6xl">
          {title}
        </h2>

        {description ? (
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-soft-brown sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
