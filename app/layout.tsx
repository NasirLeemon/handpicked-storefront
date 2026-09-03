import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { OfferTicker } from "@/components/layout/offer-ticker";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

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

  verification: {
  google: "6lCvuykYaFH3ZA1VLQzC7vCfHg758RYKNe9GXwpVeIU",
},

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
  url: "https://handpickedbd.com",
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
          <OfferTicker />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </CartProvider>
        <GoogleAnalytics gaId="G-TFT6V5ZRHH" />

        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1676538000108970');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1676538000108970&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

<Script id="microsoft-clarity" strategy="afterInteractive">
  {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "xm8offk239");
  `}
</Script>
      </body>
    </html>
  );
}
