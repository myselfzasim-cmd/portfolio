"use client";

import { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import PackInteractiveSlider from "./PackInteractiveSlider";
import {
  ArrowUpRight,
  FileText,
  Globe,
  Printer,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Props {
  project: Project;
  onOpenBeforeAfter: (project: Project) => void;
  onOpenEstimator: () => void;
}

export default function ProjectPostCard({
  project,
  onOpenBeforeAfter,
  onOpenEstimator,
}: Props) {
  const { lang } = useLanguage();
  const [showSpecs, setShowSpecs] = useState(false);

  const title = lang === "bn" && project.bn?.title ? project.bn.title : project.en.title;
  const client = lang === "bn" && project.bn?.client ? project.bn.client : project.en.client;
  const summary = lang === "bn" && project.bn?.summary ? project.bn.summary : project.en.summary;

  const handlePrintPdf = () => {
    window.open(`/project/${project.id}?print=true`, "_blank");
  };

  return (
    <article className="relative bg-[#10121a] border border-[#222634] hover:border-[#383f56] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group">
      {/* 1. POST HEADER (Author, Client & Live Status) */}
      <div className="p-5 sm:p-6 border-b border-[#1c202c] flex items-center justify-between bg-[#13151f]/50">
        <div className="flex items-center gap-3.5">
          {/* Avatar icon */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#111] via-[#1a1e2d] to-[#d4ff33] p-[1.5px] shadow-md">
            <div className="w-full h-full rounded-full bg-[#0d0e14] flex items-center justify-center font-mono text-xs font-bold text-[#d4ff33]">
              ZU
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#f3f4f8] tracking-tight font-kalpurush">
                {lang === "bn" ? "জসিম উদ্দিন" : "Zasim Uddin"}
              </span>
              <span className="text-[#555b70] text-xs font-mono">•</span>
              <span className="font-mono text-xs text-[#d4ff33] font-semibold font-kalpurush">
                {client || "PRAN-RFL Group"}
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#8c93a8] block mt-0.5 font-kalpurush">
              {lang === "bn" ? "এসসিটি ডিজাইন হাউস" : "SCT Design House"} · {project.year} · {project.category}
            </span>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          {project.marketStatus && (
            <span className="bg-[#d4ff33]/15 text-[#d4ff33] border border-[#d4ff33]/40 font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm font-kalpurush">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4ff33] animate-pulse" />
              <span>{lang === "bn" ? "বাজারে সক্রিয়" : "In Market"}</span>
            </span>
          )}
          {project.exportRegion && (
            <span className="bg-[#3b82f6]/15 text-[#60a5fa] border border-[#3b82f6]/40 font-semibold uppercase px-2.5 py-1 rounded-full hidden sm:flex items-center gap-1 font-kalpurush">
              <Globe className="w-3 h-3" />
              <span>{lang === "bn" ? "এক্সপোর্ট" : "Export"}</span>
            </span>
          )}
        </div>
      </div>

      {/* 2. TEXT CONTENT & TITLE */}
      <div className="px-6 pt-5 pb-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h3 className="font-heading font-headline font-project-title text-2xl sm:text-3xl font-black text-[#f3f4f8] tracking-tight leading-snug">
            <Link
              href={`/project/${project.id}`}
              className="font-heading font-headline font-project-title font-black hover:text-[#d4ff33] transition-colors"
            >
              {title}
            </Link>
          </h3>
          <span className="font-mono text-[11px] text-[#8c93a8] shrink-0 uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        <p className="font-kalpurush text-sm sm:text-base text-[#a4acc4] leading-relaxed">
          {summary}
        </p>

        {/* Collapsible Technical Specs pill */}
        {project.dielineSpecs && (
          <div className="pt-2">
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="font-mono text-xs text-[#60a5fa] hover:text-[#93c5fd] flex items-center gap-1.5 font-bold tracking-wide transition-colors font-kalpurush"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>
                {showSpecs
                  ? (lang === "bn" ? "প্রি-প্রেস স্পেসিফিকেশন লুকান" : "Hide Factory Print & Dieline Specs")
                  : (lang === "bn" ? "প্রি-প্রেস ও ডাই-লাইন স্পেসিফিকেশন দেখুন" : "View Pre-Press & Dieline Specifications")}
              </span>
              {showSpecs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showSpecs && (
              <div className="mt-3 p-4 bg-[#0a0b10] border border-[#1e2333] rounded-xl font-mono text-[11px] text-[#8c93a8] grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fadeIn font-kalpurush">
                <div>
                  <span className="text-[#555b70] block uppercase text-[9px] font-bold">
                    {lang === "bn" ? "প্যাকেজিং ফরম্যাট:" : "Packaging Format:"}
                  </span>
                  <strong className="text-[#f3f4f8] block mt-0.5">{project.dielineSpecs.type || "Pouch"}</strong>
                </div>
                <div>
                  <span className="text-[#555b70] block uppercase text-[9px] font-bold">
                    {lang === "bn" ? "সাবস্ট্রেট / ফিল্ম:" : "Substrate / Film:"}
                  </span>
                  <span className="text-[#f3f4f8] block mt-0.5">{project.dielineSpecs.material || "Multi-Layer BOPP"}</span>
                </div>
                <div>
                  <span className="text-[#555b70] block uppercase text-[9px] font-bold">
                    {lang === "bn" ? "প্রিন্টিং মেথড:" : "Printing Process:"}
                  </span>
                  <span className="text-[#f3f4f8] block mt-0.5">{project.dielineSpecs.printProcess || "Rotogravure"}</span>
                </div>
                <div>
                  <span className="text-[#555b70] block uppercase text-[9px] font-bold">
                    {lang === "bn" ? "স্পেশাল ফিনিশিং:" : "Special Lacquer / Finish:"}
                  </span>
                  <span className="text-[#f3f4f8] block mt-0.5">{project.dielineSpecs.specialFinishing || "Spot UV / Matte"}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. INTERACTIVE VISUAL FRAME (In-Hand → Dieline → Flat → 3D on Hover) */}
      <div className="px-6 py-2">
        <PackInteractiveSlider project={project} />
        <div className="flex items-center justify-between font-mono text-[10px] text-[#6b7280] mt-2 px-1 font-kalpurush">
          <span className="flex items-center gap-1 text-[#8c93a8]">
            <Sparkles className="w-3 h-3 text-[#d4ff33]" />
            <span>
              {lang === "bn"
                ? "ইন্টারঅ্যাক্টিভ ফ্রেম: মাউস নিলে বাজারের আসল পণ্য থেকে ডাই-লাইন ও ৩ডি মকআপ দেখাবে"
                : "Interactive Visual: Hover to cycle from in-hand photo to dielines & 3D renders"}
            </span>
          </span>
          <span className="text-[#555b70] hidden sm:inline">
            {lang === "bn" ? "নিচের বাটনে চাপ দিয়ে যেকোনো ধাপে যান" : "Touch or click bottom pills to jump"}
          </span>
        </div>
      </div>

      {/* 4. POST ACTION BAR (Interactive Tools) */}
      <div className="px-6 py-4 mt-3 border-t border-[#1c202c] bg-[#0c0e15] flex flex-wrap items-center justify-between gap-3 font-mono text-xs font-kalpurush">
        {/* Left tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenBeforeAfter(project)}
            className="px-3 py-1.5 rounded-lg border border-[#2b3145] bg-[#141724] text-[#f3f4f8] hover:border-[#d4ff33] hover:text-[#d4ff33] transition-all flex items-center gap-1.5 font-bold text-[11px]"
            title={lang === "bn" ? "আগের প্যাকেজিংয়ের সাথে তুলনা" : "Compare with previous packaging"}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#3b82f6]" />
            <span>{lang === "bn" ? "বিফোর / আফটার" : "Before / After Rebrand"}</span>
          </button>

          <button
            onClick={handlePrintPdf}
            className="px-3 py-1.5 rounded-lg border border-[#2b3145] bg-[#141724] text-[#f3f4f8] hover:border-white transition-all flex items-center gap-1.5 font-bold text-[11px]"
            title={lang === "bn" ? "১-পৃষ্ঠার এক্সিকিউটিভ শিট ডাউনলোড" : "Download executive 1-page PDF spec sheet"}
          >
            <FileText className="w-3.5 h-3.5 text-[#8c93a8]" />
            <span>{lang === "bn" ? "১-পৃষ্ঠার PDF শিট" : "1-Page PDF Sheet"}</span>
          </button>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenEstimator}
            className="text-[#8c93a8] hover:text-[#d4ff33] transition-colors text-[11px] font-semibold flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-[#d4ff33]" />
            <span>{lang === "bn" ? "অনুরূপ প্রজেক্ট ইনকোয়ারি" : "Inquire Similar Pack"}</span>
          </button>

          <Link
            href={`/project/${project.id}`}
            className="px-4 py-2 bg-[#d4ff33] text-black hover:bg-white transition-all rounded-lg flex items-center gap-1.5 font-black text-xs uppercase tracking-wider shadow-lg shadow-[#d4ff33]/10"
          >
            <span>{lang === "bn" ? "কেস স্টাডি" : "Full Story"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
