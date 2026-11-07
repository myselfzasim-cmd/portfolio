"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";
import {
  Home,
  Sun,
  Moon,
  Lock,
  Camera,
  Layers,
  LayoutGrid,
  Languages,
} from "lucide-react";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isBrandsPage = pathname === "/brands";
  const isGalleryPage = pathname === "/gallery";
  const isHomePage = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 backdrop-blur-xl border-b ${
        theme === "dark"
          ? "bg-[#08090c]/95 border-[#1f2433] text-[#f3f4f8] shadow-2xl shadow-black/60"
          : "bg-white/95 border-[#e2e8f0] text-[#0f172a] shadow-md shadow-slate-200/50"
      }`}
    >
      {/* MOBILE 2-TIER VIEW (< lg): Zero Horizontal Overflow, Clean 100% Responsive */}
      <div className="flex flex-col lg:hidden w-full px-3 pt-2 pb-1.5 gap-1.5">
        {/* Row 1: Brand / Home + Theme & Language */}
        <div className="flex items-center justify-between w-full">
          <Link
            href="/"
            title={lang === "bn" ? "হোম পেজে যান" : "Go to Home"}
            className="flex items-center gap-2 group shrink-0 cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#111] via-[#1e2333] to-[#d4ff33] p-[1.5px] shadow-lg flex items-center justify-center shrink-0">
              <div
                className={`w-full h-full rounded-full flex items-center justify-center ${
                  theme === "dark" ? "bg-[#08090c] text-[#d4ff33]" : "bg-white text-[#0f172a]"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-handwriting text-xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff33] via-[#06b6d4] to-[#3b82f6] leading-none">
                ThirstyPoet
              </span>
              <span
                className={`font-mono text-[9px] tracking-wider uppercase font-semibold font-kalpurush truncate mt-0.5 ${
                  theme === "dark" ? "text-[#8c93a8]" : "text-[#64748b]"
                }`}
              >
                {lang === "bn" ? "প্যাকেজিং ডিজাইনার" : "Packaging Designer"}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              title={
                theme === "dark"
                  ? lang === "bn" ? "লাইট মোড" : "Light Mode"
                  : lang === "bn" ? "ডার্ক মোড" : "Dark Mode"
              }
              aria-label="Toggle Theme"
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                theme === "dark"
                  ? "border-[#222634] active:border-[#d4ff33] bg-[#0e1017] text-[#fbbf24]"
                  : "border-slate-300 active:border-slate-500 bg-slate-100 text-[#0f172a]"
              }`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#fbbf24]" />
              ) : (
                <Moon className="w-4 h-4 text-[#2563eb]" />
              )}
            </button>

            {/* Language Toggle */}
            <button
              type="button"
              onClick={() => setLang(lang === "bn" ? "en" : "bn")}
              title={lang === "bn" ? "Switch to English" : "বাংলা ভাষায় পরিবর্তন করুন"}
              aria-label="Toggle Language"
              className="p-1.5 px-2.5 rounded-xl border border-[#222634] bg-[#0e1017] active:border-[#d4ff33] text-[#d4ff33] font-bold text-[11px] flex items-center gap-1 cursor-pointer font-mono shadow-inner shrink-0"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{lang === "bn" ? "বাং" : "EN"}</span>
            </button>
          </div>
        </div>

        {/* Row 2: 4-Column Balanced Grid Nav Links */}
        <div className="grid grid-cols-4 gap-1.5 w-full pt-0.5">
          <Link
            href="/#feed"
            className={`py-1.5 px-1 rounded-xl border transition-all flex items-center justify-center gap-1 text-[11px] font-bold font-kalpurush ${
              isHomePage
                ? "bg-[#d4ff33] text-black border-[#d4ff33]"
                : theme === "dark"
                ? "border-[#222634] active:border-[#d4ff33] bg-[#0e1017] text-[#f3f4f8]"
                : "border-slate-300 active:border-slate-500 bg-slate-100 text-[#0f172a]"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 shrink-0 text-[#d4ff33]" />
            <span className="truncate">{lang === "bn" ? "প্রজেক্ট" : "Projects"}</span>
          </Link>

          <Link
            href="/brands"
            className={`py-1.5 px-1 rounded-xl border transition-all flex items-center justify-center gap-1 text-[11px] font-bold font-kalpurush ${
              isBrandsPage
                ? "bg-[#d4ff33] text-black border-[#d4ff33] shadow-md shadow-[#d4ff33]/20"
                : theme === "dark"
                ? "border-[#222634] active:border-[#d4ff33] bg-[#0e1017] text-[#d4ff33]"
                : "border-slate-300 active:border-slate-500 bg-slate-100 text-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0 text-[#d4ff33]" />
            <span className="truncate">{lang === "bn" ? "ব্র্যান্ডস" : "Brands"}</span>
          </Link>

          <Link
            href="/gallery"
            className={`py-1.5 px-1 rounded-xl border transition-all flex items-center justify-center gap-1 text-[11px] font-bold font-kalpurush ${
              isGalleryPage
                ? "bg-[#38bdf8] text-black border-[#38bdf8] shadow-md shadow-[#38bdf8]/20"
                : theme === "dark"
                ? "border-[#222634] active:border-[#38bdf8] bg-[#0e1017] text-[#38bdf8]"
                : "border-slate-300 active:border-slate-500 bg-slate-100 text-sky-600"
            }`}
          >
            <Camera className="w-3.5 h-3.5 shrink-0 text-[#38bdf8]" />
            <span className="truncate">{lang === "bn" ? "গ্যালারি" : "Gallery"}</span>
          </Link>

          <Link
            href="/admin"
            className={`py-1.5 px-1 rounded-xl border transition-all flex items-center justify-center gap-1 text-[11px] font-bold font-kalpurush ${
              theme === "dark"
                ? "border-[#222634] text-[#8c93a8] active:border-[#d4ff33] bg-[#0e1017]"
                : "border-slate-300 text-slate-600 active:border-black bg-slate-100"
            }`}
          >
            <Lock className="w-3.5 h-3.5 shrink-0 text-[#8c93a8]" />
            <span className="truncate">{lang === "bn" ? "অ্যাডমিন" : "Admin"}</span>
          </Link>
        </div>
      </div>

      {/* DESKTOP VIEW (>= lg) */}
      <div className="hidden lg:flex items-center justify-between h-16 px-6 lg:px-8 w-full">
        {/* Brand Lockup: Far Left with Home Icon */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            title={lang === "bn" ? "হোম পেজে যান" : "Go to Home"}
            className="flex items-center gap-2.5 group shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#111] via-[#1e2333] to-[#d4ff33] p-[1.5px] shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center shrink-0">
              <div
                className={`w-full h-full rounded-full flex items-center justify-center transition-colors ${
                  theme === "dark"
                    ? "bg-[#08090c] text-[#d4ff33] group-hover:bg-[#d4ff33] group-hover:text-black"
                    : "bg-white text-[#0f172a] group-hover:bg-[#d4ff33] group-hover:text-black"
                }`}
              >
                <Home className="w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-handwriting text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff33] via-[#06b6d4] to-[#3b82f6] group-hover:drop-shadow-[0_2px_12px_rgba(212,255,51,0.5)] transition-all leading-none">
                ThirstyPoet
              </span>
              <span
                className={`font-mono text-[9px] tracking-wider uppercase font-semibold font-kalpurush truncate mt-0.5 ${
                  theme === "dark" ? "text-[#8c93a8]" : "text-[#64748b]"
                }`}
              >
                {lang === "bn"
                  ? "প্যাকেজিং ডিজাইনার · প্রাণ-আরএফএল গ্রুপ"
                  : "PACKAGING DESIGNER · PRAN-RFL GROUP"}
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Center Nav Links */}
        <nav className="flex items-center gap-1 font-mono text-xs">
          <Link
            href="/#feed"
            className={`px-3 py-1.5 rounded-xl transition-all ${
              theme === "dark"
                ? "text-[#94a3b8] hover:text-[#d4ff33] hover:bg-white/5"
                : "text-[#475569] hover:text-[#0f172a] hover:bg-slate-100"
            }`}
          >
            {lang === "bn" ? "প্রজেক্টসমূহ" : "Projects"}
          </Link>

          <Link
            href="/brands"
            className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              isBrandsPage
                ? "bg-[#d4ff33] text-black shadow-md shadow-[#d4ff33]/20"
                : theme === "dark"
                ? "text-[#f3f4f8] hover:text-[#d4ff33] hover:bg-white/5"
                : "text-[#0f172a] hover:text-[#2563eb] hover:bg-slate-100"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "ব্র্যান্ডসমূহ" : "Brands"}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10 font-mono">
              330+
            </span>
          </Link>

          <Link
            href="/gallery"
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
              isGalleryPage
                ? "bg-[#38bdf8] text-black shadow-md shadow-[#38bdf8]/20"
                : theme === "dark"
                ? "text-[#94a3b8] hover:text-[#38bdf8] hover:bg-white/5"
                : "text-[#475569] hover:text-[#0f172a] hover:bg-slate-100"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "ফটো গ্যালারি" : "Photo Gallery"}</span>
          </Link>

          <Link
            href="/#feed"
            className={`px-3 py-1.5 rounded-xl transition-all ${
              theme === "dark"
                ? "text-[#94a3b8] hover:text-[#d4ff33] hover:bg-white/5"
                : "text-[#475569] hover:text-[#0f172a] hover:bg-slate-100"
            }`}
          >
            {lang === "bn" ? "ডিজাইন প্রসেস" : "Process"}
          </Link>
        </nav>

        {/* Desktop Right Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0 font-mono text-xs">
          {/* Day / Night Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title={
              theme === "dark"
                ? lang === "bn"
                  ? "লাইট / ডে মোডে পরিবর্তন করুন"
                  : "Switch to Light Mode"
                : lang === "bn"
                ? "ডার্ক / নাইট মোডে পরিবর্তন করুন"
                : "Switch to Dark Mode"
            }
            aria-label="Toggle Theme"
            className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
              theme === "dark"
                ? "border-[#222634] hover:border-[#d4ff33] bg-[#0e1017] text-[#fbbf24] hover:text-white"
                : "border-slate-300 hover:border-slate-500 bg-slate-100 text-[#0f172a]"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#fbbf24] transition-transform duration-300 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-[#2563eb] transition-transform duration-300 hover:-rotate-45" />
            )}
          </button>

          {/* Desktop Dual Segmented Language Toggle */}
          <div
            className={`flex border rounded-xl overflow-hidden p-0.5 text-xs font-mono ${
              theme === "dark"
                ? "border-[#222634] bg-[#0e1017]"
                : "border-slate-300 bg-slate-100"
            }`}
          >
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-label="Switch to English"
              className={`px-2.5 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-[#d4ff33] text-black font-black shadow-md"
                  : theme === "dark"
                  ? "text-[#8c93a8] hover:text-white"
                  : "text-slate-600 hover:text-black"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("bn")}
              aria-label="Switch to Bengali"
              className={`px-2.5 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                lang === "bn"
                  ? "bg-[#d4ff33] text-black font-black shadow-md"
                  : theme === "dark"
                  ? "text-[#8c93a8] hover:text-white"
                  : "text-slate-600 hover:text-black"
              }`}
            >
              বাং
            </button>
          </div>

          {/* Admin Studio Link */}
          <Link
            href="/admin"
            title={lang === "bn" ? "অ্যাডমিন স্টুডিও" : "Admin Studio"}
            aria-label="Admin Studio"
            className={`p-2 rounded-xl border transition-all ${
              theme === "dark"
                ? "border-[#222634] text-[#8c93a8] hover:text-[#d4ff33] hover:border-[#d4ff33] bg-[#0e1017]"
                : "border-slate-300 text-slate-600 hover:text-black hover:border-black bg-slate-100"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
