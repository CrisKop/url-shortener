import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/layout/nav/Nav";
import Footer from "@/components/layout/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZapCut - Acortador de Links",
  description: "Acortador de links rápido y fácil",
  keywords: ["acortador", "links", "rapido", "facil"],
  authors: [{ name: "CrisKop" }],
  openGraph: {
    title: "ZapCut - Acortador de Links",
    description: "Acortador de links rápido y fácil",
    url: "https://zap.criskop.com",
    siteName: "ZapCut",
    images: [
      {
        url: "https://zap.criskop.com/zapcut-logo.webp",
        width: 200,
        height: 200,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
