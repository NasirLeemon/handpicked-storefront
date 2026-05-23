import Image from "next/image";
import { ProductImagePlaceholder } from "@/components/product/product-image-placeholder";
type ProductImageProps = {
  src?: string;
  alt: string;
  preload?: boolean;
  sizes?: string;
  fit?: "cover" | "contain";
  objectPosition?: string;
  scale?: string;
  hoverScale?: string;
  className?: string;
};

export function ProductImage({
  src,
  alt,
  preload = false,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  fit = "cover",
  objectPosition = "object-center",
  scale = "scale-[1.01]",
  hoverScale = "group-hover:scale-[1.05]",
  className = "",
}: ProductImageProps) {
  if (!src) {
    return <ProductImagePlaceholder title={alt} label="Product Image" />;
  }

  return (
    <Image
  src={src}
  alt={alt}
  fill
  preload={preload}
  placeholder="blur"
  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9IiNGOUYxRTgiLz48L3N2Zz4="
  sizes={sizes}
  className={`${
    fit === "contain" ? "object-contain" : "object-cover"
  } ${objectPosition} ${scale} ${hoverScale} transition duration-700 ${className}`}
/>
  );
}
