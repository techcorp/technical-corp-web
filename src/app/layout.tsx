import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

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
         <Script id="bf-config" strategy="beforeInteractive">
          {`window.BotForgeConfig = {"id":"1780134876344","name":"CyberWolf","businessName":"Tehcnical Corp","model":"big-pickle","primaryColor":"#2563EB","logo":"data:image/png;base64,...","welcomeMessage":"Welcome to Technical Corp, How can i help you today?","poweredBy":"Technical Corp","apiUrl":"https://bot-forge-builder.vercel.app/api/chat"};`}
        </Script>
        <Script src="https://bot-forge-builder.vercel.app/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
