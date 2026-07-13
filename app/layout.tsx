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
  metadataBase: new URL("https://handpickedbd.com"),

  title: {
    default: "Handpicked | Boutique Clothing, Beauty & Accessories",
    template: "%s | Handpicked",
  },

  description:
    "Shop thoughtfully selected women's clothing, beauty products, and accessories from Handpicked, with delivery across Bangladesh.",

  keywords: [
    "Handpicked",
    "Handpicked Bangladesh",
    "women's clothing Bangladesh",
    "boutique clothing Bangladesh",
    "ethnic wear Bangladesh",
    "co-ords Bangladesh",
    "beauty products Bangladesh",
    "women's accessories Bangladesh",
  ],

  authors: [
    {
      name: "Handpicked",
      url: "https://handpickedbd.com",
    },
  ],

  creator: "Handpicked",
  publisher: "Handpicked",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },

  openGraph: {
    title: "Handpicked | Boutique Clothing, Beauty & Accessories",
    description:
      "Shop thoughtfully selected women's clothing, beauty products, and accessories, with delivery across Bangladesh.",
    url: "/",
    type: "website",
    locale: "en_US",
    siteName: "Handpicked",
  },

  twitter: {
    card: "summary_large_image",
    title: "Handpicked | Boutique Clothing, Beauty & Accessories",
    description:
      "Shop thoughtfully selected women's clothing, beauty products, and accessories, with delivery across Bangladesh.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
