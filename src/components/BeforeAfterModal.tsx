"use client";

import { useState } from "react";
import Image from "next/image";
import { X, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
  beforeImage?: string;
  afterImage: string;
}

export default function BeforeAfterModal({
  isOpen,
  onClose,
  projectTitle,
  beforeImage,
  afterImage,
}: Props) {
  const { lang } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50);

  if (!isOpen) return null;

  // Fallback demo before image if project doesn't have an old one
  const beforeImg = beforeImage || "/assets/img/placeholder-work-02.svg";
  const afterImg = afterImage || "/assets/img/placeholder-work-01.svg";

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#10121a] border border-[#2b3145] max-w-4xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c202c] bg-[#141724]">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="w-5 h-5 text-[#38bdf8]" />
            <span className="font-mono text-xs uppercase font-extrabold text-[#f3f4f8] tracking-wider">
              {lang === "bn" ? "রি-ব্র্যান্ডিং তুলনা" : "Rebrand Comparison"} · {projectTitle}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#1f2438] rounded-lg transition-colors text-[#8c93a8] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Body */}
        <div className="relative w-full h-[420px] sm:h-[500px] bg-[#090a0f] select-none overflow-hidden">
          {/* AFTER Image (Full background) */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative w-full h-full">
              <Image
                src={afterImg}
                alt="New Redesign"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
            <div className="absolute top-4 right-4 bg-[#d4ff33] text-black font-mono text-[10px] font-black uppercase px-3 py-1 rounded-full border border-black z-10 shadow-lg">
              {lang === "bn" ? "নতুন আধুনিক রি-ডিজাইন (আফটার)" : "New Modern Redesign (After)"}
            </div>
          </div>

          {/* BEFORE Image (Clipped overlay) */}
          <div
            className="absolute inset-0 flex items-center justify-center p-6 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <div className="relative w-full h-full bg-[#0d0e14]">
              <Image
                src={beforeImg}
                alt="Old Packaging"
                fill
                className="object-contain opacity-75 grayscale"
              />
            </div>
            <div className="absolute top-4 left-4 bg-black/90 text-white font-mono text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-white/20 z-10 shadow-lg">
              {lang === "bn" ? "পূর্ববর্তী প্যাকেজিং (বিফোর)" : "Previous Market Pack (Before)"}
            </div>
          </div>

          {/* Draggable Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#d4ff33] shadow-[0_0_15px_rgba(212,255,51,0.8)] pointer-events-none z-20"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#d4ff33] text-black border-2 border-black flex items-center justify-center shadow-xl font-mono text-xs font-black">
              ↔
            </div>
          </div>

          {/* Invisible Range Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
        </div>

        {/* Bottom Instruction Bar */}
        <div className="px-6 py-3.5 border-t border-[#1c202c] bg-[#0c0e15] flex items-center justify-between font-mono text-xs text-[#8c93a8]">
          <span>
            {lang === "bn"
              ? "স্লাইডারটি ডানে বা বামে টেনে টাইপোগ্রাফি ও শেল্ফ ভিজ্যুয়াল তুলনা করুন"
              : "Drag slider left / right to inspect typography contrast and shelf hierarchy"}
          </span>
          <button
            onClick={onClose}
            className="text-[#d4ff33] font-bold hover:underline"
          >
            {lang === "bn" ? "ভিউয়ার বন্ধ করুন" : "Close Viewer"}
          </button>
        </div>
      </div>
    </div>
  );
}
