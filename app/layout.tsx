import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  ...(site.siteUrl ? { metadataBase: new URL(site.siteUrl) } : {}),
  title: {
    default: "كوكتيل بوندان | Cocktail Bondan",
    template: "%s | كوكتيل بوندان",
  },
  description: "خليك منعش مع بوندان — عصائر، كوكتيل، ميلك شيك، وحلويات",
  applicationName: "Cocktail Bondan",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
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
