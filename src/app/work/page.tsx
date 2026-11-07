"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/lib/types";
import { useLanguage } from "@/lib/LanguageContext";
import { Filter, Layers, Search } from "lucide-react";

export default function WorkPage() {
  const { lang } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
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

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();

    const titleEn = p.en?.title?.toLowerCase() || "";
    const titleBn = p.bn?.title?.toLowerCase() || "";
    const client = p.en?.client?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      titleEn.includes(query) || titleBn.includes(query) || client.includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f1ea]">
      <Navbar />

      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="border-b border-[#0b0b0a] pb-8 mb-12">
            <span className="font-mono text-xs tracking-widest text-[#70716b] uppercase block">
              COMPLETE PORTFOLIO ARCHIVE
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-black text-[#0b0b0a] mt-2">
              Packaging &amp; FMCG Works.
            </h1>
            <p className="font-mono text-xs text-[#70716b] mt-4 max-w-xl leading-relaxed">
              Every piece engineered for consumer interaction, retail visibility, and flawless high-speed factory packaging.
            </p>
          </div>

          {/* Filters & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-[#d8d4ca]">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-[#70716b] mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-all border ${
                    selectedCategory === cat
                      ? "bg-[#0b0b0a] text-white border-[#0b0b0a] font-bold"
                      : "bg-white text-[#70716b] border-[#d8d4ca] hover:border-[#0b0b0a] hover:text-[#0b0b0a]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#70716b]" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#0b0b0a] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#caff39]"
              />
            </div>
          </div>

          {/* Grid of Projects */}
          {loading ? (
            <div className="py-24 text-center font-mono text-xs text-[#70716b]">
              Loading packaging projects...
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center bg-white border border-[#0b0b0a] p-12">
              <Layers className="w-12 h-12 mx-auto text-[#70716b] mb-4 opacity-50" />
              <h3 className="font-serif text-xl font-bold text-[#0b0b0a]">
                No projects matched your criteria
              </h3>
              <p className="font-mono text-xs text-[#70716b] mt-2">
                Try selecting &apos;All&apos; or clearing your search query.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
