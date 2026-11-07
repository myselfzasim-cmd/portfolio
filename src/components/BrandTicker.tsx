"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandRecommendation } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";
import BrandRecommendationModal from "./BrandRecommendationModal";
import { ArrowRight, Sparkles } from "lucide-react";

interface Props {
  initialBrands?: BrandRecommendation[];
}

export default function BrandTicker({ initialBrands }: Props) {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [brands, setBrands] = useState<BrandRecommendation[]>(initialBrands || []);
  const [selectedBrand, setSelectedBrand] = useState<BrandRecommendation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!initialBrands || initialBrands.length === 0) {
      fetch("/api/brands")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setBrands(data);
        })
        .catch((err) => console.error("Error loading brands:", err));
    }
  }, [initialBrands]);

  if (!brands || brands.length === 0) return null;

  const handleBrandClick = (brand: BrandRecommendation) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  // Top featured brands for fast 60fps ticker
  const displayBrands = useMemo(() => {
    const feat = brands.filter((b) => b.featured);
    return feat.length >= 10 ? feat : brands.slice(0, 30);
  }, [brands]);

  const marqueeItems = useMemo(() => [...displayBrands, ...displayBrands], [displayBrands]);

  return (
    <>
      <section
        aria-label={lang === "bn" ? "ব্র্যান্ড পার্টনারশিপ ও ক্লায়েন্ট লোগো" : "Brand Partnerships & Client Logos"}
        className={`relative w-full border-b select-none z-30 transition-colors duration-300 ${
          isDark ? "bg-[#0a0c12] border-[#1a1f2e]" : "bg-slate-100 border-slate-200"
        }`}
      >
        {/* Ticker Top Header Bar with Direct Link to /brands */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 pb-1 flex items-center justify-between text-xs font-mono gap-2">
          <div
            className={`flex items-center gap-1.5 sm:gap-2 truncate ${
              isDark ? "text-[#9aa3bc]" : "text-slate-600"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4ff33] shrink-0" />
            <span className={`font-semibold truncate ${isDark ? "text-white" : "text-slate-900"}`}>
              {lang === "bn" ? "৩৩০+ ব্র্যান্ডস" : "330+ Brands"}
              <span className="hidden sm:inline"> {lang === "bn" ? "শীর্ষ কমার্শিয়াল" : "Commercial Packs"}</span>
            </span>
            <span className="hidden sm:inline opacity-40">·</span>
            <span className="hidden md:inline opacity-70">
              {lang === "bn" ? "PRAN-RFL ও বহুজাতিক পার্টনারস" : "PRAN-RFL Group & Global Clients"}
            </span>
          </div>

          <Link
            href="/brands"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#d4ff33] text-[#0a0c12] hover:bg-[#bceb23] font-sans font-bold text-[11px] sm:text-xs transition-all shadow-sm hover:shadow-[#d4ff33]/20 shrink-0"
          >
            <span>{lang === "bn" ? "সকল ব্র্যান্ডস" : "All Brands"}</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </Link>
        </div>

        {/* Marquee Track Container with subtle fade edges */}
        <div className="relative w-full py-2.5 overflow-hidden group">
          {/* Left subtle gradient mask */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r to-transparent z-10 pointer-events-none ${
              isDark ? "from-[#0a0c12]" : "from-slate-100"
            }`}
          />
          {/* Right subtle gradient mask */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l to-transparent z-10 pointer-events-none ${
              isDark ? "from-[#0a0c12]" : "from-slate-100"
            }`}
          />

          {/* Infinite Marquee Track - ONLY CLEAN LOGOS */}
          <div className="animate-marquee flex items-center gap-3 sm:gap-4 px-2">
            {marqueeItems.map((brand, idx) => {
              const brandName = lang === "bn" && brand.nameBn ? brand.nameBn : brand.name;

              return (
                <button
                  key={`${brand.id}-${idx}`}
                  type="button"
                  onClick={() => handleBrandClick(brand)}
                  title={brandName}
                  className={`group/item flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2 rounded-xl border transition-all duration-300 shrink-0 cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                    isDark
                      ? "bg-[#11141e] hover:bg-[#161a29] border-[#202538] hover:border-[#d4ff33] hover:shadow-[#d4ff33]/10"
                      : "bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-600 hover:shadow-slate-300"
                  }`}
                >
                  {/* Brand Logo Only */}
                  <div className="w-20 h-10 sm:w-24 sm:h-11 flex items-center justify-center overflow-hidden">
                    <Image
                      src={brand.logo}
                      alt={brandName}
                      width={96}
                      height={44}
                      className="object-contain max-h-full max-w-full drop-shadow-sm group-hover/item:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Recommendation Modal */}
      <BrandRecommendationModal
        brand={selectedBrand}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
