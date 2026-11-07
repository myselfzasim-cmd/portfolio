"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { GalleryItem } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import GalleryLightbox from "./GalleryLightbox";
import ProfileDrawer from "./ProfileDrawer";
import PackagingEstimator from "./PackagingEstimator";
import {
  Home,
  Camera,
  Search,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  Maximize2,
  Tag,
  Factory,
  Monitor,
  Store,
  Users,
  Sun,
  Moon,
  Calculator,
  ArrowLeft,
  ChevronRight,
  Languages,
  LayoutGrid,
} from "lucide-react";

interface Props {
  initialItems: GalleryItem[];
}

export default function GalleryClient({ initialItems }: Props) {
  const { lang, setLang } = useLanguage();
  const [items, setItems] = useState<GalleryItem[]>(initialItems || []);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", next);
      if (next === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }
  };

  const categories = [
    { id: "all", labelEn: "All Photos", labelBn: "সকল ছবি", icon: Layers },
    { id: "press", labelEn: "Press & Factory", labelBn: "প্রিন্টিং প্রেস ও কারখানা", icon: Factory },
    { id: "studio", labelEn: "3D & Design Studio", labelBn: "৩ডি ও ডিজাইন স্টুডিও", icon: Monitor },
    { id: "market", labelEn: "Supermarket Audits", labelBn: "শেলফ ও বাজার অডিট", icon: Store },
    { id: "shoots", labelEn: "Product Shoots", labelBn: "কমার্শিয়াল ফটোশুট", icon: Camera },
    { id: "team", labelEn: "Team & Memories", labelBn: "টিম ও স্মৃতিকথা", icon: Users },
  ];

  // Filtering
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const title = (item.title || "").toLowerCase();
      const titleBn = (item.titleBn || "").toLowerCase();
      const location = (item.location || "").toLowerCase();
      const locationBn = (item.locationBn || "").toLowerCase();
      const tags = (item.tags || []).join(" ").toLowerCase();

      const matchesSearch =
        title.includes(q) ||
        titleBn.includes(q) ||
        location.includes(q) ||
        locationBn.includes(q) ||
        tags.includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (prev) => (prev! - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-[#f3f4f8] flex flex-col selection:bg-[#d4ff33] selection:text-black font-sans">
      {/* 1. TOP FROZEN NAVIGATION BAR (Visual Icons on Mobile, Labels on Desktop) */}
      <header className="sticky top-0 z-50 bg-[#08090c]/90 backdrop-blur-xl border-b border-[#1f2433] px-3 sm:px-6 h-16 flex items-center justify-between shadow-2xl shadow-black/80">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <Link
            href="/"
            title={lang === "bn" ? "হোম পেজে যান" : "Go to Home"}
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0 cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-[#111] via-[#1e2333] to-[#d4ff33] p-[1.5px] shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center shrink-0">
              <div className="w-full h-full rounded-full bg-[#08090c] flex items-center justify-center text-[#d4ff33] group-hover:bg-[#d4ff33] group-hover:text-black transition-colors">
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="font-handwriting text-lg sm:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff33] via-[#f1f5f9] to-[#38bdf8] group-hover:drop-shadow-[0_2px_12px_rgba(212,255,51,0.5)] transition-all leading-none">
                ThirstyPoet
              </span>
              <span className="font-mono text-[9px] text-[#8c93a8] tracking-wider uppercase font-semibold hidden md:block truncate mt-0.5">
                {lang === "bn"
                  ? "প্যাকেজিং ডিজাইনার · প্রাণ-আরএফএল গ্রুপ"
                  : "PACKAGING DESIGNER · PRAN-RFL GROUP"}
              </span>
            </div>
          </Link>
        </div>

        {/* Center / Right controls: Visual Icons on Mobile */}
        <div className="flex items-center gap-1 sm:gap-2.5 font-mono text-xs shrink-0">
          {/* Back to Work / Home */}
          <Link
            href="/"
            title={lang === "bn" ? "সকল প্রজেক্ট শোকেস" : "All Projects Showcase"}
            aria-label="All Projects"
            className="p-2 sm:px-3 sm:py-1.5 border border-[#222634] hover:border-[#d4ff33] bg-[#0e1017] hover:bg-[#141724] text-[#f3f4f8] hover:text-[#d4ff33] rounded-xl transition-all flex items-center gap-1.5 text-[11px] font-bold shadow-md cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-[#d4ff33] group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden md:inline">{lang === "bn" ? "প্রজেক্ট শোকেস" : "All Projects"}</span>
          </Link>

          {/* Brands Tab Link */}
          <Link
            href="/brands"
            title={lang === "bn" ? "৩৩০+ ব্র্যান্ডস শোকেস" : "330+ Commercial Brands"}
            aria-label="Brands"
            className="p-2 sm:px-3 sm:py-1.5 border border-[#222634] hover:border-[#d4ff33] bg-[#0e1017] hover:bg-[#141724] text-[#f3f4f8] hover:text-[#d4ff33] rounded-xl transition-all flex items-center gap-1.5 text-[11px] font-bold shadow-md cursor-pointer group"
          >
            <Layers className="w-4 h-4 text-[#d4ff33] group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">{lang === "bn" ? "ব্র্যান্ডসমূহ" : "Brands"}</span>
          </Link>

          {/* Active Gallery Indicator Pill */}
          <div
            title={lang === "bn" ? "ফটো গ্যালারি (সক্রিয়)" : "Photo Gallery (Active)"}
            aria-label="Photo Gallery"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#38bdf8] text-black font-extrabold flex items-center gap-1.5 text-[11px] shadow-md shadow-[#38bdf8]/20"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden md:inline">{lang === "bn" ? "ফটো গ্যালারি" : "Photo Gallery"}</span>
          </div>

          {/* Estimator Trigger (Icon on Mobile) */}
          <button
            type="button"
            onClick={() => setIsEstimatorOpen(true)}
            title={lang === "bn" ? "প্রজেক্ট এস্টিমেটর" : "Cost Estimator"}
            aria-label="Estimator"
            className="p-2 sm:px-3.5 sm:py-1.5 bg-[#171a25] hover:bg-[#d4ff33] text-[#f3f4f8] hover:text-black border border-[#2b3145] hover:border-[#d4ff33] text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Calculator className="w-4 h-4 text-[#fbbf24] group-hover:text-black shrink-0" />
            <span className="hidden lg:inline">{lang === "bn" ? "এস্টিমেটর" : "Estimator"}</span>
          </button>

          {/* Day / Night Theme Toggle (Pure Icon) */}
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

          {/* Language Toggle: Mobile Single Tap, Desktop Segmented */}
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

          <div className="hidden sm:flex border border-[#222634] rounded-xl overflow-hidden p-0.5 bg-[#0e1017] text-xs font-mono shadow-inner shrink-0">
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
              className={`px-2.5 sm:px-3 py-1 font-bold rounded-lg transition-all cursor-pointer ${
                lang === "bn"
                  ? "bg-[#d4ff33] text-black font-black shadow-md"
                  : "text-[#8c93a8] hover:text-white"
              }`}
            >
              বাং
            </button>
          </div>

          {/* Designer Profile Trigger */}
          <button
            type="button"
            onClick={() => setIsProfileOpen(true)}
            title={lang === "bn" ? "ডিজাইনার প্রোফাইল" : "Designer Profile"}
            aria-label="Designer Profile"
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-[#d4ff33]/50 hover:border-[#d4ff33] p-[1px] transition-all hover:scale-105 cursor-pointer shadow-lg shadow-[#d4ff33]/15 shrink-0"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
              <Image
                src="/assets/img/profile.jpg"
                alt="Zasim Uddin"
                fill
                className="object-cover grayscale contrast-125 hover:grayscale-0 transition-all"
              />
            </div>
          </button>
        </div>
      </header>

      {/* 2. GALLERY HERO BANNER */}
      <section className="relative bg-gradient-to-b from-[#0b0e14] to-[#08090c] border-b border-[#1a1f2e] py-10 sm:py-14 px-4 sm:px-8 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4ff33]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#38bdf8]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161a26] border border-[#283044] text-[#d4ff33] font-mono text-xs uppercase font-bold tracking-wider">
            <Camera className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>
              {lang === "bn"
                ? "কাজের মুহূর্ত, ফ্যাক্টরি প্রি-প্রেস ও স্মৃতি আর্কাইভ"
                : "WORK IN-ACTION, PRESS FLOORS & MEMORIES ARCHIVE"}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            {lang === "bn" ? (
              <>
                প্যাকেজিং পেছনের গল্প,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff33] to-[#38bdf8]">
                  ফ্যাক্টরি প্রেস ও স্মৃতিকথা
                </span>
              </>
            ) : (
              <>
                Behind the Packaging:{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff33] to-[#38bdf8]">
                  Factory Floors & Studio Milestones
                </span>
              </>
            )}
          </h1>

          <p className={`text-sm sm:text-base text-[#a4acc4] max-w-2xl mx-auto leading-relaxed ${lang === "bn" ? "font-kalpurush" : "font-sans"}`}>
            {lang === "bn"
              ? "১৬০ মিটার গতির রোটোগ্র্যাভিউর প্রেস লাইন, সিলিন্ডার প্রুফিং, ৩ডি সিজিআই রেন্ডারিং, সুপারশপ শেলফ অডিট এবং সহকর্মীদের সাথে কাটানো স্মরণীয় মুহূর্তের প্রামাণ্য চিত্রশালা।"
              : "A visual documentary of 8+ years across high-speed rotogravure bottling lines, cylinder proofing labs, 3D pack renders, supermarket shelf audits, and factory field memories."}
          </p>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-3 font-mono text-xs text-[#8c93a8]">
            <span className="px-3 py-1 rounded-lg bg-[#11141e] border border-[#1e2332] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <strong className="text-white">{lang === "bn" ? "১২+" : "12+"}</strong>{" "}
              {lang === "bn" ? "ফ্যাক্টরি প্রেস লাইন" : "Press Lines"}
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#11141e] border border-[#1e2332] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
              <strong className="text-white">{lang === "bn" ? "৮+" : "8+"}</strong>{" "}
              {lang === "bn" ? "বছর অভিজ্ঞতা" : "Years Field Experience"}
            </span>
            <span className="px-3 py-1 rounded-lg bg-[#11141e] border border-[#1e2332] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d4ff33]" />
              <strong className="text-white">{lang === "bn" ? "১,২০০+" : "1,200+"}</strong>{" "}
              {lang === "bn" ? "সংরক্ষিত ছবি" : "Photos Archived"}
            </span>
          </div>
        </div>
      </section>

      {/* 3. FILTER TABS & SEARCH BAR (Sticky) */}
      <section className="sticky top-16 z-40 bg-[#08090c]/95 backdrop-blur-xl border-b border-[#1a1e2b] py-3 px-3 sm:px-6 shadow-md">
        <div className="max-w-[80vw] 2xl:max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-mono text-xs">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              const label = lang === "bn" ? cat.labelBn : cat.labelEn;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl uppercase tracking-wider whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer font-sans text-xs ${
                    isSelected
                      ? "bg-[#d4ff33] text-black border-[#d4ff33] font-black shadow-md shadow-[#d4ff33]/20"
                      : "bg-[#11131c] text-[#8c93a8] border-[#222634] hover:border-[#383f56] hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8c93a8]" />
            <input
              type="text"
              placeholder={lang === "bn" ? "ছবি, স্থান বা ট্যাগ খুঁজুন..." : "Search photos, location, tags..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 bg-[#11131c] border border-[#222634] text-xs font-mono rounded-xl focus:outline-none focus:border-[#d4ff33] text-[#f3f4f8]"
            />
          </div>
        </div>
      </section>

      {/* 4. MAIN PHOTO GALLERY MASONRY / GRID */}
      <main className="max-w-[80vw] 2xl:max-w-[1440px] mx-auto w-full px-3 sm:px-6 py-6 sm:py-8 flex-grow">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item, idx) => {
              const title = lang === "bn" && item.titleBn ? item.titleBn : item.title;
              const location = lang === "bn" && item.locationBn ? item.locationBn : item.location;

              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group relative bg-[#10121a] border border-[#1f2434] hover:border-[#d4ff33] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#d4ff33]/10 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Image Viewport */}
                  <div className="relative aspect-[4/3] w-full bg-[#090b10] overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Overlay Tag */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-[#d4ff33] font-mono text-[10px] font-bold uppercase tracking-wider">
                        {item.category.toUpperCase()}
                      </span>
                    </div>

                    {/* Hover Fullscreen Icon */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs">
                      <div className="p-2.5 rounded-full bg-[#d4ff33] text-black font-bold shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <h3 className="font-bold text-sm text-white group-hover:text-[#d4ff33] transition-colors line-clamp-1 font-sans">
                        {title}
                      </h3>
                      <p className={`text-xs text-[#8c93a8] line-clamp-2 mt-1 leading-relaxed ${lang === "bn" ? "font-kalpurush" : "font-sans"}`}>
                        {lang === "bn" && item.descriptionBn ? item.descriptionBn : item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#1a1f2e] flex items-center justify-between text-[11px] font-mono text-[#70788e]">
                      <span className="flex items-center gap-1 text-[#38bdf8] truncate max-w-[130px] font-sans">
                        <MapPin className="w-3 h-3 text-[#ef4444] shrink-0" />
                        <span className="truncate">{location}</span>
                      </span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center bg-[#10121a] border border-[#1f2434] rounded-2xl p-8 max-w-lg mx-auto">
            <Camera className="w-12 h-12 mx-auto text-[#8c93a8] opacity-50 mb-3" />
            <h3 className="text-base font-bold text-white font-sans">
              {lang === "bn" ? "কোনো ছবি পাওয়া যায়নি" : "No photos found"}
            </h3>
            <p className="text-xs text-[#8c93a8] font-mono mt-1">
              {lang === "bn"
                ? "আপনার সার্চ বা ফিল্টারের সাথে মিলে এমন কোনো ছবি পাওয়া যায়নি।"
                : "Try clearing your search query or selecting another category filter."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-1.5 rounded-xl bg-[#d4ff33] text-black font-bold text-xs font-sans cursor-pointer"
            >
              {lang === "bn" ? "সকল ছবি দেখুন" : "View All Photos"}
            </button>
          </div>
        )}
      </main>

      {/* 5. SLIM FOOTER */}
      <footer className="bg-[#08090c] border-t border-[#1a1e2b] py-6 px-4 sm:px-8 font-mono text-xs text-[#8c93a8]">
        <div className="max-w-[80vw] 2xl:max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            {lang === "bn"
              ? `© ${new Date().getFullYear()} জসিম উদ্দিন · সিনিয়র প্যাকেজিং ডিজাইনার · এসসিটি ডিজাইন হাউস · প্রাণ-আরএফএল গ্রুপ`
              : `© ${new Date().getFullYear()} Zasim Uddin · Senior Packaging Designer · SCT Design House · PRAN-RFL Group`}
          </span>
          <div className="flex items-center gap-3">
            <Link href="/" className="hover:text-[#d4ff33] transition-colors">
              {lang === "bn" ? "প্রজেক্ট শোকেস" : "Work Showcase"}
            </Link>
            <span>·</span>
            <Link href="/admin" className="hover:text-[#d4ff33] transition-colors">
              {lang === "bn" ? "স্টুডিও লগইন" : "Studio Admin"}
            </Link>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX MODAL */}
      <GalleryLightbox
        item={activeItem}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={lightboxIndex || 0}
        totalCount={filteredItems.length}
      />

      {/* DRAWERS & ESTIMATOR */}
      <ProfileDrawer isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
      <PackagingEstimator isOpen={isEstimatorOpen} onClose={() => setIsEstimatorOpen(false)} />
    </div>
  );
}