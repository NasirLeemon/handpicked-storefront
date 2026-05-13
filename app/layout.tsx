import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://handpicked-storefront.vercel.app"),
  title: {
    default: "Handpicked | Premium Boutique Clothing",
    template: "%s | Handpicked",
  },
  description:
    "Shop premium boutique clothing, accessories, and beauty pieces thoughtfully selected for graceful everyday style.",
  keywords: [
    "Handpicked",
    "boutique clothing",
    "women fashion",
    "ethnic wear",
    "co-ords",
    "beauty products",
    "accessories",
    "Bangladesh fashion",
  ],
  authors: [
    {
      name: "Handpicked",
    },
  ],
  creator: "Handpicked",
  openGraph: {
    title: "Handpicked | Premium Boutique Clothing",
    description:
      "Premium boutique clothing, accessories, and beauty pieces thoughtfully selected for graceful everyday style.",
    type: "website",
    locale: "en_US",
    siteName: "Handpicked",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handpicked | Premium Boutique Clothing",
    description:
      "Shop premium boutique clothing, accessories, and beauty pieces thoughtfully selected for graceful everyday style.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
