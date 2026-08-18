import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

const siteUrl = site.siteUrl || "https://cocktail-bondan.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "كوكتيل بوندان | Cocktail Bondan",
    template: "%s | كوكتيل بوندان",
  },
  description: "خليك منعش مع بوندان — عصائر، كوكتيل، ميلك شيك، وحلويات",
  applicationName: "Cocktail Bondan",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Cocktail Bondan",
    title: "كوكتيل بوندان | Cocktail Bondan",
    description: "خليك منعش مع بوندان — عصائر، كوكتيل، ميلك شيك، وحلويات",
    locale: "ar_AR",
    images: [
      {
        url: "/og.png",
        width: 1080,
        height: 1080,
        alt: "كوكتيل بوندان",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "كوكتيل بوندان | Cocktail Bondan",
    description: "خليك منعش مع بوندان — عصائر، كوكتيل، ميلك شيك، وحلويات",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#4d9a40",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className={`${cairo.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
