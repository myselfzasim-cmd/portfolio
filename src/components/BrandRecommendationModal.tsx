"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { BrandRecommendation } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import {
  X,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Building2,
  CheckCircle2,
  ExternalLink,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface Props {
  brand: BrandRecommendation | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BrandRecommendationModal({ brand, isOpen, onClose }: Props) {
  const { lang } = useLanguage();

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !brand) return null;

  const brandName = lang === "bn" && brand.nameBn ? brand.nameBn : brand.name;
  const category = lang === "bn" && brand.categoryBn ? brand.categoryBn : brand.category;
  const managerName = lang === "bn" && brand.manager.nameBn ? brand.manager.nameBn : brand.manager.name;
  const managerDesignation =
    lang === "bn" && brand.manager.designationBn ? brand.manager.designationBn : brand.manager.designation;
  const managerDept =
    lang === "bn" && brand.manager.departmentBn ? brand.manager.departmentBn : brand.manager.department;
  const managerCompany =
    lang === "bn" && brand.manager.companyBn ? brand.manager.companyBn : brand.manager.company;
  const managerLocation =
    lang === "bn" && brand.manager.locationBn ? brand.manager.locationBn : brand.manager.location;
  const endorsementText = lang === "bn" ? brand.endorsement.bn : brand.endorsement.en;
  const highlightText =
    brand.projectHighlight ? (lang === "bn" ? brand.projectHighlight.bn : brand.projectHighlight.en) : null;

  const cleanPhone = brand.manager.phone.replace(/[^0-9+]/g, "");

  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn select-none">
      <div
        className="relative bg-[#0d1017] border border-[#262c3e] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col text-[#f3f4f8]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Accent Top Strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#d4ff33] via-[#38bdf8] to-[#ec4899]" />

        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#121622] border-b border-[#202636] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-black/60 border border-white/10 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
              <Image
                src={brand.logo}
                alt={brandName}
                width={80}
                height={40}
                className="object-contain max-h-full max-w-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-sans text-white tracking-tight">
                  {brandName}
                </h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{lang === "bn" ? "যাচাইকৃত ব্র্যান্ড" : "Verified Client"}</span>
                </span>
              </div>
              <p className="text-xs text-[#8c93a8] font-mono mt-0.5">
                {category} · {brand.parentCompany}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1b2030] hover:bg-[#252c42] text-[#8c93a8] hover:text-white transition-all cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Recommendation Quote Card */}
          <div className="relative p-5 rounded-xl bg-gradient-to-b from-[#141926] to-[#0e121c] border border-[#2b3348] shadow-inner space-y-3">
            <div className="flex items-center gap-2 text-[#d4ff33]">
              <Quote className="w-5 h-5 opacity-80 rotate-180" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold">
                {lang === "bn" ? "ব্র্যান্ড ম্যানেজারের অফিসিয়াল সুপারিশ ও মূল্যায়ন" : "Official Recommendation & Endorsement"}
              </span>
            </div>

            <p className={`text-sm sm:text-[15px] leading-relaxed text-[#d4daf0] italic ${lang === "bn" ? "font-kalpurush" : "font-sans"}`}>
              &ldquo;{endorsementText}&rdquo;
            </p>

            {highlightText && (
              <div className="pt-2 border-t border-[#1f2738] flex items-start gap-2 text-xs text-[#38bdf8] font-mono">
                <Sparkles className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#d4ff33]" />
                <span className={lang === "bn" ? "font-kalpurush" : "font-sans"}>
                  <strong className="text-white">{lang === "bn" ? "প্যাকেজিং অবদান: " : "Pack Deliverable: "}</strong>
                  {highlightText}
                </span>
              </div>
            )}
          </div>

          {/* Brand Manager & Verification Details */}
          <div className="rounded-xl bg-[#121622] border border-[#202636] p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c2233]">
              <span className="font-mono text-xs uppercase text-[#8c93a8] tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span>{lang === "bn" ? "রেফারেন্স ও ভেরিফিকেশন তথ্য" : "Direct Reference Verification"}</span>
              </span>
              {brand.yearWorked && (
                <span className="font-mono text-[11px] text-[#8c93a8] bg-[#0b0e14] px-2 py-0.5 rounded-md border border-[#1e2434]">
                  {brand.yearWorked}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              {/* Name & Title */}
              <div className="space-y-1">
                <span className="text-[10px] text-[#70788e] uppercase block">
                  {lang === "bn" ? "ব্র্যান্ড ম্যানেজার / পদবি" : "Manager & Role"}
                </span>
                <p className="text-sm font-bold text-white font-sans">{managerName}</p>
                <p className="text-[#a4acc4] text-[11px] font-sans">{managerDesignation}</p>
              </div>

              {/* Department & Company */}
              <div className="space-y-1">
                <span className="text-[10px] text-[#70788e] uppercase block">
                  {lang === "bn" ? "ডিপার্টমেন্ট ও প্রতিষ্ঠান" : "Department & Org"}
                </span>
                <p className="text-xs font-semibold text-[#38bdf8] flex items-center gap-1.5 font-sans">
                  <Briefcase className="w-3 h-3 shrink-0 text-[#8c93a8]" />
                  <span>{managerDept}</span>
                </p>
                <p className="text-[#a4acc4] text-[11px] flex items-center gap-1.5 font-sans">
                  <Building2 className="w-3 h-3 shrink-0 text-[#8c93a8]" />
                  <span>{managerCompany}</span>
                </p>
              </div>

              {/* Location */}
              <div className="space-y-1 sm:col-span-2 pt-2 border-t border-[#1c2233]/70">
                <span className="text-[10px] text-[#70788e] uppercase block">
                  {lang === "bn" ? "অফিসিয়াল ঠিকানা" : "Corporate Office"}
                </span>
                <p className="text-[#cbd5e1] text-xs flex items-center gap-1.5 font-sans">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-[#ef4444]" />
                  <span>{managerLocation}</span>
                </p>
              </div>
            </div>

            {/* Verification Actions: Call / Contact Buttons */}
            <div className="pt-3 border-t border-[#1c2233] flex flex-wrap items-center gap-2.5">
              {/* Phone call button */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex-1 min-w-[170px] inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-xs font-sans transition-all shadow-md shadow-blue-600/20 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>
                  {lang === "bn" ? "সরাসরি কল দিন: " : "Call Verify: "}
                  {brand.manager.phone}
                </span>
              </a>

              {/* WhatsApp direct verify */}
              <a
                href={`https://wa.me/${cleanPhone.replace("+", "")}?text=${encodeURIComponent(
                  lang === "bn"
                    ? `হ্যালো ${managerName}! আমি জসিম উদ্দিনের পোর্টফোলিও থেকে আপনার রেফারেন্স যাচাইয়ের জন্য যোগাযোগ করছি।`
                    : `Hello ${brand.manager.name}! I am reaching out to verify your packaging recommendation for Zasim Uddin.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#1ea952] text-black font-bold text-xs font-sans transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {/* Email */}
              {brand.manager.email && (
                <a
                  href={`mailto:${brand.manager.email}?subject=${encodeURIComponent(
                    "Packaging Design Verification Reference — Zasim Uddin"
                  )}`}
                  className="p-2 rounded-xl bg-[#1b2030] hover:bg-[#252c42] text-[#8c93a8] hover:text-white transition-all cursor-pointer"
                  title={brand.manager.email}
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#0b0e14] border-t border-[#1c2233] flex items-center justify-between text-xs text-[#70788e] font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>{lang === "bn" ? "১০০% ভেরিফাইড ক্লায়েন্ট রেফারেন্স" : "100% Verified Corporate Reference"}</span>
          </span>
          <button
            onClick={onClose}
            className="text-xs text-[#d4ff33] hover:underline font-bold font-sans cursor-pointer"
          >
            {lang === "bn" ? "বন্ধ করুন" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}