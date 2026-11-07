"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BrandRecommendation } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import BrandRecommendationModal from "./BrandRecommendationModal";


interface Props {
  initialBrands?: BrandRecommendation[];
}

export default function BrandTicker({ initialBrands }: Props) {
  const { lang } = useLanguage();
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

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...brands, ...brands];

  return (
    <>
      <section
        aria-label="Brand Partnerships & Recommendations"
        className="relative w-full bg-[#0a0c12] border-b border-[#1a1f2e] overflow-hidden select-none z-30"
      >
        {/* Marquee Track Container with subtle fade edges */}
        <div className="relative w-full py-2.5 overflow-hidden group">
          {/* Left subtle gradient mask */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#0a0c12] to-transparent z-10 pointer-events-none" />
          {/* Right subtle gradient mask */}
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#0a0c12] to-transparent z-10 pointer-events-none" />

          {/* Infinite Marquee Track */}
          <div className="animate-marquee flex items-center gap-3 sm:gap-4 px-2">
            {marqueeItems.map((brand, idx) => {
              const brandName = lang === "bn" && brand.nameBn ? brand.nameBn : brand.name;

              return (
                <button
                  key={`${brand.id}-${idx}`}
                  type="button"
                  onClick={() => handleBrandClick(brand)}
                  title={brandName}
                  className="group/item flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#11141e] hover:bg-[#161a29] border border-[#202538] hover:border-[#d4ff33] transition-all duration-300 shrink-0 cursor-pointer shadow-md hover:shadow-lg hover:shadow-[#d4ff33]/10 transform hover:-translate-y-0.5"
                >
                  {/* Brand Logo Only */}
                  <div className="w-20 h-10 sm:w-24 sm:h-12 flex items-center justify-center overflow-hidden">
                    <Image
                      src={brand.logo}
                      alt={brandName}
                      width={96}
                      height={48}
                      className="object-contain max-h-full max-w-full drop-shadow-sm group-hover/item:scale-110 transition-transform duration-300"
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