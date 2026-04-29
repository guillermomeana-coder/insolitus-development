import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Analytics from "@/components/Analytics";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Insolitus Development — Boutique Development in Los Cabos",
  description: "A boutique local development company facilitating design & construction in Los Cabos, Mexico.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://insolitusdevelopment.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'es': '/es',
    },
  },
  openGraph: {
    title: "Insolitus Development — Boutique Development in Los Cabos",
    description: "A boutique local development company facilitating design & construction in Los Cabos, Mexico.",
    locale: 'en_US',
    alternateLocale: 'es_MX',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="alternate" hrefLang="en" href="/en" />
        <link rel="alternate" hrefLang="es" href="/es" />
        <link rel="alternate" hrefLang="x-default" href="/" />
      </head>
      <body className="antialiased bg-[#F6F6F6] text-[#1A2530]">
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  );
}
