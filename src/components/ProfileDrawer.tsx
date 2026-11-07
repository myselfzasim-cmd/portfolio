"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Layers,
  Globe,
  Download,
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: Props) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"bio" | "contact" | "terms" | "privacy">("bio");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-[#10121a] border border-[#2b3145] max-w-2xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c202c] bg-[#141724]">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase font-extrabold text-[#f3f4f8] tracking-wider font-kalpurush">
            <User className="w-4 h-4 text-[#d4ff33]" />
            <span>{lang === "bn" ? "ডিজাইনার প্রোফাইল ও বায়োডাটা" : "Designer Profile & Bio-Data"}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-[#1f2438] rounded-xl transition-colors text-[#8c93a8] hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* 1. HERO IDENTITY CARD */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 bg-[#0b0d13] border border-[#1e2333] rounded-2xl relative overflow-hidden">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#d4ff33]/40 shrink-0 shadow-xl bg-black">
              <Image
                src="/assets/img/headshot.jpg"
                alt="Zasim Uddin"
                fill
                className="object-cover"
              />
            </div>

            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d4ff33]/10 border border-[#d4ff33]/30 text-[#d4ff33] font-mono text-[10px] font-bold uppercase tracking-wider font-kalpurush">
                <span>{lang === "bn" ? "স্টুডিওতে সক্রিয়" : "In Studio"}</span>
              </div>
              <h3 className="font-heading font-headline text-2xl font-black text-[#f3f4f8]">
                {lang === "bn" ? "জসিম উদ্দিন" : "Zasim Uddin"}
              </h3>
              <p className="font-kalpurush text-xs sm:text-sm text-[#cbd5e1] font-semibold">
                {lang === "bn"
                  ? "সিনিয়র প্যাকেজিং ডিজাইনার · এসসিটি ডিজাইন হাউস · প্রাণ-আরএফএল গ্রুপ"
                  : "Senior Packaging Designer · SCT Design House · PRAN-RFL Group"}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs text-[#8c93a8] font-mono font-kalpurush">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{lang === "bn" ? "ঢাকা, বাংলাদেশ" : "Dhaka, Bangladesh"}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>{lang === "bn" ? "৮+ বছর এফএমসিজি প্রি-প্রেস" : "8+ Years FMCG Pre-Press"}</span>
                </span>
              </div>
            </div>
          </div>

          {/* 2. TAB NAVIGATION */}
          <div className="flex items-center gap-1.5 border-b border-[#1c202c] pb-2 font-mono text-xs overflow-x-auto scrollbar-none font-kalpurush">
            <button
              type="button"
              onClick={() => setActiveTab("bio")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === "bio"
                  ? "bg-[#d4ff33] text-black shadow-md font-black"
                  : "text-[#8c93a8] hover:text-white"
              }`}
            >
              {lang === "bn" ? "বায়োডাটা ও অভিজ্ঞতা" : "Bio & Career"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("contact")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === "contact"
                  ? "bg-[#d4ff33] text-black shadow-md font-black"
                  : "text-[#8c93a8] hover:text-white"
              }`}
            >
              {lang === "bn" ? "যোগাযোগের ঠিকানা" : "Contact Address"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("terms")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === "terms"
                  ? "bg-[#d4ff33] text-black shadow-md font-black"
                  : "text-[#8c93a8] hover:text-white"
              }`}
            >
              {lang === "bn" ? "টার্মস অ্যান্ড কন্ডিশনস" : "Terms & Conditions"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("privacy")}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === "privacy"
                  ? "bg-[#d4ff33] text-black shadow-md font-black"
                  : "text-[#8c93a8] hover:text-white"
              }`}
            >
              {lang === "bn" ? "প্রাইভেসি পলিসি" : "Privacy Policy"}
            </button>
          </div>

          {/* 3. TAB CONTENT */}
          {activeTab === "bio" && (
            <div className="space-y-4 font-kalpurush animate-fadeIn">
              <div className="p-4 bg-[#0b0d13] border border-[#1e2333] rounded-2xl space-y-2">
                <span className="font-mono text-[10px] text-[#38bdf8] font-bold uppercase tracking-wider block font-subheading">
                  {lang === "bn" ? "প্রফেশনাল সামারি ও দর্শন" : "Professional Summary"}
                </span>
                <p className="text-sm text-[#cbd5e1] leading-relaxed">
                  {lang === "bn"
                    ? "প্রাণ-আরএফএল গ্রুপের ফুড ও বেভারেজ সেক্টরে বিগত কয়েক বছর ধরে লিড প্যাকেজিং ডিজাইনার হিসেবে দায়িত্ব পালন করছি। আমার কাজের মূল লক্ষ্য হলো সুপারমার্কেটের তাকে মাত্র ৩ সেকেন্ডের মধ্যে ক্রেতার দৃষ্টি আকর্ষণ করা এবং সেই সাথে ফ্যাক্টরি লাইনে প্রতি মিনিটে ১৬০ মিটার গতির রোটোগ্র্যাভিউর ও ফ্লেক্সো প্রেসে শতভাগ ত্রুটিহীন প্রিন্ট নিশ্চিত করা।"
                    : "Serving as Lead Packaging Designer across food and beverage sectors at PRAN-RFL Group. Specializing in high-impact shelf visual identity that wins consumer attention in under 3 seconds while engineering zero-defect CAD dielines for 160m/min rotogravure presses."}
                </p>
              </div>

              {/* Core Strengths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#0a0b10] border border-[#1e2333] rounded-xl space-y-1">
                  <span className="text-[#d4ff33] font-bold flex items-center gap-1.5 font-subheading">
                    <Layers className="w-3.5 h-3.5 shrink-0" />
                    <span>{lang === "bn" ? "ডাইলাইন ও প্রি-প্রেস" : "Dieline & Pre-Press"}</span>
                  </span>
                  <span className="text-[#8c93a8] block">
                    {lang === "bn"
                      ? "VFFS পাউচ, বোতল স্লিভ, ডুপ্লেক্স কার্টন ও টিন ক্যান ডাইলাইন আর্কিটেকচার।"
                      : "VFFS pouches, shrink sleeves, duplex cartons, and tin can dielines."}
                  </span>
                </div>
                <div className="p-3 bg-[#0a0b10] border border-[#1e2333] rounded-xl space-y-1">
                  <span className="text-[#38bdf8] font-bold flex items-center gap-1.5 font-subheading">
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span>{lang === "bn" ? "এক্সপোর্ট কমপ্লায়েন্স" : "Export Compliance"}</span>
                  </span>
                  <span className="text-[#8c93a8] block">
                    {lang === "bn"
                      ? "১৪০+ দেশের ইউএস FDA, বিএসটিআই ও জিসিসি অ্যারাবিক নিউট্রিশন প্যানেল।"
                      : "140+ countries: US FDA, BSTI, and GCC Arabic regulatory labeling."}
                  </span>
                </div>
              </div>

              {/* CV Print / Spec Sheet Trigger */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#171a25] hover:bg-[#d4ff33] text-[#f3f4f8] hover:text-black border border-[#2b3145] hover:border-[#d4ff33] rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer font-mono font-kalpurush shadow-md"
                >
                  <Download className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>{lang === "bn" ? "বায়োডাটা ও স্পেক শিট প্রিন্ট" : "Print Bio-Data & Specs"}</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-4 font-kalpurush animate-fadeIn">
              <div className="p-5 bg-[#0b0d13] border border-[#1e2333] rounded-2xl space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#d4ff33] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[#8c93a8] text-[10px] block uppercase font-mono font-bold">
                      {lang === "bn" ? "অফিসের ঠিকানা:" : "Studio Address:"}
                    </span>
                    <strong className="text-[#f3f4f8] block mt-0.5">
                      {lang === "bn"
                        ? "এসসিটি ডিজাইন হাউস, প্রাণ-আরএফএল সেন্টার, ১০৫ মধ্য বাড্ডা, প্রগতি সরণি, ঢাকা-১২১২, বাংলাদেশ।"
                        : "SCT Design House, PRAN-RFL Centre, 105 Middle Badda, Pragati Sarani, Dhaka-1212, Bangladesh."}
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#1a1e2b]">
                  <Mail className="w-4 h-4 text-[#38bdf8] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[#8c93a8] text-[10px] block uppercase font-mono font-bold">
                      {lang === "bn" ? "অফিসিয়াল ইমেইল:" : "Official Work Email:"}
                    </span>
                    <a
                      href="mailto:zasim.packaging@pranrflgroup.com"
                      className="text-[#38bdf8] hover:underline block mt-0.5 font-mono"
                    >
                      zasim.packaging@pranrflgroup.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#1a1e2b]">
                  <Phone className="w-4 h-4 text-[#4ade80] mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[#8c93a8] text-[10px] block uppercase font-mono font-bold">
                      {lang === "bn" ? "হোয়াটসঅ্যাপ ও সরাসরি ফোন:" : "Direct Phone & WhatsApp:"}
                    </span>
                    <a
                      href="https://wa.me/8801723005886"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#4ade80] hover:underline block mt-0.5 font-mono"
                    >
                      +880 1723-005886 (WhatsApp)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "terms" && (
            <div className="space-y-3 font-kalpurush text-xs sm:text-sm text-[#cbd5e1] leading-relaxed animate-fadeIn">
              <div className="p-4 bg-[#0b0d13] border border-[#1e2333] rounded-2xl space-y-2">
                <strong className="text-[#f3f4f8] block font-heading">
                  {lang === "bn" ? "০১. প্রি-প্রেস আর্টওয়ার্ক ও ডাইলাইন পলিসি" : "01. Pre-Press Artwork & Dielines"}
                </strong>
                <p>
                  {lang === "bn"
                    ? "ফ্যাক্টরি প্রিন্টিং শুরু করার পূর্বে সিলিন্ডার/প্লেট মেকার ও প্রিন্টিং ইঞ্জিনিয়ার দ্বারা ডাইলাইনের মেজারমেন্ট ও ট্র্যাপিং শতভাগ ভেরিফাই করা বাধ্যতামূলক।"
                    : "Prior to cylinder engraving or plate production, technical tolerances and eye-mark sensor contrast must be physically signed off by factory engineers."}
                </p>
              </div>

              <div className="p-4 bg-[#0b0d13] border border-[#1e2333] rounded-2xl space-y-2">
                <strong className="text-[#f3f4f8] block font-heading">
                  {lang === "bn" ? "০২. কালার ও সাবস্ট্রেট অনুমোদন" : "02. Color Matching & Substrate Proof"}
                </strong>
                <p>
                  {lang === "bn"
                    ? "কম্পিউটার স্ক্রিন (RGB) এবং আসল প্রিন্ট (CMYK + Pantone) সাবস্ট্রেটের উপাদানের ওপর নির্ভর করে সামান্য ভিন্ন হতে পারে। মেটালিক ফিল্ম বা ক্রাফট পেপারের জন্য প্রেস প্রুফিং প্রযোজ্য।"
                    : "Digital monitors (RGB) vary from rotogravure film outputs (CMYK + Pantone). Physical press finger-printing is standard practice for color accuracy."}
                </p>
              </div>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="space-y-3 font-kalpurush text-xs sm:text-sm text-[#cbd5e1] leading-relaxed animate-fadeIn">
              <div className="p-4 bg-[#0b0d13] border border-[#1e2333] rounded-2xl space-y-2">
                <strong className="text-[#f3f4f8] block font-heading">
                  {lang === "bn" ? "০১. করপোরেট এনডিএ ও গোপনীয়তা" : "01. Corporate NDA & Confidentiality"}
                </strong>
                <p>
                  {lang === "bn"
                    ? "প্রাণ-আরএফএল গ্রুপ ও অন্যান্য ক্লায়েন্টের যেসকল পণ্য এখনও বাজারে আসেনি বা লঞ্চ প্রক্রিয়ায় রয়েছে, সেগুলোর ডিজাইন ও ডাইলাইন শতভাগ গোপন রাখা হয়।"
                    : "Unreleased brand launches, recipe codes, and unpublished dielines remain under strict non-disclosure compliance until commercial shelf appearance."}
                </p>
              </div>

              <div className="p-4 bg-[#0b0d13] border border-[#1e2333] rounded-2xl space-y-2">
                <strong className="text-[#f3f4f8] block font-heading">
                  {lang === "bn" ? "০২. ইন্টেলেকচুয়াল প্রপার্টি ও কপিরাইট" : "02. Intellectual Property Rights"}
                </strong>
                <p>
                  {lang === "bn"
                    ? "চূড়ান্ত প্যাকেজিং আর্টওয়ার্কের সকল ট্রেডমার্ক ও বাণিজ্যিক অধিকার সংশ্লিষ্ট ব্র্যান্ড ও প্রতিষ্ঠানের অনুকূলে সংরক্ষিত থাকবে।"
                    : "All registered trademarks, barcodes, and final commercial packaging assets remain the sole property of the commissioning FMCG brand."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#1c202c] bg-[#0c0e15] flex items-center justify-between font-mono text-[11px] text-[#8c93a8] font-kalpurush">
          <span>
            {lang === "bn"
              ? "© জসিম উদ্দিন · এসসিটি ডিজাইন হাউস"
              : "© Zasim Uddin · SCT Design House"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#d4ff33] hover:underline font-bold cursor-pointer"
          >
            {lang === "bn" ? "বন্ধ করুন" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
