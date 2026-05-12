import Image from "next/image";
import { ProductImagePlaceholder } from "@/components/product/product-image-placeholder";

type ProductImageProps = {
  src?: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function ProductImage({
  src,
  alt,
  priority = false,
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
      priority={priority}
      sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
      className={`object-cover transition duration-500 group-hover:scale-105 ${className}`}
    />
  );
}
