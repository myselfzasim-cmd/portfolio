"use client";

import { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import PackInteractiveSlider from "./PackInteractiveSlider";
import CountryFlag from "./CountryFlag";
import {
  ArrowUpRight,
  FileText,
  SlidersHorizontal,
  Sparkles,
  Layers,
  ChevronDown,
} from "lucide-react";

interface Props {
  project: Project;
  index: number;
  onOpenBeforeAfter: (project: Project) => void;
  onOpenEstimator: () => void;
}

export default function ProjectSplitCard({
  project,
  index,
  onOpenBeforeAfter,
  onOpenEstimator,
}: Props) {
  const { lang } = useLanguage();
  const [isSpecsExpanded, setIsSpecsExpanded] = useState(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(false);

  const title = lang === "bn" && project.bn?.title ? project.bn.title : project.en.title;
  const summary = lang === "bn" && project.bn?.summary ? project.bn.summary : project.en.summary;

  const getCategoryLabel = (cat: string) => {
    if (lang === "bn") {
      switch (cat.toLowerCase()) {
        case "beverage can":
          return "বেভারেজ ক্যান";
        case "beverage label":
          return "বেভারেজ লেবেল";
        case "food packaging":
          return "ফুড প্যাকেজিং";
        case "rigid box & sachet":
          return "রিজিড বক্স ও স্যাচেট";
        case "cosmetics":
        case "cosmetics & personal care":
        case "personal care":
          return "পার্সোনাল কেয়ার";
        default:
          return cat;
      }
    }
    return cat;
  };

  const handlePrintPdf = () => {
    window.open(`/project/${project.id}?print=true`, "_blank");
  };

  // Resolve country code, flag and market label
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
  const marketLabel = lang === "bn"
    ? (isLocal ? "লোকাল ডিজাইন (বাংলাদেশ)" : `এক্সপোর্ট ডিজাইন · ${project.targetMarketBn || project.exportRegion || "আন্তর্জাতিক"}`)
    : (isLocal ? "Local Design (Bangladesh)" : `Export Design · ${project.targetMarket || project.exportRegion || "International"}`);

  // Alternating alignment:
  // Project 1 (index 0): Image on LEFT (lg:order-1), Text on RIGHT (lg:order-2)
  // Project 2 (index 1): Image on RIGHT (lg:order-2), Text on LEFT (lg:order-1)
  // Project 3 (index 2): Image on LEFT, Text on RIGHT... alternating zig-zag
  const isImageLeft = index % 2 === 0;

  // Distinct subtle background color themes for each project card (~15-20% soft shade)
  const CARD_THEMES = [
    // 0: Amber / Honey Gold (Warm Citrus, Spices)
    {
      tint: "bg-amber-500/[0.08]",
      glow: "from-amber-500/[0.18] via-amber-500/[0.04] to-transparent",
      border: "border-amber-500/30 hover:border-amber-500/50",
    },
    // 1: Sky / Ocean Blue (Beverage Can, Cold Energy)
    {
      tint: "bg-sky-500/[0.08]",
      glow: "from-sky-500/[0.18] via-sky-500/[0.04] to-transparent",
      border: "border-sky-500/30 hover:border-sky-500/50",
    },
    // 2: Royal Rose / Crimson (Heritage Cartons, Luxury Gift)
    {
      tint: "bg-rose-500/[0.08]",
      glow: "from-rose-500/[0.18] via-rose-500/[0.04] to-transparent",
      border: "border-rose-500/30 hover:border-rose-500/50",
    },
    // 3: Fresh Emerald / Mint (Agro Food, Snacks, Tea)
    {
      tint: "bg-emerald-500/[0.08]",
      glow: "from-emerald-500/[0.18] via-emerald-500/[0.04] to-transparent",
      border: "border-emerald-500/30 hover:border-emerald-500/50",
    },
    // 4: Royal Purple / Violet (Confectionery, Chocolates)
    {
      tint: "bg-purple-500/[0.08]",
      glow: "from-purple-500/[0.18] via-purple-500/[0.04] to-transparent",
      border: "border-purple-500/30 hover:border-purple-500/50",
    },
    // 5: Teal / Marine (Personal Care, Cosmetics)
    {
      tint: "bg-teal-500/[0.08]",
      glow: "from-teal-500/[0.18] via-teal-500/[0.04] to-transparent",
      border: "border-teal-500/30 hover:border-teal-500/50",
    },
  ];

  const cardTheme = CARD_THEMES[index % CARD_THEMES.length];

  return (
    <article
      className={`relative bg-[#10121a] ${cardTheme.border} rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group`}
    >
      {/* 20% Ambient Color Shade Tint Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none ${cardTheme.tint} transition-colors duration-300`}
        aria-hidden="true"
      />
      {/* Ambient corner light gradient glow */}
      <div
        className={`absolute -top-20 ${
          isImageLeft ? "-right-20" : "-left-20"
        } w-96 h-96 pointer-events-none bg-gradient-to-br ${
          cardTheme.glow
        } blur-3xl opacity-70`}
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-stretch p-3.5 sm:p-5 lg:p-6">
        {/* =========================================================
            COLUMN 1: IMAGE SHOWCASE (Alternating Left / Right)
            Stretches from top edge to bottom edge to match Column 2
            ========================================================= */}
        <div
          className={`lg:col-span-7 flex flex-col h-full min-h-[300px] ${
            isImageLeft ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <PackInteractiveSlider project={project} />
        </div>

        {/* =========================================================
            COLUMN 2: DETAILS & SPECIFICATIONS MATRIX (Alternating Right / Left)
            Compact, balanced, perfectly fits without any scrolling
            ========================================================= */}
        <div
          className={`lg:col-span-5 flex flex-col justify-center space-y-2.5 sm:space-y-3 h-full ${
            isImageLeft ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {/* 1. Market Origin Tag Bar */}
          <div className="flex items-center justify-between pb-2 border-b border-[#1c202c]">
            <span
              className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full font-bold font-kalpurush shadow-xs border text-[11px] font-mono ${
                isLocal
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-blue-500/10 text-blue-400 border-blue-500/30"
              }`}
            >
              <CountryFlag country={countryCode} className="w-5 h-3.5" />
              <span>{marketLabel}</span>
            </span>

            {project.marketStatus && (
              <span className="text-[#38bdf8] text-[10px] font-mono uppercase font-bold hidden sm:inline-flex items-center gap-1 font-kalpurush">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse" />
                <span>{lang === "bn" ? "প্রোডাকশন-রেডি" : "Production Locked"}</span>
              </span>
            )}
          </div>

          {/* 2. Product Title, Category/Year Tags, and Summary */}
          <div className="space-y-1.5 sm:space-y-2">
            {/* Main Title in Modern Stylish Bold Headline Display Typeface */}
            <h3 className="font-project-title font-headline text-lg sm:text-xl lg:text-[1.75rem] font-black text-[#f3f4f8] tracking-tight leading-[1.2]">
              <Link
                href={`/project/${project.id}`}
                className="font-project-title font-headline font-black hover:text-[#d4ff33] transition-colors"
              >
                {title}
              </Link>
            </h3>

            {/* Category & Year Tags placed cleanly directly below the main title */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
              <span className="px-2.5 py-0.5 rounded-md bg-[#141724] border border-[#222634] text-[#38bdf8] font-bold uppercase tracking-wider font-kalpurush flex items-center gap-1 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                <span>{getCategoryLabel(project.category)}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-[#141724] border border-[#222634] text-[#8c93a8] font-bold">
                {project.year}
              </span>
              <span className="text-[#8c93a8] text-[11px] font-kalpurush ml-1 hidden sm:inline">
                {lang === "bn" ? "ক্লায়েন্ট:" : "Client:"}{" "}
                <strong className="text-[#f3f4f8]">{project.bn?.client || project.en.client}</strong>
              </span>
            </div>

            <div className="space-y-1">
              <p
                className={`font-kalpurush text-xs sm:text-[13px] text-[#cbd5e1] leading-relaxed pt-0.5 ${
                  isSummaryExpanded ? "" : "line-clamp-2 sm:line-clamp-none"
                }`}
              >
                {summary}
              </p>
              {summary && summary.length > 90 && (
                <button
                  type="button"
                  onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
                  className="sm:hidden text-[10.5px] font-mono text-[#d4ff33] font-bold hover:underline font-kalpurush inline-block cursor-pointer"
                >
                  {isSummaryExpanded
                    ? (lang === "bn" ? "সংক্ষেপ করুন ▲" : "Show less ▲")
                    : (lang === "bn" ? "আরও পড়ুন ▼" : "Read more ▼")}
                </button>
              )}
            </div>
          </div>

          {/* 3. Detailed Pre-Press Dieline & Factory Technical Specifications Matrix (Expandable on Mobile) */}
          {project.dielineSpecs && (
            <div className="p-2 sm:p-3 bg-[#0b0d13] border border-[#1e2333] rounded-xl space-y-2 font-kalpurush transition-all">
              {/* Header / Expand Button */}
              <div
                onClick={() => setIsSpecsExpanded(!isSpecsExpanded)}
                className="flex items-center justify-between border-b border-[#1c202c] pb-1.5 font-mono text-[10px] cursor-pointer sm:cursor-default"
              >
                <span className="text-[#38bdf8] font-bold uppercase tracking-wider flex items-center gap-1.5 font-subheading">
                  <Layers className="w-3.5 h-3.5" />
                  <span>
                    {lang === "bn"
                      ? "প্রি-প্রেস ডাইলাইন ও টেকনিক্যাল স্পেক্স"
                      : "Dieline & Pre-Press Technical Specifications"}
                  </span>
                </span>

                {/* Mobile Expand / Collapse indicator */}
                <span className="sm:hidden flex items-center gap-1 text-[10px] text-[#d4ff33] font-bold">
                  <span>
                    {isSpecsExpanded
                      ? (lang === "bn" ? "সংক্ষেপ করুন" : "Hide")
                      : (lang === "bn" ? "স্পেক্স দেখুন" : "View")}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      isSpecsExpanded ? "rotate-180" : ""
                    }`}
                  />
                </span>

                <span className="text-[#8c93a8] hidden sm:inline text-[9.5px]">
                  {lang === "bn" ? "প্রোডাকশন-রেডি" : "Production Locked"}
                </span>
              </div>

              {/* Grid: Expandable on mobile, always grid on tablet/desktop */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs transition-all duration-300 ${
                  isSpecsExpanded ? "grid" : "hidden sm:grid"
                }`}
              >
                {/* 1. Format & Structure (Sky / Blue) */}
                <div className="p-2 sm:p-2.5 bg-blue-500/[0.14] hover:bg-blue-500/[0.20] border border-blue-500/30 rounded-lg space-y-0.5 transition-colors">
                  <span className="text-blue-500 block text-[9px] sm:text-[9.5px] font-mono uppercase font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{lang === "bn" ? "প্যাকেজিং ফরম্যাট ও টাইপ:" : "Packaging Format:"}</span>
                  </span>
                  <strong className="text-[#f3f4f8] block text-[11px] sm:text-xs font-semibold leading-tight truncate">
                    {lang === "bn" && project.dielineSpecs.typeBn
                      ? project.dielineSpecs.typeBn
                      : project.dielineSpecs.type || "প্যাকেজিং"}
                  </strong>
                </div>

                {/* 2. Measurements & Dimensions (Emerald / Mint) */}
                <div className="p-2 sm:p-2.5 bg-emerald-500/[0.14] hover:bg-emerald-500/[0.20] border border-emerald-500/30 rounded-lg space-y-0.5 transition-colors">
                  <span className="text-emerald-500 block text-[9px] sm:text-[9.5px] font-mono uppercase font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{lang === "bn" ? "মেজারমেন্ট ও সাইজ ডাইমেনশন:" : "Die-Cut Dimensions:"}</span>
                  </span>
                  <strong className="text-[#f3f4f8] block text-[11px] sm:text-xs font-mono font-bold leading-tight truncate">
                    {lang === "bn" && project.dielineSpecs.dimensionsBn
                      ? project.dielineSpecs.dimensionsBn
                      : project.dielineSpecs.dimensions || "স্ট্যান্ডার্ড ডাইলাইন"}
                  </strong>
                </div>

                {/* 3. Substrate & Material (Amber / Honey Gold) */}
                <div className="p-2 sm:p-2.5 bg-amber-500/[0.14] hover:bg-amber-500/[0.20] border border-amber-500/30 rounded-lg space-y-0.5 transition-colors">
                  <span className="text-amber-500 block text-[9px] sm:text-[9.5px] font-mono uppercase font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    <span>{lang === "bn" ? "সাবস্ট্রেট ও উপাদান:" : "Substrate & Material:"}</span>
                  </span>
                  <strong className="text-[#f3f4f8] block text-[11px] sm:text-xs font-medium leading-tight truncate">
                    {lang === "bn" && project.dielineSpecs.materialBn
                      ? project.dielineSpecs.materialBn
                      : project.dielineSpecs.material || "BOPP Film"}
                  </strong>
                </div>

                {/* 4. Print Process & Colors (Purple / Violet) */}
                <div className="p-2 sm:p-2.5 bg-purple-500/[0.14] hover:bg-purple-500/[0.20] border border-purple-500/30 rounded-lg space-y-0.5 transition-colors">
                  <span className="text-purple-500 block text-[9px] sm:text-[9.5px] font-mono uppercase font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                    <span>{lang === "bn" ? "প্রিন্টিং টেকনোলজি ও কালার:" : "Print Process & Colors:"}</span>
                  </span>
                  <strong className="text-[#f3f4f8] block text-[11px] sm:text-xs font-medium leading-tight truncate">
                    {lang === "bn" && project.dielineSpecs.printProcessBn
                      ? project.dielineSpecs.printProcessBn
                      : project.dielineSpecs.printProcess || "Rotogravure"}
                  </strong>
                </div>

                {/* 5. Special Finishing (Foil, UV, Embossing, Matte) - Full Width (Rose / Ruby) */}
                {project.dielineSpecs.specialFinishing && (
                  <div className="sm:col-span-2 p-2 sm:p-2.5 bg-rose-500/[0.14] hover:bg-rose-500/[0.20] border border-rose-500/35 rounded-lg space-y-0.5 transition-colors">
                    <span className="text-rose-500 block text-[9px] sm:text-[9.5px] font-mono uppercase font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-rose-500 shrink-0" />
                      <span>
                        {lang === "bn" ? "স্পেশাল ফিনিশিং ও ফয়েল/ইউভি:" : "Special Finishing & Effects:"}
                      </span>
                    </span>
                    <strong className="text-[#f3f4f8] block text-[11px] sm:text-xs font-semibold leading-tight">
                      {lang === "bn" && project.dielineSpecs.specialFinishingBn
                        ? project.dielineSpecs.specialFinishingBn
                        : project.dielineSpecs.specialFinishing}
                    </strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Bar - Snug directly below specs, no empty gap */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#1c202c] font-mono text-xs font-kalpurush">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenBeforeAfter(project)}
                className="px-2.5 py-1.5 rounded-lg border border-[#2b3145] bg-[#141724] text-[#f3f4f8] hover:border-[#d4ff33] hover:text-[#d4ff33] transition-all flex items-center gap-1.5 font-bold text-[11px] cursor-pointer"
                title={lang === "bn" ? "আগের প্যাকেজিংয়ের সাথে তুলনা" : "Compare with previous packaging"}
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#3b82f6]" />
                <span>{lang === "bn" ? "বিফোর / আফটার" : "Before / After"}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintPdf}
                className="px-2.5 py-1.5 rounded-lg border border-[#2b3145] bg-[#141724] text-[#f3f4f8] hover:border-white transition-all flex items-center gap-1.5 font-bold text-[11px] cursor-pointer"
                title={lang === "bn" ? "১-পৃষ্ঠার এক্সিকিউটিভ শিট ডাউনলোড" : "Download executive 1-page PDF spec sheet"}
              >
                <FileText className="w-3.5 h-3.5 text-[#8c93a8]" />
                <span>{lang === "bn" ? "১-পৃষ্ঠার PDF শিট" : "1-Page PDF"}</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenEstimator}
                className="text-[#8c93a8] hover:text-[#d4ff33] transition-colors text-[11px] font-semibold flex items-center gap-1 cursor-pointer hidden sm:flex"
              >
                <Sparkles className="w-3 h-3 text-[#d4ff33]" />
                <span>{lang === "bn" ? "অনুরূপ ইনকোয়ারি" : "Inquire Pack"}</span>
              </button>

              <Link
                href={`/project/${project.id}`}
                className="px-3.5 py-1.5 bg-[#d4ff33] text-black hover:bg-white transition-all rounded-lg flex items-center gap-1 font-black text-xs uppercase tracking-wider shadow-md shadow-[#d4ff33]/15 font-kalpurush cursor-pointer"
              >
                <span>{lang === "bn" ? "কেস স্টাডি" : "Full Story"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
