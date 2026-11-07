"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { X, MessageCircle } from "lucide-react";

// Client's verified WhatsApp number: 01723005886 -> 8801723005886
const DEFAULT_WHATSAPP_NUMBER = "8801723005886";

export default function FloatingWhatsApp() {
  const { lang } = useLanguage();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rawNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
  const cleanNumber = rawNumber.replace(/[^0-9]/g, "");

  const greetingMessage =
    lang === "bn"
      ? "হ্যালো! আমি আপনার পোর্টফোলিও ওয়েবসাইট দেখে নক দিচ্ছি। প্যাকেজিং ডিজাইন প্রজেক্ট নিয়ে কথা বলতে চাই।"
      : "Hello! I saw your packaging design portfolio and would like to discuss a project with you.";

  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    greetingMessage
  )}`;

  return (
    <aside
      aria-label="WhatsApp Contact"
      className="fixed z-[99999] flex flex-col items-end pointer-events-auto no-print select-none transition-all duration-300"
      style={{
        bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
        right: "calc(1rem + env(safe-area-inset-right, 0px))",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Popup Speech Bubble (Always visible on mobile, expandable on desktop) */}
      {!isDismissed && (
        <div className="mb-2.5 flex items-center shadow-2xl animate-bounce-subtle">
          <div className="relative flex items-center gap-2 pl-3.5 pr-2 py-1.5 rounded-full bg-[#0a0c12]/95 border border-[#25D366]/60 text-[#f3f4f8] backdrop-blur-xl shadow-[0_8px_30px_rgba(37,211,102,0.35)]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-kalpurush font-bold text-xs tracking-wide group cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
              </span>
              <span className="text-white group-hover:text-[#25D366] transition-colors whitespace-nowrap">
                {lang === "bn" ? "হোয়াটসঅ্যাপে কথা বলুন" : "Chat on WhatsApp"}
              </span>
            </a>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              title={lang === "bn" ? "বন্ধ করুন" : "Dismiss"}
              className="p-1 rounded-full text-[#8c93a8] hover:text-white hover:bg-white/10 transition-colors ml-0.5"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Downward tiny speech bubble tail */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#0a0c12]/95 border-r border-b border-[#25D366]/60 rotate-45 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Main WhatsApp Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={lang === "bn" ? "WhatsApp এ কথা বলুন (+880 1723-005886)" : "Chat on WhatsApp (+880 1723-005886)"}
        aria-label={lang === "bn" ? "হোয়াটসঅ্যাপে যোগাযোগ করুন" : "Contact on WhatsApp"}
        className="flex items-center group cursor-pointer"
      >
        {/* Desktop Slide-out text label when hovering the circle */}
        <div
          className={`hidden md:flex overflow-hidden transition-all duration-300 ease-out items-center ${
            isHovered
              ? "max-w-[220px] opacity-100 mr-2.5 translate-x-0"
              : "max-w-0 opacity-0 mr-0 translate-x-3 pointer-events-none"
          }`}
        >
          <span className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#0a0c12]/95 border border-[#25D366]/60 text-[#f3f4f8] shadow-2xl font-kalpurush font-bold text-xs tracking-wide shadow-[0_4px_20px_rgba(37,211,102,0.3)] flex items-center gap-2 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] shrink-0" />
            <span className="group-hover:text-[#25D366] transition-colors">
              {lang === "bn" ? "+880 1723-005886 (সরাসরি)" : "Direct WhatsApp"}
            </span>
          </span>
        </div>

        {/* Circular WhatsApp Button with Pulse Wave */}
        <div className="relative w-13 h-13 sm:w-15 sm:h-15 rounded-full flex items-center justify-center bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-[0_6px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_35px_rgba(37,211,102,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 shrink-0 border border-white/25">
          {/* Breathing halo animation */}
          <span className="absolute -inset-1.5 rounded-full bg-[#25D366] animate-gentle-breathe pointer-events-none" />

          {/* Glowing Ping Ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

          {/* Official WhatsApp SVG Icon */}
          <svg
            viewBox="0 0 24 24"
            className="w-7 h-7 sm:w-8 sm:h-8 fill-current drop-shadow-md group-hover:rotate-6 transition-transform duration-300 relative z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.414z" />
          </svg>
        </div>
      </a>
    </aside>
  );
}
