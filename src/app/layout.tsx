import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Technical Corp | Modern IT Solutions & Cyber Security",
  description: "Technical Corp provides complete IT support, web development, AI-powered applications, and digital solutions globally.",
  openGraph: {
    title: "Technical Corp | Modern IT Solutions",
    description: "Modern IT solutions for businesses. Help startups and companies build scalable digital products.",
    type: "website",
    url: "https://technicalcorp.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Technical Corp",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} antialiased selection:bg-brand-primary/30`}
        suppressHydrationWarning
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
