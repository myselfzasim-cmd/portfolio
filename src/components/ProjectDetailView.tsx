"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { useTheme } from "@/lib/ThemeContext";
import JourneyViewer from "@/components/JourneyViewer";
import PackagingEstimator from "@/components/PackagingEstimator";
import ProfileDrawer from "@/components/ProfileDrawer";
import CountryFlag from "@/components/CountryFlag";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  CheckCircle2,
  FileText,
  Globe,
  Home,
  Moon,
  Printer,
  ShoppingBag,
  Sparkles,
  Sun,
  Layers,
  ChevronRight,
  ChevronDown,
  Languages,
} from "lucide-react";

interface Props {
  project: Project;
  nextProject: Project | null;
}

export default function ProjectDetailView({ project, nextProject }: Props) {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  // Auto trigger print if ?print=true in query
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("print") === "true") {
        setTimeout(() => {
          window.print();
        }, 600);
      }
    }
  }, []);

  const title = lang === "bn" && project.bn?.title ? project.bn.title : project.en.title;
  const client = lang === "bn" && project.bn?.client ? project.bn.client : project.en.client;
  const summary = lang === "bn" && project.bn?.summary ? project.bn.summary : project.en.summary;

  const brief = lang === "bn" && project.bn?.brief ? project.bn.brief : project.en.brief;
  const problem = lang === "bn" && project.bn?.problem ? project.bn.problem : project.en.problem;
  const production = lang === "bn" && project.bn?.production ? project.bn.production : project.en.production;
  const result = lang === "bn" && project.bn?.result ? project.bn.result : project.en.result;

  const nextTitle =
    nextProject && (lang === "bn" && nextProject.bn?.title ? nextProject.bn.title : nextProject.en.title);

  const isLocal = project.originType === "local" || (!project.originType && project.exportRegion?.toLowerCase().includes("bangladesh"));
  const getCountryCode = (): string => {
    if (isLocal) return "BD";
    const flagVal = project.countryFlag || "";
    if (flagVal === "🇲🇾" || flagVal.toUpperCase() === "MY") return "MY";
    if (flagVal === "🇦🇪" || flagVal.toUpperCase() === "AE") return "AE";
    if (flagVal === "🇬🇧" || flagVal.toUpperCase() === "GB") return "GB";
    if (flagVal === "🇧🇩" || flagVal.toUpperCase() === "BD") return "BD";
    if (flagVal === "🇺🇸" || flagVal.toUpperCase() === "US") return "US";
    if (flagVal === "🇮🇳" || flagVal.toUpperCase() === "IN") return "IN";

    const region = (project.targetMarket || project.exportRegion || "").toLowerCase();
    if (region.includes("malaysia")) return "MY";
    if (region.includes("gcc") || region.includes("middle east") || region.includes("arab") || region.includes("uae")) return "AE";
    if (region.includes("uk") || region.includes("britain") || region.includes("kingdom")) return "GB";
    if (region.includes("bangladesh")) return "BD";
    if (region.includes("usa") || region.includes("america")) return "US";
    if (region.includes("india")) return "IN";

    return "GLOBAL";
  };
  const countryCode = getCountryCode();

  return (
    <div className="min-h-screen flex flex-col bg-[#08090c] text-[#f3f4f8] selection:bg-[#d4ff33] selection:text-black">
      {/* 1. PERMANENTLY FROZEN TOP BAR (Visual Icons on Mobile, Labels on Desktop) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090c]/90 backdrop-blur-xl border-b border-[#1f2433] px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between shadow-2xl shadow-black/80 no-print">
        {/* Brand Lockup: Far Left with Home Button & ThirstyPoet Signature */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href="/"
            title={lang === "bn" ? "হোম পেজে ফিরুন · ThirstyPoet" : "Return to Home · ThirstyPoet"}
            className="flex items-center gap-2 sm:gap-2.5 group cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#111] via-[#1e2333] to-[#d4ff33] p-[1.5px] shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full bg-[#08090c] flex items-center justify-center text-[#d4ff33] group-hover:bg-[#d4ff33] group-hover:text-black transition-colors">
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <span className="font-handwriting text-lg sm:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff33] via-[#f1f5f9] to-[#38bdf8] leading-none">
              ThirstyPoet
            </span>
          </Link>
        </div>

        {/* Right controls: Visual Icons on Mobile */}
        <div className="flex items-center gap-1 sm:gap-2.5 font-mono text-xs shrink-0">
          {/* Brands Tab Link */}
          <Link
            href="/brands"
            title={lang === "bn" ? "৩৩০+ কমার্শিয়াল ব্র্যান্ডস" : "330+ Commercial Brands"}
            aria-label="Brands"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-[#2b3145] bg-[#141724] text-[#f3f4f8] hover:border-[#d4ff33] hover:text-[#d4ff33] transition-all text-[11px] font-mono font-bold shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4 text-[#d4ff33]" />
            <span className="hidden md:inline">{lang === "bn" ? "ব্র্যান্ডসমূহ" : "Brands"}</span>
          </Link>

          {/* Photo Gallery Tab */}
          <Link
            href="/gallery"
            title={lang === "bn" ? "ফটো গ্যালারি ও কাজের মুহূর্ত" : "View Photo Gallery & Archive"}
            aria-label="Photo Gallery"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-[#2b3145] bg-[#141724] text-[#f3f4f8] hover:border-[#38bdf8] hover:text-[#38bdf8] transition-all text-[11px] font-mono font-bold shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Camera className="w-4 h-4 text-[#38bdf8]" />
            <span className="hidden md:inline">{lang === "bn" ? "ফটো গ্যালারি" : "Photo Gallery"}</span>
          </Link>

          {/* Print PDF Spec Sheet (Icon on Mobile, Label on Desktop) */}
          <button
            type="button"
            onClick={() => window.print()}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-[#2b3145] bg-[#141724] text-[#f3f4f8] hover:border-white transition-all text-[11px] font-mono font-bold font-kalpurush shadow-md cursor-pointer flex items-center gap-1.5"
            title={lang === "bn" ? "প্রিন্ট বা PDF হিসেবে সংরক্ষণ" : "Print or save as PDF"}
            aria-label="Print PDF"
          >
            <Printer className="w-4 h-4 text-[#38bdf8]" />
            <span className="hidden sm:inline">{lang === "bn" ? "PDF স্পেক" : "PDF Spec"}</span>
          </button>

          {/* Quick Quote Button */}
          <button
            type="button"
            onClick={() => setIsEstimatorOpen(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#1d2232] text-[#d4ff33] border border-[#d4ff33]/30 hover:border-[#d4ff33] transition-all text-[11px] font-mono font-bold font-kalpurush cursor-pointer flex items-center gap-1.5"
            title={lang === "bn" ? "প্রজেক্ট কোটেশন" : "Quote"}
            aria-label="Quote"
          >
            <Sparkles className="w-4 h-4 text-[#d4ff33]" />
            <span className="hidden md:inline">{lang === "bn" ? "কোটেশন" : "Quote"}</span>
          </button>

          {/* Day / Night Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title={
              theme === "dark"
                ? (lang === "bn" ? "লাইট / ডে মোড" : "Day Mode")
                : (lang === "bn" ? "ডার্ক / নাইট মোড" : "Night Mode")
            }
            aria-label="Toggle Theme"
            className="p-2 border border-[#222634] hover:border-[#d4ff33] bg-[#0e1017] text-[#8c93a8] hover:text-[#d4ff33] rounded-xl transition-all cursor-pointer shadow-inner flex items-center justify-center shrink-0"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#fbbf24] hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-[#38bdf8] hover:-rotate-45 transition-transform" />
            )}
          </button>

          {/* Language Switcher: Mobile Single Tap, Desktop Segmented */}
          <button
            type="button"
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            title={lang === "bn" ? "Switch to English" : "বাংলা ভাষায় পরিবর্তন করুন"}
            aria-label="Toggle Language"
            className="sm:hidden p-1.5 px-2 rounded-xl border border-[#222634] bg-[#0e1017] hover:border-[#d4ff33] text-[#d4ff33] font-bold text-[10px] flex items-center gap-1 cursor-pointer font-mono shadow-inner shrink-0"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{lang === "bn" ? "বাং" : "EN"}</span>
          </button>

          <div className="hidden sm:flex items-center bg-[#0e1017] border border-[#222634] rounded-xl p-0.5 font-mono text-xs shadow-inner shrink-0">
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-label="Switch to English"
              className={`px-2.5 sm:px-3 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-[#d4ff33] text-black shadow-md font-black"
                  : "text-[#8c93a8] hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("bn")}
              aria-label="বাংলা ভাষায় রূপান্তর করুন"
              className={`px-2.5 sm:px-3 py-1 font-bold rounded-lg transition-all font-kalpurush cursor-pointer ${
                lang === "bn"
                  ? "bg-[#d4ff33] text-black shadow-md font-black"
                  : "text-[#8c93a8] hover:text-white"
              }`}
            >
              বাং
            </button>
          </div>

          {/* Designer Profile Avatar Trigger */}
          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            title={lang === "bn" ? "ডিজাইনার প্রোফাইল ও বায়োডাটা" : "Designer Profile & Bio-Data"}
            aria-label="Designer Profile"
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-[#d4ff33]/50 hover:border-[#d4ff33] p-[1px] transition-all hover:scale-105 cursor-pointer shadow-lg shadow-[#d4ff33]/15 group shrink-0"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
              <Image
                src="/assets/img/headshot.jpg"
                alt="Zasim Uddin"
                fill
                className="object-cover"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Spacer for fixed top header */}
      <div className="h-16 w-full shrink-0 no-print" />

      {/* 2. MAIN CONTENT BODY */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 flex-grow">
        {/* Project Header Box */}
        <section className="bg-[#10121a] border border-[#222634] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#d4ff33]/5 via-[#38bdf8]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Meta Badges */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] mb-4">
            <span className="bg-black/80 text-[#d4ff33] border border-[#d4ff33]/30 px-3 py-1 rounded-full uppercase font-bold">
              {project.category}
            </span>
            {project.marketStatus && (
              <span className="bg-[#d4ff33]/15 text-[#d4ff33] border border-[#d4ff33]/40 px-3 py-1 rounded-full font-bold uppercase flex items-center gap-1.5 font-kalpurush">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff33] animate-pulse" />
                <span>{lang === "bn" ? "বাজারে অ্যাভেইলেবল" : "Available in Market"}</span>
              </span>
            )}
            {/* Origin Badge with Real SVG Flag */}
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold font-kalpurush border shadow-xs ${
                isLocal
                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                  : "bg-[#3b82f6]/15 text-[#60a5fa] border-[#3b82f6]/40"
              }`}
            >
              <CountryFlag country={countryCode} className="w-5 h-3.5" />
              <span>
                {isLocal
                  ? (lang === "bn" ? "লোকাল ডিজাইন (বাংলাদেশ)" : "Local Design (Bangladesh)")
                  : (lang === "bn"
                      ? `এক্সপোর্ট ডিজাইন · ${project.targetMarketBn || project.exportRegion || "আন্তর্জাতিক"}`
                      : `Export Design · ${project.targetMarket || project.exportRegion || "International"}`)}
              </span>
            </span>
            <span className="text-[#8c93a8] ml-auto font-mono text-xs hidden sm:inline font-kalpurush">
              {lang === "bn" ? "ক্লায়েন্ট: " : "Client: "}
              <strong className="text-[#f3f4f8]">{client || "PRAN-RFL Group"}</strong> · {project.year}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading font-headline font-project-title text-3xl sm:text-5xl font-black text-white leading-[1.15] tracking-tight">
            {title}
          </h1>

          {/* Summary Paragraph */}
          <p className="mt-4 font-kalpurush text-base sm:text-lg text-[#cbd5e1] leading-relaxed max-w-4xl">
            {summary}
          </p>

          {/* Factory Pre-Press & Dieline Specifications Bar with Distinct 20% Color Shading */}
          <div className="mt-6 pt-5 border-t border-[#1e2333] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3 bg-blue-500/[0.14] border border-blue-500/30 rounded-xl font-kalpurush">
              <span className="text-blue-500 block uppercase text-[10px] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                <span>{lang === "bn" ? "প্যাকেজিং ফরম্যাট:" : "Packaging Format:"}</span>
              </span>
              <strong className="text-[#f3f4f8] block mt-1 text-sm font-mono truncate">
                {lang === "bn" && project.dielineSpecs?.typeBn ? project.dielineSpecs.typeBn : project.dielineSpecs?.type || "Stand-Up Pouch"}
              </strong>
            </div>

            <div className="p-3 bg-amber-500/[0.14] border border-amber-500/30 rounded-xl font-kalpurush">
              <span className="text-amber-500 block uppercase text-[10px] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>{lang === "bn" ? "সাবস্ট্রেট / ফিল্ম:" : "Substrate / Film:"}</span>
              </span>
              <span className="text-[#f3f4f8] block mt-1 text-sm font-mono truncate">
                {lang === "bn" && project.dielineSpecs?.materialBn ? project.dielineSpecs.materialBn : project.dielineSpecs?.material || "Multi-Layer BOPP"}
              </span>
            </div>

            <div className="p-3 bg-purple-500/[0.14] border border-purple-500/30 rounded-xl font-kalpurush">
              <span className="text-purple-500 block uppercase text-[10px] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                <span>{lang === "bn" ? "প্রিন্টিং মেথড:" : "Printing Process:"}</span>
              </span>
              <span className="text-[#f3f4f8] block mt-1 text-sm font-mono truncate">
                {lang === "bn" && project.dielineSpecs?.printProcessBn ? project.dielineSpecs.printProcessBn : project.dielineSpecs?.printProcess || "Rotogravure 8-Color"}
              </span>
            </div>

            <div className="p-3 bg-rose-500/[0.14] border border-rose-500/35 rounded-xl font-kalpurush">
              <span className="text-rose-500 block uppercase text-[10px] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>{lang === "bn" ? "স্পেশাল ফিনিশিং:" : "Special Lacquer:"}</span>
              </span>
              <span className="text-[#f3f4f8] block mt-1 text-sm font-mono truncate">
                {lang === "bn" && project.dielineSpecs?.specialFinishingBn ? project.dielineSpecs.specialFinishingBn : project.dielineSpecs?.specialFinishing || "Spot UV / Matte"}
              </span>
            </div>
          </div>
        </section>

        {/* 3. FIVE-PHASE INTERACTIVE PACKAGING JOURNEY */}
        <div className="my-8">
          <JourneyViewer
            journeyEn={project.journey?.en || []}
            journeyBn={project.journey?.bn || []}
          />
        </div>

        {/* 4. TECHNICAL ARCHITECTURE & COMMERCIAL CASE STUDY (2x2 Grid) */}
        <section className="bg-[#10121a] border border-[#222634] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[#1c202c]">
            <h3 className="font-heading text-lg sm:text-xl font-extrabold text-[#f3f4f8] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#d4ff33]" />
              <span>
                {lang === "bn"
                  ? "টেকনিক্যাল আর্কিটেকচার ও বাণিজ্যিক বিশ্লেষণ"
                  : "Technical Architecture & Commercial Case Rationale"}
              </span>
            </h3>
            <span className="font-mono text-[10px] text-[#8c93a8] uppercase hidden sm:inline">
              FMCG PRODUCTION DOSSIER
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* 01 Brief */}
            {brief && (
              <div
                onClick={() => setExpandedSection(expandedSection === 1 ? null : 1)}
                className="p-4 sm:p-5 bg-[#0b0d13] border border-[#1e2333] hover:border-[#38bdf8]/50 rounded-xl space-y-2 cursor-pointer md:cursor-default transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-black text-[#38bdf8] uppercase tracking-wider font-subheading">
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
                    <span>{lang === "bn" ? "০১ · ক্লায়েন্ট ব্রিফ ও লক্ষ্য" : "01 · The Client Brief"}</span>
                  </div>
                  <span className="md:hidden text-[#38bdf8]">
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedSection === 1 ? "rotate-180" : ""}`} />
                  </span>
                </div>
                <p className={`font-kalpurush text-[#cbd5e1] text-sm sm:text-base leading-relaxed ${expandedSection === 1 ? "block" : "hidden md:block line-clamp-2 md:line-clamp-none"}`}>
                  {brief}
                </p>
              </div>
            )}

            {/* 02 Problem */}
            {problem && (
              <div
                onClick={() => setExpandedSection(expandedSection === 2 ? null : 2)}
                className="p-4 sm:p-5 bg-[#0b0d13] border border-[#1e2333] hover:border-[#f87171]/50 rounded-xl space-y-2 cursor-pointer md:cursor-default transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-black text-[#f87171] uppercase tracking-wider font-subheading">
                    <span className="w-2 h-2 rounded-full bg-[#f87171]" />
                    <span>{lang === "bn" ? "০২ · সুপারমার্কেট চ্যালেঞ্জ ও প্রতিযোগিতা" : "02 · Shelf Challenge"}</span>
                  </div>
                  <span className="md:hidden text-[#f87171]">
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedSection === 2 ? "rotate-180" : ""}`} />
                  </span>
                </div>
                <p className={`font-kalpurush text-[#cbd5e1] text-sm sm:text-base leading-relaxed ${expandedSection === 2 ? "block" : "hidden md:block line-clamp-2 md:line-clamp-none"}`}>
                  {problem}
                </p>
              </div>
            )}

            {/* 03 Production */}
            {production && (
              <div
                onClick={() => setExpandedSection(expandedSection === 3 ? null : 3)}
                className="p-4 sm:p-5 bg-[#0b0d13] border border-[#1e2333] hover:border-[#fbbf24]/50 rounded-xl space-y-2 cursor-pointer md:cursor-default transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-black text-[#fbbf24] uppercase tracking-wider font-subheading">
                    <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
                    <span>{lang === "bn" ? "০৩ · ডাই-লাইন ও প্রি-প্রেস বাস্তবায়ন" : "03 · Dieline & Pre-Press"}</span>
                  </div>
                  <span className="md:hidden text-[#fbbf24]">
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedSection === 3 ? "rotate-180" : ""}`} />
                  </span>
                </div>
                <p className={`font-kalpurush text-[#cbd5e1] text-sm sm:text-base leading-relaxed ${expandedSection === 3 ? "block" : "hidden md:block line-clamp-2 md:line-clamp-none"}`}>
                  {production}
                </p>
              </div>
            )}

            {/* 04 Result */}
            {result && (
              <div
                onClick={() => setExpandedSection(expandedSection === 4 ? null : 4)}
                className="p-4 sm:p-5 bg-[#0b0d13] border border-[#1e2333] hover:border-[#4ade80]/50 rounded-xl space-y-2 cursor-pointer md:cursor-default transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-[11px] font-black text-[#4ade80] uppercase tracking-wider font-subheading">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
                    <span>{lang === "bn" ? "০৪ · বাণিজ্যিক ফলাফল ও সেলস গ্রোথ" : "04 · Commercial Market Result"}</span>
                  </div>
                  <span className="md:hidden text-[#4ade80]">
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${expandedSection === 4 ? "rotate-180" : ""}`} />
                  </span>
                </div>
                <p className={`font-kalpurush text-[#cbd5e1] text-sm sm:text-base leading-relaxed ${expandedSection === 4 ? "block" : "hidden md:block line-clamp-2 md:line-clamp-none"}`}>
                  {result}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 5. NEXT PACKAGING CASE TEASER */}
        {nextProject && (
          <div className="mt-10 p-5 sm:p-6 bg-[#10121a] border border-[#222634] hover:border-[#d4ff33] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all no-print group">
            <div>
              <span className="font-mono text-[10px] text-[#8c93a8] uppercase font-bold tracking-wider block mb-1 font-kalpurush">
                {lang === "bn" ? "পরবর্তী প্যাকেজিং প্রজেক্ট দেখুন:" : "Next Commercial Packaging Case:"}
              </span>
              <strong className="font-heading text-lg sm:text-2xl font-black text-white group-hover:text-[#d4ff33] transition-colors">
                {nextTitle}
              </strong>
              <span className="block font-mono text-xs text-[#8c93a8] mt-0.5">
                {nextProject.category} · {nextProject.year}
              </span>
            </div>

            <Link
              href={`/project/${nextProject.id}`}
              className="px-5 py-2.5 bg-[#d4ff33] text-black hover:bg-white transition-all font-mono text-xs font-black uppercase tracking-wider rounded-xl flex items-center gap-2 shrink-0 shadow-lg shadow-[#d4ff33]/15 font-kalpurush"
            >
              <span>{lang === "bn" ? "পরবর্তী কেস দেখুন" : "View Next Case"}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      {/* 6. SLIM FOOTER */}
      <footer className="bg-[#08090c] border-t border-[#1a1e2b] py-6 px-4 sm:px-8 font-mono text-xs text-[#8c93a8] no-print">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-kalpurush">
          <span>
            {lang === "bn"
              ? `© ${new Date().getFullYear()} জসিম উদ্দিন · সিনিয়র প্যাকেজিং ডিজাইনার · এসসিটি ডিজাইন হাউস · প্রাণ-আরএফএল গ্রুপ`
              : `© ${new Date().getFullYear()} Zasim Uddin · Senior Packaging Designer · SCT Design House · PRAN-RFL Group`}
          </span>
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:text-[#d4ff33] transition-colors">
              {lang === "bn" ? "হোম পেজ" : "Home"}
            </Link>
            <span>·</span>
            <Link href="/admin" className="hover:text-[#d4ff33] transition-colors">
              {lang === "bn" ? "স্টুডিও লগইন" : "Studio Admin"}
            </Link>
          </div>
        </div>
      </footer>

      {/* Estimator Inquiry Modal */}
      <PackagingEstimator
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
      />

      {/* Designer Profile & Bio Drawer */}
      <ProfileDrawer
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
}
