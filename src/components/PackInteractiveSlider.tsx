"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Project } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { Layers, ChevronRight, ChevronLeft } from "lucide-react";

interface Props {
  project: Project;
  onOpenBeforeAfter?: () => void;
}

export interface SlideItem {
  type: string;
  label: string;
  badge: string;
  color: string;
  imageUrl: string;
}

export default function PackInteractiveSlider({ project }: Props) {
  const { lang } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [lockedSlide, setLockedSlide] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Build the 4-phase packaging progression sequence
  const slides: SlideItem[] = [];

  // Step 1: In-Hand Market Reality (Default first image)
  const shelfStep = project.journey?.en?.find(
    (j) => j.type === "shelf" || j.id === "step-1"
  );
  const marketImg =
    shelfStep?.image || project.thumbnail || "/assets/img/frooto-market.jpg";
  slides.push({
    type: "market",
    label: lang === "bn" ? "০১ বাজারের পণ্য" : "01 In-Hand Market",
    badge: lang === "bn" ? "০১ · বাজারে অ্যাভেইলেবল" : "01 · Available in Market",
    color: "from-emerald-500/20 to-transparent text-emerald-400 border-emerald-500/40",
    imageUrl: marketImg,
  });

  // Step 2: Dieline CAD & Measurements
  const dielineStep = project.journey?.en?.find(
    (j) => j.type === "framework" || j.id === "step-2"
  );
  if (dielineStep?.image && dielineStep.image !== marketImg) {
    slides.push({
      type: "dieline",
      label: lang === "bn" ? "০২ ডাই-লাইন ব্লুপ্রিন্ট" : "02 Dieline CAD",
      badge: lang === "bn" ? "০২ · ডাইলাইন CAD" : "02 · Dieline CAD",
      color: "from-blue-500/20 to-transparent text-blue-400 border-blue-500/40",
      imageUrl: dielineStep.image,
    });
  }

  // Step 3: Flat Production Artwork
  const flatStep = project.journey?.en?.find(
    (j) => j.type === "design" || j.id === "step-3"
  );
  if (flatStep?.image && flatStep.image !== marketImg) {
    slides.push({
      type: "flat",
      label: lang === "bn" ? "০৩ ফ্ল্যাট আর্টওয়ার্ক" : "03 Flat Artboard",
      badge: lang === "bn" ? "০৩ · CMYK ফ্ল্যাট" : "03 · CMYK Flat",
      color: "from-amber-500/20 to-transparent text-amber-400 border-amber-500/40",
      imageUrl: flatStep.image,
    });
  }

  // Step 4: 3D Pack Render
  const renderStep = project.journey?.en?.find(
    (j) => j.type === "final" || j.id === "step-4"
  );
  const mockupImg = renderStep?.image || project.coverImage;
  if (mockupImg && mockupImg !== marketImg) {
    slides.push({
      type: "mockup",
      label: lang === "bn" ? "০৪ ৩ডি মকআপ" : "04 3D Pack Render",
      badge: lang === "bn" ? "০৪ · ৩ডি মকআপ" : "04 · 3D Mockup",
      color: "from-purple-500/20 to-transparent text-purple-400 border-purple-500/40",
      imageUrl: mockupImg,
    });
  }

  // Continuous auto-slide animation when not locked
  useEffect(() => {
    if (lockedSlide !== null || slides.length <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // 3s per slide

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [lockedSlide, slides.length]);

  const handlePillClick = (idx: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (lockedSlide === idx) {
      // Click again -> unlock! (auto-animation resumes)
      setLockedSlide(null);
    } else {
      // First click -> lock to this slide!
      setLockedSlide(idx);
      setActiveSlide(idx);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIdx = (activeSlide - 1 + slides.length) % slides.length;
    setActiveSlide(nextIdx);
    if (lockedSlide !== null) {
      setLockedSlide(nextIdx);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIdx = (activeSlide + 1) % slides.length;
    setActiveSlide(nextIdx);
    if (lockedSlide !== null) {
      setLockedSlide(nextIdx);
    }
  };

  const current = slides[activeSlide] || slides[0];

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[380px] bg-gradient-to-b from-[#11131a] to-[#0a0b0f] border border-[#232738] rounded-2xl overflow-hidden group select-none shadow-xl flex flex-col justify-center">
      {/* Main Image Viewport with smooth cross-fade */}
      <div className="relative w-full h-full flex-1 min-h-[280px] sm:min-h-[360px] flex items-center justify-center overflow-hidden">
        {current?.imageUrl ? (
          <div
            key={current.imageUrl}
            className="relative w-full h-full flex items-center justify-center animate-fadeIn"
          >
            <Image
              src={current.imageUrl}
              alt={current.label}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={`${
                current.type === "market"
                  ? "object-cover"
                  : "object-contain p-2 sm:p-4"
              } drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out`}
              priority={activeSlide === 0}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-[#555b70] font-mono text-xs">
            <Layers className="w-10 h-10 mb-2 opacity-40 text-[#8c93a8]" />
            <span>{lang === "bn" ? "ভিজ্যুয়াল প্রস্তুত হচ্ছে" : "Visual In Preparation"}</span>
          </div>
        )}
      </div>

      {/* Top Left Floating Pill Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-2 z-20 pointer-events-none">
        <span
          className={`font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-md bg-black/60 shadow-lg ${current.color}`}
        >
          {current.badge}
        </span>
      </div>

      {/* Manual Arrow Controls (visible on hover) */}
      {slides.length > 1 && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/75 hover:bg-[#d4ff33] text-white hover:text-black flex items-center justify-center border border-white/20 transition-all z-30 shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/75 hover:bg-[#d4ff33] text-white hover:text-black flex items-center justify-center border border-white/20 transition-all z-30 shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Step Pills */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-center z-20">
        <div className="bg-black/90 backdrop-blur-xl px-2.5 py-1 rounded-full border border-white/15 flex items-center gap-1.5 shadow-2xl max-w-full overflow-x-auto">
          {slides.map((s, idx) => {
            const isActive = idx === activeSlide;
            return (
              <button
                key={idx}
                onClick={(e) => handlePillClick(idx, e)}
                className={`font-mono text-[9.5px] px-2.5 py-0.5 rounded-full transition-all duration-300 flex items-center cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-[#d4ff33] text-black font-extrabold shadow-[0_0_12px_rgba(212,255,51,0.5)] scale-105"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
