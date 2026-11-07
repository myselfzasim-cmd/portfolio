import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "Zasim Uddin — Senior Packaging Designer | PRAN-RFL Group",
  description:
    "Packaging design, dielines, and production-ready visual systems for high-volume FMCG products. Real work on supermarket shelves worldwide.",
  keywords: [
    "Packaging Design",
    "FMCG Packaging",
    "PRAN-RFL Group",
    "Dieline Design",
    "Label Design",
    "Production Artwork",
    "Brand Identity",
    "Bangladesh Packaging Designer",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="dark" className="dark">
      <body className="antialiased selection:bg-[#d4ff33] selection:text-black">
        <ThemeProvider>
          <LanguageProvider>
            {children}
            <FloatingWhatsApp />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
