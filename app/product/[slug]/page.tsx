export const dynamic = "force-dynamic";
export const revalidate = 0;

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPageContent } from "@/components/product-detail/product-detail-page-content";
import {
  getInventoryProductBySlug,
  getInventoryProductsForStorefront,
} from "@/lib/supabase/inventory-products";

const BASE_URL = "https://handpickedbd.com";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getAbsoluteImageUrl(imageUrl: string) {
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  return `${BASE_URL}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}

function getSchemaAvailability(
  availability: "available" | "low-stock" | "sold-out"
) {
  if (availability === "sold-out") {
    return "https://schema.org/OutOfStock";
  }

  if (availability === "low-stock") {
    return "https://schema.org/LimitedAvailability";
  }

  return "https://schema.org/InStock";
}

export async function generateStaticParams() {
  const products = await getInventoryProductsForStorefront();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getInventoryProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const productUrl = `${BASE_URL}/product/${product.slug}`;
  const productImages = product.images.map(getAbsoluteImageUrl);

  return {
    title: product.name,
    description: product.description,

    alternates: {
      canonical: productUrl,
    },

    openGraph: {
      title: `${product.name} | Handpicked`,
      description: product.description,
      url: productUrl,
      type: "website",
      siteName: "Handpicked",
      images: productImages.length
        ? productImages.map((url) => ({
            url,
            alt: product.name,
          }))
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Handpicked`,
      description: product.description,
      images: productImages.length ? productImages : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getInventoryProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const productUrl = `${BASE_URL}/product/${product.slug}`;
  const productImages = product.images.map(getAbsoluteImageUrl);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: productImages,
    sku: product.id,
    url: productUrl,
    category: product.category,
    color: product.color,
    size: product.sizes,
    brand: {
      "@type": "Brand",
      name: "Handpicked",
    },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "BDT",
      price: product.price,
      availability: getSchemaAvailability(product.availability),
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@type": "Organization",
        name: "Handpicked",
        url: BASE_URL,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ProductDetailPageContent product={product} />
    </>
  );
}