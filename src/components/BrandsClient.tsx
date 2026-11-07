"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandRecommendation } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";
import BrandRecommendationModal from "@/components/BrandRecommendationModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Shuffle,
  Search,
  Sparkles,
  ArrowLeft,
  Layers,
  X,
} from "lucide-react";

interface Props {
  initialBrands: BrandRecommendation[];
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function BrandsClient({ initialBrands }: Props) {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const [brands, setBrands] = useState<BrandRecommendation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<BrandRecommendation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // Initialize with randomly shuffled list of all 300+ brands on mount
  useEffect(() => {
    if (initialBrands && initialBrands.length > 0) {
      setBrands(shuffleArray(initialBrands));
    }
  }, [initialBrands]);

  // Handle re-shuffle
  const handleShuffle = () => {
    setIsShuffling(true);
    setBrands((prev) => shuffleArray(prev));
    setTimeout(() => setIsShuffling(false), 500);
  };

  const handleBrandClick = (b: BrandRecommendation) => {
    setSelectedBrand(b);
    setIsModalOpen(true);
  };

  // Filter by search query if user wants to find a specific brand
  const displayedBrands = useMemo(() => {
    if (!searchTerm.trim()) return brands;
    const q = searchTerm.toLowerCase().trim();
    return brands.filter((b) => {
      const name = (lang === "bn" && b.nameBn ? b.nameBn : b.name).toLowerCase();
      const enName = b.name.toLowerCase();
      const parent = (b.parentCompany || "").toLowerCase();
      const cat = (b.category + " " + (b.categoryBn || "")).toLowerCase();
      return name.includes(q) || enName.includes(q) || parent.includes(q) || cat.includes(q);
    });
  }, [brands, searchTerm, lang]);

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 selection:bg-[#d4ff33] selection:text-black ${
        isDark ? "bg-[#07090e] text-[#f3f4f8]" : "bg-[#f8fafc] text-[#0f172a]"
      }`}
    >
      {/* 1. Global Consistent Header */}
      <Navbar />

      {/* 2. Hero Header Banner */}
      <section
        className={`relative pt-10 pb-8 border-b transition-colors duration-300 ${
          isDark
            ? "border-[#171b26] bg-gradient-to-b from-[#0b0e17] via-[#07090e] to-[#07090e]"
            : "border-slate-200 bg-gradient-to-b from-white via-[#f8fafc] to-[#f8fafc]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top back button and count badge */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className={`inline-flex items-center gap-2 text-xs font-mono py-1.5 px-3.5 rounded-xl border transition-all ${
                isDark
                  ? "text-[#8f96ab] hover:text-[#d4ff33] bg-white/5 border-white/10 hover:border-[#d4ff33]/40"
                  : "text-slate-600 hover:text-black bg-white border-slate-200 hover:border-slate-400 shadow-sm"
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{lang === "bn" ? "পোর্টফোলিওতে ফিরুন" : "Back to Home"}</span>
            </Link>

            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-bold ${
                isDark
                  ? "bg-[#d4ff33]/10 border-[#d4ff33]/30 text-[#d4ff33]"
                  : "bg-emerald-50 border-emerald-300 text-emerald-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {lang === "bn"
                  ? `${brands.length} টি বাণিজ্যিক ব্র্যান্ডের লোগো`
                  : `${brands.length} Commercial Brand Logos`}
              </span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-sans">
              {lang === "bn" ? (
                <>
                  হাজারো ব্র্যান্ডের সাথে{" "}
                  <span className="text-[#d4ff33] underline decoration-[#d4ff33]/40 underline-offset-8">
                    প্যাকেজিং যাত্রা
                  </span>
                </>
              ) : (
                <>
                  Commercial Packaging &amp;{" "}
                  <span className="text-[#d4ff33] underline decoration-[#d4ff33]/40 underline-offset-8">
                    Brand Logos
                  </span>
                </>
              )}
            </h1>

            <p
              className={`text-sm sm:text-base font-sans leading-relaxed ${
                isDark ? "text-[#94a3b8]" : "text-slate-600"
              }`}
            >
              {lang === "bn"
                ? "প্রাণ-আরএফএল গ্রুপ ও আন্তর্জাতিক কনগ্লোমারেটের শত শত পণ্যের বাণিজ্যিক ব্র্যান্ড লোগো কালেকশন। যেকোনো লোগোতে ক্লিক করে বিস্তারিত কোম্পানি ও প্যাকেজিং স্পেক্স দেখুন।"
                : "A showcase of commercial brand logos engineered for PRAN-RFL Group, FMCG consumer brands, and global corporate partners. Click on any logo to view dieline specifications and company details."}
            </p>
          </div>

          {/* Search Bar & Randomize Control Strip */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${
                  isDark ? "text-[#6b7280]" : "text-slate-400"
                }`}
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  lang === "bn" ? "ব্র্যান্ডের নাম খুঁজুন..." : "Search brands by name..."
                }
                className={`w-full pl-10 pr-9 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                  isDark
                    ? "bg-[#0f131f] border-[#22283a] text-white placeholder-[#64748b] focus:border-[#d4ff33]"
                    : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-600 shadow-sm"
                }`}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md ${
                    isDark ? "text-slate-400 hover:text-white" : "text-slate-400 hover:text-black"
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Randomize / Shuffle Button */}
            <div className="flex items-center gap-3">
              <span
                className={`text-xs font-mono hidden sm:inline-block ${
                  isDark ? "text-[#8c94a9]" : "text-slate-500"
                }`}
              >
                {lang === "bn"
                  ? `${displayedBrands.length} টি লোগো প্রদর্শিত`
                  : `Showing ${displayedBrands.length} Logos`}
              </span>

              <button
                type="button"
                onClick={handleShuffle}
                title={lang === "bn" ? "র্যান্ডম সাজান" : "Shuffle Logos"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4ff33] text-black font-sans font-bold text-xs hover:bg-[#bceb23] active:scale-95 transition-all shadow-md shadow-[#d4ff33]/20 cursor-pointer"
              >
                <Shuffle
                  className={`w-4 h-4 transition-transform duration-500 ${
                    isShuffling ? "rotate-180" : ""
                  }`}
                />
                <span>{lang === "bn" ? "র্যান্ডম সাজান (Shuffle)" : "Randomize Order"}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PURE LOGO SHOWCASE GRID - NO TEXT, NO S少CTOR TABS, ONLY LOGOS */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {displayedBrands.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <div
              className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto ${
                isDark ? "bg-white/5 border-white/10 text-slate-400" : "bg-slate-100 border-slate-300 text-slate-500"
              }`}
            >
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold">
              {lang === "bn" ? "কোন লোগো খুঁজে পাওয়া যায়নি" : "No brands matched your search"}
            </h3>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-2 px-4 py-2 rounded-lg bg-[#d4ff33] text-black text-xs font-mono font-bold"
            >
              {lang === "bn" ? "সব লোগো দেখুন" : "Show All Logos"}
            </button>
          </div>
        ) : (
          /* Responsive 2 to 6 Column Pure Logo Tile Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {displayedBrands.map((brand, idx) => {
              const brandName = lang === "bn" && brand.nameBn ? brand.nameBn : brand.name;

              return (
                <button
                  key={`${brand.id}-${idx}`}
                  type="button"
                  onClick={() => handleBrandClick(brand)}
                  title={brandName}
                  className={`group relative flex items-center justify-center p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer aspect-[4/3] sm:aspect-square overflow-hidden transform hover:-translate-y-1.5 ${
                    isDark
                      ? "bg-[#0e121c] hover:bg-[#151b2a] border-[#1c2234] hover:border-[#d4ff33] shadow-md hover:shadow-xl hover:shadow-[#d4ff33]/15"
                      : "bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-600 shadow-sm hover:shadow-xl hover:shadow-slate-300/60"
                  }`}
                >
                  {/* Subtle inner container for maximum logo contrast */}
                  <div
                    className={`w-full h-full rounded-xl flex items-center justify-center p-2.5 transition-all duration-300 ${
                      isDark
                        ? "bg-[#080a10] group-hover:bg-[#07080d] border border-white/5 group-hover:border-[#d4ff33]/30"
                        : "bg-[#f8fafc] group-hover:bg-white border border-slate-100 group-hover:border-slate-200"
                    }`}
                  >
                    <Image
                      src={brand.logo}
                      alt={brandName}
                      width={180}
                      height={120}
                      className="object-contain max-h-full max-w-full drop-shadow-sm group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>

                  {/* Sleek subtle hover click indicator */}
                  <div className="absolute inset-x-0 bottom-0 py-1 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] font-mono text-[#d4ff33] font-bold">
                      {lang === "bn" ? "বিস্তারিত দেখুন" : "View Details"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>

      {/* 4. Interactive Details & Recommendation Modal (Opens on Click) */}
      <BrandRecommendationModal
        brand={selectedBrand}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 5. Global Consistent Footer */}
      <Footer />
    </div>
  );
}
