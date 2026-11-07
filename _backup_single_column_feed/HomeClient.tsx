"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import ProjectPostCard from "@/components/ProjectPostCard";
import ProjectGridTile from "@/components/ProjectGridTile";
import BeforeAfterModal from "@/components/BeforeAfterModal";
import PackagingEstimator from "@/components/PackagingEstimator";
import KnowledgeHub from "@/components/KnowledgeHub";
import {
  Calculator,
  Grid3X3,
  List,
  Lock,
  Search,
  Sparkles,
  ArrowDown,
  Quote,
  Factory,
  Globe2,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";

interface Props {
  initialProjects?: Project[];
}

export default function HomeClient({ initialProjects = [] }: Props) {
  const { lang, setLang } = useLanguage();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [loading, setLoading] = useState(initialProjects.length === 0);

  // View state: Feed vs Grid
  const [viewMode, setViewMode] = useState<"feed" | "grid">("feed");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [activeBeforeAfter, setActiveBeforeAfter] = useState<Project | null>(null);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects:", err);
        setLoading(false);
      });
  }, []);

  const categories = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const getCategoryLabel = (cat: string) => {
    if (cat === "all") return lang === "bn" ? "সব প্রজেক্ট" : "All Projects";
    if (lang === "bn") {
      switch (cat.toLowerCase()) {
        case "beverage":
          return "বেভারেজ";
        case "snacks":
          return "স্ন্যাকস";
        case "spice":
          return "মসলা / স্পাইস";
        case "cosmetics":
        case "personal care":
          return "পার্সোনাল কেয়ার";
        default:
          return cat;
      }
    }
    return cat;
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();

    const titleEn = p.en?.title?.toLowerCase() || "";
    const titleBn = p.bn?.title?.toLowerCase() || "";
    const clientEn = p.en?.client?.toLowerCase() || "";
    const clientBn = p.bn?.client?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    return (
      matchesCategory &&
      (titleEn.includes(query) ||
        titleBn.includes(query) ||
        clientEn.includes(query) ||
        clientBn.includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-[#08090c] text-[#f3f4f8] flex flex-col selection:bg-[#d4ff33] selection:text-black relative">
      {/* Ambient Top Glow */}
      <div className="ambient-glow-top" />

      {/* 1. PERMANENTLY FROZEN TOP HEADER BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#08090c]/90 backdrop-blur-xl border-b border-[#1f2433] px-4 sm:px-8 h-16 flex items-center justify-between shadow-2xl shadow-black/80">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#111] via-[#1e2333] to-[#d4ff33] p-[1.5px] shadow-lg group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#08090c] flex items-center justify-center font-mono text-xs font-black text-[#d4ff33]">
                ZU
              </div>
            </div>
            <div className="flex flex-col truncate">
              <span className="font-heading text-sm font-extrabold tracking-tight text-[#f3f4f8] truncate">
                {lang === "bn" ? "জসিম উদ্দিন" : "ZASIM UDDIN"}
              </span>
              <span className="font-mono text-[9px] text-[#8c93a8] tracking-wider uppercase font-semibold font-kalpurush hidden xs:block truncate">
                {lang === "bn"
                  ? "প্যাকেজিং ডিজাইনার · প্রাণ-আরএফএল গ্রুপ"
                  : "PACKAGING DESIGNER · PRAN-RFL GROUP"}
              </span>
            </div>
          </Link>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs shrink-0">
          {/* View Mode Toggle: Feed vs Grid */}
          <div className="flex items-center border border-[#222634] rounded-xl overflow-hidden p-0.5 bg-[#0e1017]">
            <button
              type="button"
              onClick={() => setViewMode("feed")}
              title="Feed Post View"
              className={`px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 text-[11px] font-bold rounded-lg transition-all font-kalpurush cursor-pointer ${
                viewMode === "feed"
                  ? "bg-[#d4ff33] text-black shadow-md font-black"
                  : "text-[#8c93a8] hover:text-white"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {lang === "bn" ? "প্রজেক্ট ফিড" : "Feed Stream"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              title="Architectural Grid View"
              className={`px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 text-[11px] font-bold rounded-lg transition-all font-kalpurush cursor-pointer ${
                viewMode === "grid"
                  ? "bg-[#d4ff33] text-black shadow-md font-black"
                  : "text-[#8c93a8] hover:text-white"
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {lang === "bn" ? "বক্স গ্রিড" : "Box Grid"}
              </span>
            </button>
          </div>

          {/* Quick Estimator Trigger */}
          <button
            type="button"
            onClick={() => setIsEstimatorOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#171a25] hover:bg-[#d4ff33] text-[#f3f4f8] hover:text-black border border-[#2b3145] hover:border-[#d4ff33] text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md font-kalpurush cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>{lang === "bn" ? "প্রজেক্ট এস্টিমেটর" : "Estimator"}</span>
          </button>

          {/* Language Toggle (Always Clickable & Interactive) */}
          <div className="flex border border-[#222634] rounded-xl overflow-hidden p-0.5 bg-[#0e1017] text-xs font-mono shadow-inner">
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-label="Switch to English"
              className={`px-2.5 sm:px-3 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                lang === "en"
                  ? "bg-[#d4ff33] text-black font-black shadow-md"
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
                  ? "bg-[#d4ff33] text-black font-black shadow-md"
                  : "text-[#8c93a8] hover:text-white"
              }`}
            >
              বাং
            </button>
          </div>

          {/* Admin Studio Login */}
          <Link
            href="/admin"
            title={lang === "bn" ? "অ্যাডমিন স্টুডিও লগইন" : "Admin Studio Login"}
            className="p-2 border border-[#222634] hover:border-[#d4ff33] bg-[#0e1017] text-[#8c93a8] hover:text-[#d4ff33] rounded-xl transition-all"
          >
            <Lock className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Spacer for fixed top header */}
      <div className="h-16 w-full shrink-0" />

      {/* 2. CINEMATIC HERO SECTION */}
      <section className="relative z-10 py-10 sm:py-16 px-4 sm:px-8 border-b border-[#1a1e2b]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Bold Headline & Designer Philosophy */}
            <div className="lg:col-span-8 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4ff33]/10 border border-[#d4ff33]/30 text-[#d4ff33] font-mono text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#d4ff33]" />
                <span>
                  {lang === "bn"
                    ? "এসসিটি ডিজাইন হাউস · প্রাণ-আরএফএল গ্রুপ"
                    : "SCT Design House · PRAN-RFL Group"}
                </span>
              </div>

              {/* Main Headline (Uses Modern Bold Sans) */}
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white leading-[1.12] tracking-tight">
                {lang === "bn" ? (
                  <>
                    সুপারশপের তাকে বিজয়ী হওয়ার{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff33] via-[#86efac] to-[#38bdf8]">
                      প্যাকেজিং ডিজাইন।
                    </span>
                  </>
                ) : (
                  <>
                    TURNING EVERYDAY FMCG INTO{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff33] via-[#86efac] to-[#38bdf8]">
                      SHELF ICONS.
                    </span>
                  </>
                )}
              </h1>

              {/* ডিজাইনারের বাণী (Uses Kalpurush / SutonnyMJ aesthetic) */}
              <div className="relative bg-[#10121a]/90 backdrop-blur-xl border border-[#222634] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-2">
                <Quote className="w-6 h-6 text-[#d4ff33] opacity-60 mb-1" />
                <p className="font-kalpurush text-base sm:text-lg text-[#d0d6e8] leading-relaxed font-normal">
                  {lang === "bn"
                    ? "“ভোক্তা পণ্যটির স্বাদ নেওয়ার আগেই, আমার ডিজাইনটি তাদের হাতে স্পর্শ করে। প্যাকেজিং হলো সেই নীরব বিক্রেতা, যার হাতে সুপারশপের ভিড়ে ক্রেতার দৃষ্টি কাড়ার জন্য মাত্র ৩ সেকেন্ড সময় থাকে।”"
                    : "“Before a consumer ever tastes what's inside, they hold my design in their hands. Packaging is the silent salesman that has exactly 3 seconds to win the shelf war.”"}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[#1e2333] font-mono text-[11px]">
                  <span className="text-[#d4ff33] font-bold font-kalpurush text-xs">
                    {lang === "bn"
                      ? "— জসিম উদ্দিন · লিড প্যাকেজিং ডিজাইনার"
                      : "— Zasim Uddin · Lead Packaging Designer"}
                  </span>
                  <span className="text-[#8c93a8] hidden sm:inline font-kalpurush text-xs">
                    {lang === "bn"
                      ? "ফ্যাক্টরি-গ্রেড প্রি-প্রেস ও ডাইলাইন আর্টওয়ার্ক"
                      : "Factory-Grade Pre-Press Compliance"}
                  </span>
                </div>
              </div>

              {/* Live Metric Pills */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <div className="px-3.5 py-2 rounded-xl bg-[#11131c] border border-[#222634] flex items-center gap-2 shadow-sm font-kalpurush">
                  <Globe2 className="w-4 h-4 text-[#38bdf8]" />
                  <span className="text-[#f3f4f8] font-bold">
                    {lang === "bn" ? "১৪০+ দেশে এক্সপোর্ট" : "140+ Export Markets"}
                  </span>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-[#11131c] border border-[#222634] flex items-center gap-2 shadow-sm font-kalpurush">
                  <Factory className="w-4 h-4 text-[#4ade80]" />
                  <span className="text-[#f3f4f8] font-bold">
                    {lang === "bn" ? "৫০ মিলিয়ন+ বাৎসরিক প্রিন্ট" : "50M+ Annual Units Printed"}
                  </span>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-[#11131c] border border-[#222634] flex items-center gap-2 shadow-sm font-kalpurush">
                  <CheckCircle2 className="w-4 h-4 text-[#f87171]" />
                  <span className="text-[#f3f4f8] font-bold">
                    {lang === "bn" ? "১০০% প্রি-প্রেস ডাইলাইন" : "100% Pre-Press Dielines"}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#feed"
                  className="px-6 py-3 bg-[#d4ff33] text-black hover:bg-white font-mono text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-xl shadow-[#d4ff33]/15 font-kalpurush text-sm cursor-pointer"
                >
                  <span>{lang === "bn" ? "প্যাকেজিং ফিড দেখুন" : "Explore Packaging Feed"}</span>
                  <ArrowDown className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsEstimatorOpen(true)}
                  className="px-6 py-3 bg-[#131622] hover:bg-[#1c2030] text-[#f3f4f8] border border-[#2b3145] font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 font-kalpurush text-sm cursor-pointer"
                >
                  <span>{lang === "bn" ? "প্রজেক্ট কোটেশন নিন" : "Request Project Quote"}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#38bdf8]" />
                </button>
              </div>
            </div>

            {/* Right Column: DESIGNER SPOTLIGHT SHOWCASE */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[280px] bg-gradient-to-b from-[#181c29] to-[#0c0e15] border border-[#2a3044] rounded-2xl p-3.5 shadow-2xl shadow-black/80 group">
                {/* Photo Viewport */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#090a0f] border border-[#222738]">
                  <Image
                    src="/assets/img/headshot.jpg"
                    alt="Zasim Uddin — Senior Packaging Designer"
                    fill
                    className="object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 bg-gradient-to-t from-black via-black/70 to-transparent font-mono">
                    <span className="font-extrabold text-[#d4ff33] block text-sm">
                      {lang === "bn" ? "জসিম উদ্দিন" : "ZASIM UDDIN"}
                    </span>
                    <span className="text-[#9ca3af] text-[10px] block font-semibold font-kalpurush text-xs">
                      {lang === "bn"
                        ? "সিনিয়র প্যাকেজিং ডিজাইনার · প্রাণ-আরএফএল"
                        : "Senior Packaging Designer · PRAN-RFL"}
                    </span>
                  </div>
                </div>

                {/* Footer details */}
                <div className="mt-3 pt-2.5 border-t border-[#1e2333] flex items-center justify-between font-mono text-[10px] text-[#8c93a8]">
                  <span className="flex items-center gap-1.5 text-[#4ade80] font-bold font-kalpurush text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-ping" />
                    <span>{lang === "bn" ? "স্টুডিওতে সক্রিয়" : "In Studio"}</span>
                  </span>
                  <span className="text-[#d0d6e8] font-bold font-kalpurush text-xs">
                    {lang === "bn" ? "ঢাকা, বাংলাদেশ" : "Dhaka, Bangladesh"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESIGN PHILOSOPHY & MANIFESTO STRIP */}
      <section className="bg-[#0b0d13] border-b border-[#1a1e2b] py-8 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-4 bg-[#10121a] border border-[#1e2230] rounded-xl space-y-2">
            <span className="text-[#d4ff33] text-[11px] font-black uppercase tracking-wider block font-subheading">
              {lang === "bn" ? "০১ · ৩-সেকেন্ডের সেলফ বাস্তবতা" : "01 · The 3-Second Shelf Reality"}
            </span>
            <p className="text-[#a4acc4] text-sm leading-relaxed font-kalpurush">
              {lang === "bn"
                ? "সুপারশপের তাকে একজন ক্রেতা মিনিটে প্রায় ৩০০ পণ্য অতিক্রম করেন। কালার কনট্রাস্ট ও টাইপোগ্রাফির সঠিক বিন্যাস ৩ সেকেন্ডের মধ্যে ক্রেতার দৃষ্টি আটকে দেয়।"
                : "In modern supermarkets, shoppers glance past 300 products a minute. Typography hierarchy, appetite appeal, and color contrast must halt their cart in 3 seconds."}
            </p>
          </div>

          <div className="p-4 bg-[#10121a] border border-[#1e2230] rounded-xl space-y-2">
            <span className="text-[#38bdf8] text-[11px] font-black uppercase tracking-wider block font-subheading">
              {lang === "bn" ? "০২ · প্রি-প্রেস ইঞ্জিনিয়ারিং" : "02 · Pre-Press Engineering"}
            </span>
            <p className="text-[#a4acc4] text-sm leading-relaxed font-kalpurush">
              {lang === "bn"
                ? "যে ডিজাইন প্রতি মিনিটে ১৬০ মিটার গতির রোটোগ্র্যাভিউর প্রেসে নির্ভুলভাবে প্রিন্ট হতে পারে না, তা শুধুই ডিজিটাল আর্ট। প্রতিটি ডাইলাইন প্রোডাকশন-রেডি হতে হবে।"
                : "A design that cannot run on a 160m/min rotogravure press with zero register error is not packaging—it is merely digital art. Every dieline line must be production-locked."}
            </p>
          </div>

          <div className="p-4 bg-[#10121a] border border-[#1e2230] rounded-xl space-y-2">
            <span className="text-[#f472b6] text-[11px] font-black uppercase tracking-wider block font-subheading">
              {lang === "bn" ? "০৩ · ১৪০+ দেশের এক্সপোর্ট রেগুলেশন" : "03 · 140+ Export Compliance"}
            </span>
            <p className="text-[#a4acc4] text-sm leading-relaxed font-kalpurush">
              {lang === "bn"
                ? "আন্তর্জাতিক বাজারে প্যাকেজিং হলো সর্বপ্রথম লিগ্যাল আর্কিটেকচার। ইউএস এফডিএ, বিএসটিআই ও জিসিসি অ্যারাবিক কমপ্লায়েন্স পণ্যকে কাস্টমসে আটকে যাওয়া থেকে রক্ষা করে।"
                : "Export packaging is legal architecture first and aesthetics second. Meeting strict US FDA, BSTI, and GCC Arabic regulations protects multi-container shipments from customs seizure."}
            </p>
          </div>
        </div>
      </section>

      {/* 4. FILTER & SEARCH BAR (Sticky right below frozen header) */}
      <section id="feed" className="sticky top-16 z-40 bg-[#08090c]/90 backdrop-blur-xl border-b border-[#1a1e2b] py-3 px-4 sm:px-8 shadow-md">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono text-[11px]">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl uppercase tracking-wider whitespace-nowrap transition-all border font-kalpurush cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#d4ff33] text-black border-[#d4ff33] font-black shadow-md shadow-[#d4ff33]/20"
                    : "bg-[#11131c] text-[#8c93a8] border-[#222634] hover:border-[#383f56] hover:text-white"
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c93a8]" />
            <input
              type="text"
              placeholder={lang === "bn" ? "পণ্য বা ব্র্যান্ড খুঁজুন..." : "Search FMCG products..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 bg-[#11131c] border border-[#222634] text-xs font-mono rounded-xl focus:outline-none focus:border-[#d4ff33] text-[#f3f4f8] font-kalpurush"
            />
          </div>
        </div>
      </section>

      {/* 5. MAIN PACKAGING STREAM (Feed or Box Grid) */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-8 py-10 flex-grow">
        {loading ? (
          <div className="py-24 text-center font-mono text-xs text-[#8c93a8] font-kalpurush">
            {lang === "bn" ? "প্যাকেজিং প্রজেক্ট লোড হচ্ছে..." : "Loading commercial packaging portfolio..."}
          </div>
        ) : filteredProjects.length > 0 ? (
          viewMode === "feed" ? (
            /* FEED STREAM VIEW */
            <div className="space-y-10">
              {filteredProjects.map((project) => (
                <ProjectPostCard
                  key={project.id}
                  project={project}
                  onOpenBeforeAfter={(p) => setActiveBeforeAfter(p)}
                  onOpenEstimator={() => setIsEstimatorOpen(true)}
                />
              ))}
            </div>
          ) : (
            /* ARCHITECTURAL BOX GRID VIEW */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredProjects.map((project) => (
                <ProjectGridTile key={project.id} project={project} />
              ))}
            </div>
          )
        ) : (
          <div className="py-20 text-center bg-[#10121a] border border-[#222634] rounded-2xl p-8">
            <span className="font-mono text-xs text-[#8c93a8] font-kalpurush">
              {lang === "bn"
                ? "কোনো প্যাকেজিং প্রজেক্ট পাওয়া যায়নি।"
                : "No packaging projects found matching your filter."}
            </span>
          </div>
        )}

        {/* KNOWLEDGE HUB & TECHNICAL FIELD NOTES */}
        <KnowledgeHub />
      </main>

      {/* 6. SLIM COMPACT FOOTER */}
      <footer className="bg-[#08090c] border-t border-[#1a1e2b] py-6 px-4 sm:px-8 font-mono text-xs text-[#8c93a8]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 font-kalpurush">
          <span>
            {lang === "bn"
              ? `© ${new Date().getFullYear()} জসিম উদ্দিন · সিনিয়র প্যাকেজিং ডিজাইনার · এসসিটি ডিজাইন হাউস · প্রাণ-আরএফএল গ্রুপ`
              : `© ${new Date().getFullYear()} Zasim Uddin · Senior Packaging Designer · SCT Design House · PRAN-RFL Group`}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsEstimatorOpen(true)}
              className="hover:text-[#d4ff33] transition-colors cursor-pointer"
            >
              {lang === "bn" ? "প্রজেক্ট কোটেশন" : "Get Project Quote"}
            </button>
            <span>·</span>
            <Link href="/admin" className="hover:text-[#d4ff33] transition-colors">
              {lang === "bn" ? "অ্যাডমিন স্টুডিও" : "Studio Login"}
            </Link>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {activeBeforeAfter && (
        <BeforeAfterModal
          isOpen={!!activeBeforeAfter}
          onClose={() => setActiveBeforeAfter(null)}
          projectTitle={
            lang === "bn" && activeBeforeAfter.bn?.title
              ? activeBeforeAfter.bn.title
              : activeBeforeAfter.en.title
          }
          beforeImage={activeBeforeAfter.journey?.en?.[1]?.image || activeBeforeAfter.coverImage}
          afterImage={activeBeforeAfter.thumbnail || activeBeforeAfter.coverImage}
        />
      )}

      <PackagingEstimator
        isOpen={isEstimatorOpen}
        onClose={() => setIsEstimatorOpen(false)}
      />
    </div>
  );
}
