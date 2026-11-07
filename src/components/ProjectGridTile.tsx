"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import CountryFlag from "@/components/CountryFlag";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

export default function ProjectGridTile({ project }: { project: Project }) {
  const { lang } = useLanguage();
  const thumb =
    project.thumbnail || project.coverImage || "/assets/img/placeholder-work-01.svg";

  const title = lang === "bn" && project.bn?.title ? project.bn.title : project.en.title;
  const client = lang === "bn" && project.bn?.client ? project.bn.client : project.en.client;

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
    <Link
      href={`/project/${project.id}`}
      className="group relative bg-[#10121a] border border-[#222634] hover:border-[#d4ff33] rounded-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[#d4ff33]/10"
    >
      {/* Visual Area */}
      <div className="relative aspect-square bg-[#0a0b0f] overflow-hidden flex items-center justify-center p-3">
        <Image
          src={thumb}
          alt={title}
          fill
          className="object-contain p-3 group-hover:scale-105 transition-transform duration-500 drop-shadow-lg"
        />

        {/* Top-Left Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 font-mono">
          <span className="bg-black/80 backdrop-blur-md text-white text-[9px] uppercase px-2 py-0.5 rounded border border-white/10 font-bold">
            {project.category}
          </span>
          {project.marketStatus && (
            <span className="bg-[#d4ff33] text-black text-[8px] font-black uppercase px-2 py-0.5 rounded border border-black flex items-center gap-1 shadow-sm font-kalpurush">
              <ShoppingBag className="w-2.5 h-2.5" />
              <span>{lang === "bn" ? "বাজারে অ্যাভেইলেবল" : "Available in Market"}</span>
            </span>
          )}
        </div>

        {/* Top-Right Country Flag Badge */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <CountryFlag country={countryCode} className="w-5 h-3.5 shadow-md" />
        </div>

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
          <span className="bg-[#d4ff33] text-black font-mono text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-1 font-kalpurush">
            <span>{lang === "bn" ? "প্যাকেজিং দেখুন" : "Explore Pack"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Detail Footer */}
      <div className="p-3.5 border-t border-[#1c202c] bg-[#0c0e15]">
        <div className="flex items-center justify-between text-[9px] text-[#8c93a8] mb-1">
          <span className="truncate text-[#d4ff33] font-semibold font-kalpurush">
            {client || "PRAN-RFL Group"}
          </span>
          <span className="font-mono">{project.year}</span>
        </div>
        <h4 className="font-heading font-headline text-xs sm:text-sm font-bold text-[#f3f4f8] truncate group-hover:text-[#d4ff33] transition-colors">
          {title}
        </h4>
      </div>
    </Link>
  );
}
