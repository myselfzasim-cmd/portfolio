"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { GalleryItem } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Camera,
  Tag,
  Maximize2,
  Layers,
} from "lucide-react";

interface Props {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}

export default function GalleryLightbox({
  item,
  isOpen,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}: Props) {
  const { lang } = useLanguage();

  // Keyboard navigation (Arrow keys + ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !item) return null;

  const title = lang === "bn" && item.titleBn ? item.titleBn : item.title;
  const description =
    lang === "bn" && item.descriptionBn ? item.descriptionBn : item.description;
  const location = lang === "bn" && item.locationBn ? item.locationBn : item.location;

  return (
    <div className="fixed inset-0 z-[130] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 select-none animate-fadeIn">
      {/* Top Controls */}
      <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#1b2030] text-[#d4ff33] border border-[#2b3348] font-bold">
            {currentIndex + 1} / {totalCount}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-white truncate max-w-[220px] sm:max-w-md font-sans">
            {title}
          </h2>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage with Next/Prev Buttons */}
      <div className="relative flex-1 flex items-center justify-center my-3 overflow-hidden">
        {/* Prev Button */}
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-[#d4ff33] text-white hover:text-black border border-white/20 transition-all cursor-pointer shadow-xl backdrop-blur-md"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* The Image */}
        <div className="relative w-full h-full max-h-[70vh] flex items-center justify-center p-2">
          <Image
            src={item.imageUrl}
            alt={title}
            fill
            className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]"
            priority
          />
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-[#d4ff33] text-white hover:text-black border border-white/20 transition-all cursor-pointer shadow-xl backdrop-blur-md"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Metadata Drawer */}
      <div className="bg-[#0e121c]/90 border border-white/10 rounded-2xl p-4 sm:p-5 max-w-4xl mx-auto w-full text-[#f3f4f8] shadow-2xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-1.5 flex-1">
            <h3 className="text-base font-bold text-white font-sans">{title}</h3>
            <p className={`text-xs sm:text-sm text-[#cbd5e1] leading-relaxed ${lang === "bn" ? "font-kalpurush" : "font-sans"}`}>
              {description}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-col items-start gap-2 text-xs font-mono shrink-0">
            {item.location && (
              <span className="flex items-center gap-1.5 text-[#38bdf8] font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#ef4444] shrink-0" />
                <span>{location}</span>
              </span>
            )}
            {item.date && (
              <span className="flex items-center gap-1.5 text-[#8c93a8]">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>{item.date}</span>
              </span>
            )}
            {item.gearOrProcess && (
              <span className="flex items-center gap-1.5 text-[#d4ff33] text-[11px] font-sans">
                <Camera className="w-3.5 h-3.5 shrink-0" />
                <span>{item.gearOrProcess}</span>
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
            <Tag className="w-3 h-3 text-[#8c93a8]" />
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-[#161b26] border border-[#2b3348] text-[#94a3b8]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}