"use client";

import { useState } from "react";
import Image from "next/image";
import { JourneyStep } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { ChevronLeft, ChevronRight, ExternalLink, Eye, Layers } from "lucide-react";

interface Props {
  journeyEn: JourneyStep[];
  journeyBn?: JourneyStep[];
}

export default function JourneyViewer({ journeyEn, journeyBn }: Props) {
  const { lang } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const steps = journeyEn && journeyEn.length > 0 ? journeyEn : [];
  const currentStep = steps[activeStep] || null;
  const currentStepBn = journeyBn && journeyBn[activeStep] ? journeyBn[activeStep] : null;

  if (!currentStep) return null;

  const title = lang === "bn" && currentStepBn?.title ? currentStepBn.title : currentStep.title;
  const description =
    lang === "bn" && (currentStepBn?.description || currentStep.description_bn)
      ? currentStepBn?.description || currentStep.description_bn
      : currentStep.description;

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const getPhaseTag = (type: string) => {
    switch (type) {
      case "brief":
        return {
          label: lang === "bn" ? "০১ / ক্লায়েন্ট ব্রিফ" : "01 / CLIENT BRIEF",
          color: "bg-[#0b0b0a] text-white border-white/20",
        };
      case "framework":
        return {
          label: lang === "bn" ? "০২ / ডাই-লাইন ব্লুপ্রিন্ট" : "02 / DIELINE & SKETCH",
          color: "bg-[#2563eb] text-white border-blue-400/40",
        };
      case "design":
        return {
          label: lang === "bn" ? "০৩ / ফ্ল্যাট আর্টওয়ার্ক" : "03 / FLAT ARTBOARD",
          color: "bg-[#d4ff33] text-black border-black/40",
        };
      case "feedback":
        return {
          label: lang === "bn" ? "০৪ / প্রিন্টিং স্পেক্স" : "04 / PRODUCTION SPECS",
          color: "bg-[#ef4444] text-white border-red-400/40",
        };
      case "final":
      case "production":
      case "shelf":
        return {
          label: lang === "bn" ? "০৫ / সুপারমার্কেট পণ্য" : "05 / SUPERMARKET REALITY",
          color: "bg-[#10b981] text-white border-emerald-400/40",
        };
      default:
        return {
          label: type.toUpperCase(),
          color: "bg-[#70716b] text-white border-white/10",
        };
    }
  };

  const tag = getPhaseTag(currentStep.type);

  return (
    <section className="bg-[#10121a] border border-[#222634] rounded-2xl p-6 sm:p-8 my-8 shadow-2xl">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#1c202c]">
        <div>
          <span className="font-mono text-[10px] tracking-widest text-[#d4ff33] uppercase block font-bold">
            {lang === "bn" ? "কমার্শিয়াল প্যাকেজিং জার্নি" : "COMMERCIAL PACKAGING JOURNEY"}
          </span>
          <h3 className="font-heading font-headline text-xl sm:text-2xl font-black text-[#f3f4f8] mt-1">
            {lang === "bn"
              ? "ক্লায়েন্ট ব্রিফ থেকে সুপারমার্কেট পর্যন্ত ৫টি ধাপ"
              : "From Initial Brief to Shelf Impact"}
          </h3>
        </div>

        {/* Step Arrows */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#8c93a8] mr-2">
            {lang === "bn"
              ? `ধাপ 0${activeStep + 1} / 0${steps.length}`
              : `Phase 0${activeStep + 1} / 0${steps.length}`}
          </span>
          <button
            onClick={prevStep}
            title="Previous Phase"
            className="w-9 h-9 rounded-xl border border-[#2b3145] bg-[#141724] text-white hover:bg-[#d4ff33] hover:text-black flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextStep}
            title="Next Phase"
            className="w-9 h-9 rounded-xl border border-[#2b3145] bg-[#141724] text-white hover:bg-[#d4ff33] hover:text-black flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Step Tabs Timeline Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2 my-5 font-mono">
        {steps.map((s, idx) => {
          const isActive = idx === activeStep;
          const stepName =
            lang === "bn"
              ? s.type === "shelf"
                ? "বাজারের পণ্য"
                : s.type === "framework"
                ? "ডাইলাইন CAD"
                : s.type === "design"
                ? "ফ্ল্যাট আর্ট"
                : s.type === "final"
                ? "৩ডি মকআপ"
                : s.type === "brief"
                ? "ক্লায়েন্ট ব্রিফ"
                : s.type
              : s.type.toUpperCase();

          return (
            <button
              key={s.id || idx}
              onClick={() => setActiveStep(idx)}
              className={`text-left p-3 rounded-xl border transition-all ${
                isActive
                  ? "border-[#d4ff33] bg-[#d4ff33] text-black font-extrabold shadow-lg shadow-[#d4ff33]/20"
                  : "border-[#1e2333] bg-[#0b0d13] text-[#8c93a8] hover:border-[#383f56] hover:text-white"
              }`}
            >
              <span className="text-[10px] block opacity-75 font-kalpurush">
                {lang === "bn" ? `ধাপ 0${idx + 1}` : `STEP 0${idx + 1}`}
              </span>
              <span className="text-xs uppercase tracking-tight block truncate mt-0.5 font-kalpurush">
                {stepName}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Phase Content: Side-by-side Image & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">
        {/* Visual / Image Screen */}
        <div className="lg:col-span-7 bg-[#090a0f] border border-[#222738] rounded-xl relative group overflow-hidden min-h-[340px] sm:min-h-[420px] flex items-center justify-center">
          {currentStep.image ? (
            <div className="relative w-full h-[420px]">
              <Image
                src={currentStep.image}
                alt={currentStep.imageAlt || title || "Packaging phase"}
                fill
                className="object-contain p-4 group-hover:scale-[1.02] transition-transform duration-500 drop-shadow-xl"
              />
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute bottom-4 right-4 bg-black/80 text-white font-mono text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 backdrop-blur-md hover:bg-[#d4ff33] hover:text-black transition-colors border border-white/10 font-kalpurush"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{lang === "bn" ? "বড় করে দেখুন" : "Zoom"}</span>
              </button>
            </div>
          ) : (
            <div className="text-center p-8 font-mono text-xs text-[#8c93a8] font-kalpurush">
              <Layers className="w-12 h-12 mx-auto mb-3 opacity-40 text-white" />
              <span>{lang === "bn" ? "এই ধাপের ছবি নেই" : "No image uploaded for this phase"}</span>
            </div>
          )}

          {/* Phase Tag Overlay */}
          <div className="absolute top-4 left-4">
            <span
              className={`font-mono text-[10px] font-bold px-3 py-1 rounded-full border shadow-md font-kalpurush ${tag.color}`}
            >
              {tag.label}
            </span>
          </div>
        </div>

        {/* Narrative & Explanations */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
          <div>
            <span className="font-mono text-[10px] text-[#8c93a8] uppercase tracking-wider block mb-1 font-kalpurush">
              {lang === "bn" ? `ধাপ 0${activeStep + 1} বিস্তারিত:` : `Phase 0${activeStep + 1} Breakdown:`}
            </span>
            <h4 className="font-heading font-headline text-xl sm:text-2xl font-black text-[#f3f4f8] leading-tight">
              {title}
            </h4>

            {currentStep.date && (
              <span className="font-mono text-[11px] text-[#38bdf8] block mt-1 font-kalpurush">
                {lang === "bn" ? `সম্পন্ন হয়েছে: ${currentStep.date}` : `Completed: ${currentStep.date}`}
              </span>
            )}

            <div className="mt-4 pt-4 border-t border-[#1c202c] font-kalpurush text-sm sm:text-base text-[#c5cde0] leading-relaxed whitespace-pre-line">
              {description}
            </div>

            {currentStep.sourceUrl && (
              <div className="pt-4">
                <a
                  href={currentStep.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#38bdf8] hover:text-[#d4ff33] transition-colors font-kalpurush"
                >
                  <span>{currentStep.sourceLabel || (lang === "bn" ? "ডাইলাইন ব্লুপ্রিন্ট দেখুন" : "View Blueprint")}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* Bottom Fast Action */}
          <div className="pt-4 border-t border-[#1c202c] flex items-center justify-between font-mono text-xs text-[#8c93a8]">
            <span>{lang === "bn" ? "পরবর্তী ধাপে যান" : "Next Phase"}</span>
            <button
              onClick={nextStep}
              className="text-[#d4ff33] font-bold hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>{lang === "bn" ? "পরবর্তী ধাপ →" : "Next Phase →"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {isZoomed && currentStep.image && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={currentStep.image}
              alt="Zoomed view"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
