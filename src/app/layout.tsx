import type { Metadata } from "next";
import { Fragment_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { getLocale, setRequestLocale } from "next-intl/server";
import {
  defaultOpenGraphConfig,
  defaultTwitterConfig,
} from "@/lib/seo/metadata";
import { INFO } from "@/content/info";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(INFO.domain),
  title: {
    default: "Enrique Velasco - Creative Technologist",
    template: "%s | Enrique Velasco",
  },
  description:
    "Harmonious Engineer: Bridging Dance, Code & Business to Transform Creative Careers",
  openGraph: defaultOpenGraphConfig,
  twitter: defaultTwitterConfig,
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

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  setRequestLocale(locale);
  return (
    <html lang={locale}>
      <body
        className={`${plusJakartaSans.variable} ${fragmentMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
