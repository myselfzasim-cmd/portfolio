"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowUpRight, Globe, ShoppingBag } from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
  const { lang } = useLanguage();

  const title = lang === "bn" && project.bn?.title ? project.bn.title : project.en.title;
  const client = lang === "bn" && project.bn?.client ? project.bn.client : project.en.client;
  const summary = lang === "bn" && project.bn?.summary ? project.bn.summary : project.en.summary;

  return (
    <article className="group bg-white border border-[#0b0b0a] hover:shadow-[10px_10px_0px_#0b0b0a] transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Cover / Thumbnail */}
      <Link href={`/project/${project.id}`} className="block relative aspect-[4/3] bg-[#111] overflow-hidden">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[#70716b]">
            No Thumbnail
          </div>
        )}

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="bg-[#0b0b0a] text-white font-mono text-[9px] font-semibold uppercase px-2 py-1">
            {project.category}
          </span>
          {project.exportRegion && (
            <span className="bg-[#2b59ff] text-white font-mono text-[9px] font-semibold uppercase px-2 py-1 flex items-center gap-1">
              <Globe className="w-2.5 h-2.5" />
              <span>Export</span>
            </span>
          )}
          {project.marketStatus && (
            <span className="bg-[#caff39] text-[#0b0b0a] font-mono text-[9px] font-bold uppercase px-2 py-1 flex items-center gap-1">
              <ShoppingBag className="w-2.5 h-2.5" />
              <span>On Shelf</span>
            </span>
          )}
        </div>
      </Link>

      {/* Details Card */}
      <div className="p-6 flex flex-col justify-between flex-grow border-t border-[#0b0b0a]">
        <div>
          <div className="flex items-center justify-between font-mono text-[11px] text-[#70716b] mb-2">
            <span>{client || "PRAN-RFL Group"}</span>
            <span>{project.year}</span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#0b0b0a] group-hover:text-[#2b59ff] transition-colors leading-tight">
            <Link href={`/project/${project.id}`}>{title}</Link>
          </h3>

          <p className="mt-3 text-sm text-[#70716b] line-clamp-2 leading-relaxed font-sans">
            {summary}
          </p>
        </div>

        {/* Footer info & CTA */}
        <div className="mt-6 pt-4 border-t border-[#d8d4ca] flex items-center justify-between font-mono text-xs">
          <span className="text-[#0b0b0a] font-semibold flex items-center gap-1">
            <span>5-Phase Journey</span>
          </span>
          <Link
            href={`/project/${project.id}`}
            className="flex items-center gap-1 text-[#0b0b0a] group-hover:translate-x-1 transition-transform font-bold"
          >
            <span>{lang === "en" ? "View Case Study" : "কেস স্টাডি দেখুন"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
