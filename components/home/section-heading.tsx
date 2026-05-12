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
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold tracking-[0.26em] text-muted-gold uppercase">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="font-serif-brand text-4xl font-semibold tracking-tight text-deep-brown sm:text-5xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-sm leading-7 text-soft-brown sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}