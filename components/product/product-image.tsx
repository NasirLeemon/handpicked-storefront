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
      sizes={sizes}
      className={`${
        fit === "contain" ? "object-contain" : "object-cover"
      } ${objectPosition} ${scale} ${hoverScale} transition duration-700 ${className}`}
    />
  );
}
