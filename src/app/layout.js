import { Manrope, Playfair_Display } from "next/font/google";
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

const manrope = Manrope({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ['600', '700', '800', '900'],
  display: 'swap',
  preload: false,
  variable: '--font-display',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://5fadb5cladba.com';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: '5fadb5cladba | Cannabinoids, Etomidate & Vapes',
    template: '%s | 5fadb5cladba',
  },
  description: 'Buy cannabinoids, etomidate, etomidate vapes and research-grade chemicals online at 5fadb5cladba.com. Premium quality, discreet packaging and fast worldwide shipping.',
  keywords: [
    'cannabinoids', 'cannabinoid powder', 'buy cannabinoids', 'etomidate',
    'etomidate powder', 'etomidate for sale', 'etomidate vape', 'k-pods',
    'research chemicals', 'buy research chemicals online', '5fadb5cladba',
  ],
  other: { 'theme-color': '#170a10' },
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
    siteName: '5fadb5cladba',
    title: '5fadb5cladba | Cannabinoids, Etomidate & Vapes',
    description: 'Premium cannabinoids, etomidate, vapes and research-grade chemicals. Worldwide discreet shipping.',
    images: [
      {
        url: `${BASE_URL}/images/logo.png`,
        width: 1200,
        height: 630,
        alt: '5fadb5cladba — Cannabinoids, Etomidate & Vapes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '5fadb5cladba | Cannabinoids, Etomidate & Vapes',
    description: 'Premium cannabinoids, etomidate, vapes and research-grade chemicals. Worldwide discreet shipping.',
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
      <body className={`${manrope.className} ${playfair.variable} font-sans min-h-screen flex flex-col`}>
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
