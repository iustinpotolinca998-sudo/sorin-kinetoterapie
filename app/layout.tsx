import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import SmoothScroll from "@/components/providers/SmoothScroll";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const SITE_URL = "https://kinetoterapie-sorin.ro"; // TODO: confirma domeniul final

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kinetoterapie Sorin — Recuperare medicală în Iași",
    template: "%s · Kinetoterapie Sorin Iași",
  },
  description:
    "Cabinet de kinetoterapie în Iași. Recuperare după accidentări, durere de spate, reabilitare post-operatorie și pregătire pentru sportivi. Programează o evaluare cu Sorin.",
  keywords: [
    "kinetoterapie Iași",
    "recuperare medicală Iași",
    "kinetoterapeut Iași",
    "fizioterapie Iași",
    "reabilitare post-operatorie",
    "durere de spate",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: "Kinetoterapie Sorin",
    title: "Kinetoterapie Sorin — Recuperare medicală în Iași",
    description:
      "Recuperare după accidentări, durere de spate și reabilitare post-operatorie. Programează o evaluare cu Sorin, în Iași.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0B",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
