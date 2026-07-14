import type { ElementType } from "react";

type ContactInfoCardProps = {
  href: string;
  icon: ElementType;
  title: string;
  description: string;
  external?: boolean;
};

export function ContactInfoCard({
  href,
  icon: Icon,
  title,
  description,
  external = false,
}: ContactInfoCardProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="group relative overflow-hidden rounded-[1.35rem] border border-warm-border bg-[#FFFDF9] shadow-[0_12px_34px_rgba(47,33,24,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-muted-gold"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(176,138,85,0.09),transparent_36%),linear-gradient(180deg,rgba(255,252,248,0.98),rgba(250,244,236,0.62))]" />

      <div className="relative flex min-h-[88px] items-center gap-4 px-5 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-muted-gold/25 bg-light-sand text-muted-gold">
          <Icon className="h-4 w-4" strokeWidth={1.7} />
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-[-0.02em] text-deep-brown transition group-hover:text-muted-gold">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-5 text-soft-brown">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}