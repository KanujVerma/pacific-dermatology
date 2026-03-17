import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import LenisProvider from "@/components/LenisProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pacific Dermatology | Dr. Hank Fung — Pleasanton, CA",
  description:
    "Pacific Dermatology offers 20+ years of trusted full-service medical and cosmetic dermatology in Pleasanton, CA under Dr. Hank Fung. Book your appointment today.",
  keywords: [
    "dermatologist Pleasanton CA",
    "Dr Hank Fung dermatologist",
    "Pacific Dermatology Pleasanton",
    "skin cancer screening Pleasanton",
    "Botox Pleasanton",
    "cosmetic dermatology East Bay",
    "medical dermatology Pleasanton",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${montserrat.variable} font-sans antialiased bg-background text-foreground selection:bg-gold-500/30`}
      >
        <LenisProvider>
          <Header />
          {children}
          <Footer />
          <ChatWidget />
        </LenisProvider>
      </body>
    </html>
  );
}
