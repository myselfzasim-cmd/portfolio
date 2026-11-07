"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { Lock } from "lucide-react";

export default function Navbar() {
  const { lang, setLang } = useLanguage();

  return (
    <header className="sticky top-0 z-50 bg-[#f4f1ea]/90 backdrop-blur-md border-b border-[#d8d4ca]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="w-8 h-8 rounded-full border border-[#0b0b0a] flex items-center justify-center font-mono text-xs font-bold bg-[#0b0b0a] text-[#f4f1ea] group-hover:bg-[#caff39] group-hover:text-[#0b0b0a] transition-colors">
            TP
          </span>
          <div className="flex flex-col">
            <span className="font-handwriting text-lg font-bold tracking-wide text-[#0b0b0a]">
              ThirstyPoet
            </span>
            <span className="font-mono text-[9px] text-[#70716b] tracking-tight">
              PACKAGING DESIGNER · PRAN-RFL
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wider uppercase text-[#0b0b0a]">
          <Link href="/#work" className="hover:text-[#2b59ff] transition-colors">
            {lang === "en" ? "Work" : "প্রজেক্টসমূহ"}
          </Link>
          <Link href="/#process" className="hover:text-[#2b59ff] transition-colors">
            {lang === "en" ? "Process" : "ডিজাইন প্রসেস"}
          </Link>
          <Link href="/#credentials" className="hover:text-[#2b59ff] transition-colors">
            {lang === "en" ? "Credentials" : "অভিজ্ঞতা"}
          </Link>
          <Link href="/gallery" className="hover:text-[#2b59ff] transition-colors">
            {lang === "en" ? "Photo Gallery" : "ফটো গ্যালারি"}
          </Link>
          <Link href="/#contact" className="hover:text-[#2b59ff] transition-colors">
            {lang === "en" ? "Contact" : "যোগাযোগ"}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <div className="flex border border-[#0b0b0a] rounded-full overflow-hidden p-0.5 bg-white">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 font-mono text-[10px] font-semibold rounded-full transition-colors ${
                lang === "en"
                  ? "bg-[#0b0b0a] text-white"
                  : "text-[#70716b] hover:text-[#0b0b0a]"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("bn")}
              className={`px-2.5 py-1 font-mono text-[10px] font-semibold rounded-full transition-colors ${
                lang === "bn"
                  ? "bg-[#0b0b0a] text-white"
                  : "text-[#70716b] hover:text-[#0b0b0a]"
              }`}
            >
              বাং
            </button>
          </div>

          {/* Admin Studio Link */}
          <Link
            href="/admin"
            title="Admin Studio"
            className="p-2 border border-[#d8d4ca] rounded-full text-[#70716b] hover:text-[#0b0b0a] hover:border-[#0b0b0a] hover:bg-[#caff39] transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
