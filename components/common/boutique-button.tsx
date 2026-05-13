import Link from "next/link";

type BoutiqueButtonVariant = "primary" | "secondary";

type BoutiqueButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: BoutiqueButtonVariant;
};

const buttonStyles: Record<BoutiqueButtonVariant, string> = {
  primary:
    "bg-[#4A3327] !text-[#FFFDF9] shadow-sm hover:bg-[#6F5A49]",
  secondary:
    "border border-warm-border bg-soft-white text-deep-brown hover:border-muted-gold hover:text-muted-gold",
};

export function BoutiqueButton({
  href,
  children,
  variant = "primary",
}: BoutiqueButtonProps) {
  const className = `inline-flex h-11 items-center justify-center rounded-full px-5 text-xs font-semibold tracking-[0.16em] uppercase transition sm:h-12 sm:px-8 sm:text-sm sm:tracking-[0.18em] ${buttonStyles[variant]}`;
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
