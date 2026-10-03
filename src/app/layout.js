import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConditionalNavbar from "@/components/layout/ConditionalNavbar";
import VisitorTracker from "@/components/tracking/VisitorTracker";
import WhatsAppButton from "@/components/common/WhatsAppButton";

// Providers
import AuthProvider from "@/components/auth/AuthProvider";
import CartProvider from "@/components/cart/CartProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://k2paperliquid.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'K2PaperLiquid | K2 Paper Sheets, K2 Liquid Spray, K2 Powder & Etomidate',
    template: '%s | K2PaperLiquid',
  },
  description: 'Buy K2 paper sheets, K2 liquid spray, cannabinoid K2 powder and research-grade etomidate online at K2PaperLiquid.com. Premium quality, discreet packaging and fast worldwide shipping.',
  keywords: [
    'k2 paper sheets', 'k2 paper', 'k2 liquid spray', 'k2 spray', 'k2 powder',
    'cannabinoids k2 powder', 'k2 spice', 'k2 spice paper',
    'etomidate', 'etomidate powder', 'etomidate for sale', 'buy etomidate',
    'buy k2 online', 'k2 for sale', 'k2paperliquid',
  ],
  other: { 'theme-color': '#16a34a' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'K2PaperLiquid',
    title: 'K2PaperLiquid | K2 Paper Sheets, K2 Liquid Spray, K2 Powder & Etomidate',
    description: 'Premium K2 paper sheets, K2 liquid spray, K2 powder and research-grade etomidate. Worldwide discreet shipping.',
    images: [
      {
        url: `${BASE_URL}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: 'K2PaperLiquid — K2 Paper, Spray, Powder & Etomidate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K2PaperLiquid | K2 Paper Sheets, K2 Liquid Spray, K2 Powder & Etomidate',
    description: 'Premium K2 paper sheets, K2 liquid spray, K2 powder and research-grade etomidate. Worldwide discreet shipping.',
    images: [`${BASE_URL}/images/logo.png`],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon', type: 'image/png', sizes: '180x180' },
    ],
    shortcut: '/favicon.svg',
  },
  verification: {
    // google: 'your-google-site-verification-code',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${spaceGrotesk.className} font-sans min-h-screen flex flex-col`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-sky-500 focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>

        <AuthProvider>
          <CartProvider>
            <VisitorTracker />
            <Toaster position="top-center" />
            <WhatsAppButton />
            <ConditionalNavbar>
              <Navbar />
            </ConditionalNavbar>
            <main id="main-content" className="flex-grow">{children}</main>
            <ConditionalNavbar>
              <Footer />
            </ConditionalNavbar>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
