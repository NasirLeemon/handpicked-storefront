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
        <div className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold shadow-sm">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.7} />
        </div>

        {eyebrow ? (
          <p className="mb-2 text-[10px] font-semibold tracking-[0.28em] text-muted-gold uppercase sm:text-xs">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="font-serif-brand text-4xl font-medium leading-[1.02] tracking-[-0.045em] text-deep-brown sm:text-5xl">
          {title}
        </h2>

        {description ? (
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-soft-brown sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
