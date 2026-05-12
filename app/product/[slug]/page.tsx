import { notFound } from "next/navigation";
import { ProductDetailPageContent } from "@/components/product-detail/product-detail-page-content";
import { getAllProducts, getProductBySlug } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPageContent product={product} />;
}
