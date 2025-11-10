import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
// Load Roboto Mono via Next.js font loader (no external CSS imports)

// Using local Geist fonts from the geist package (same fonts as Google Fonts)
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const geistSans = GeistSans;

const geistMono = GeistMono;

// Using Next.js Google Fonts for Roboto Mono
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Custom local fonts - Only preload critical above-the-fold fonts
const neueBit = localFont({
  src: [{ path: "../public/fonts/PPNeueBit-Bold.otf", weight: "700", style: "normal" }],
  variable: "--font-neue-bit",
  display: "swap",
  preload: true, // Critical: Used in hero title
});

const mondwest = localFont({
  src: [{ path: "../public/fonts/PPMondwest-Regular.otf", weight: "400", style: "normal" }],
  variable: "--font-mondwest",
  display: "swap",
  preload: false, // Non-critical: Only used in lazy-loaded StartForFree component
});

const apercuMono = localFont({
  src: [
    { path: "../public/fonts/ApercuMonoProLight.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/ApercuMonoProRegular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/ApercuMonoProMedium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/ApercuMonoProBold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-apercu-mono",
  display: "swap",
  preload: false, // Non-critical: Used in subtitle and form
  adjustFontFallback: false, // Reduce layout shift for monospace font
});

export const metadata: Metadata = {
  title: "Geoscanner - AI Brand Visibility Platform",
  description: "Track how AI models rank your brand. Free AI-readiness checker + premium brand monitoring.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: "Geoscanner - AI Brand Visibility Platform",
    description: "Track how AI models rank your brand. Free AI-readiness checker + premium brand monitoring.",
    url: 'https://firegeo.com',
    siteName: 'Geoscanner',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Geoscanner - AI Brand Visibility Platform",
    description: "Track how AI models rank your brand. Free AI-readiness checker + premium brand monitoring.",
  },
  other: {
    // Hint to browsers about resource priorities
    'color-scheme': 'light',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Optimize rendering by providing sizing hints */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Theme color for browser chrome */}
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoMono.variable} ${neueBit.variable} ${mondwest.variable} ${apercuMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
