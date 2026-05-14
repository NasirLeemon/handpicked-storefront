import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPageContent } from "@/components/product-detail/product-detail-page-content";
import {
  getAllProductsFromDatabase,
  getProductBySlugFromDatabase,
} from "@/lib/supabase/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const products = await getAllProductsFromDatabase();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugFromDatabase(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | Handpicked`,
      description: product.description,
      images: product.images[0]
        ? [
            {
              url: product.images[0],
              alt: product.name,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlugFromDatabase(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPageContent product={product} />;
}
