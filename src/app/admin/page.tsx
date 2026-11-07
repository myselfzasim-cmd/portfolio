"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project, SiteData, JourneyStep, BrandRecommendation, GalleryItem } from "@/lib/types";
import AdminBrandsTab from "@/components/admin/AdminBrandsTab";
import AdminGalleryTab from "@/components/admin/AdminGalleryTab";
import {
  ArrowLeft,
  Check,
  Copy,
  Eye,
  Globe,
  Image as ImageIcon,
  Layers,
  Lock,
  LogOut,
  Plus,
  RefreshCw,
  Save,
  ShoppingBag,
  Trash2,
  Upload,
  User,
} from "lucide-react";

const PHASE_DEFAULTS = [
  { type: "brief", labelEn: "01 / The Brief & Market Challenge", labelBn: "০১ / ক্লায়েন্ট ব্রিফ ও বাজার পরিস্থিতি" },
  { type: "framework", labelEn: "02 / Dieline Blueprint & Sketches", labelBn: "০২ / ডাই-লাইন ব্লুপ্রিন্ট ও প্রাথমিক স্কেচ" },
  { type: "design", labelEn: "03 / Final 3D Packaging Look", labelBn: "০৩ / ৩ডি প্যাকেজিং রেন্ডার ও ফাইনাল লুক" },
  { type: "feedback", labelEn: "04 / Print & Technical Specs", labelBn: "০৪ / প্রিন্টিং টেকনিক্যাল স্পেসিফিকেশন" },
  { type: "final", labelEn: "05 / Supermarket Reality & Shelf Presence", labelBn: "০৫ / সুপারমার্কেট ডিসপ্লে ও বাস্তব পণ্য" },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"projects" | "brands" | "gallery" | "profile">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [brands, setBrands] = useState<BrandRecommendation[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Show temporary status flash
  const flash = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // Check auth status
  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(!!data.authenticated);
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  // Fetch projects, site data, brands, and gallery once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
      loadSiteData();
      loadBrands();
      loadGalleryItems();
    }
  }, [isAuthenticated]);

  const loadBrands = async () => {
    try {
      const res = await fetch("/api/brands");
      const data = await res.json();
      if (Array.isArray(data)) {
        setBrands(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadGalleryItems = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (Array.isArray(data)) {
        setGalleryItems(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const loadProjects = async () => {
    try {
      const res = await fetch("/api/projects?all=true");
      const data = await res.json();
      if (Array.isArray(data)) {
        setProjects(data);
        if (data.length > 0 && !selectedProjectId) {
          selectProject(data[0]);
        }
      }
    } catch (err) {
      flash("Failed to load projects");
    }
  };

  const loadSiteData = async () => {
    try {
      const res = await fetch("/api/site");
      const data = await res.json();
      setSiteData(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        flash("Welcome to Admin Studio");
      } else {
        setLoginError(data.error || "Invalid password");
      }
    } catch (err) {
      setLoginError("Login failed");
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    setIsAuthenticated(false);
  };

  // Select project to edit
  const selectProject = (project: Project) => {
    setSelectedProjectId(project.id);
    // clone deep
    setCurrentProject(JSON.parse(JSON.stringify(project)));
  };

  // Create new blank project
  const handleNewProject = () => {
    const timestamp = Date.now();
    const newP: Project = {
      id: `project-${timestamp.toString().slice(-6)}`,
      featured: false,
      published: true,
      year: new Date().getFullYear().toString(),
      category: "Packaging",
      marketStatus: "In Supermarkets (Live)",
      exportRegion: "Local & Export",
      thumbnail: "",
      coverImage: "",
      gallery: [],
      dielineSpecs: {
        type: "Stand-Up Pouch / Doypack",
        dimensions: "",
        material: "BOPP / Met-PET / Polyethylene",
        printProcess: "8-Color Rotogravure Printing",
        specialFinishing: "Registered Matte Lacquer with Spot Gloss",
      },
      en: {
        title: "New Packaging Project",
        client: "PRAN-RFL Group",
        summary: "Commercial packaging design and dieline artwork engineered for mass FMCG production.",
        role: "Senior Packaging Designer",
        tools: "Illustrator · Dieline CAD · 3D Pack · Pre-Press",
        brief: "",
        problem: "",
        thinking: "",
        direction: "",
        solution: "",
        production: "",
        mockup: "",
        feedback: "",
        result: "",
      },
      bn: {
        title: "নতুন প্যাকেজিং প্রজেক্ট",
        client: "প্রাণ-আরএফএল গ্রুপ",
        summary: "বাণিজ্যিক প্যাকেজিং ডিজাইন এবং ডাই-লাইন আর্টওয়ার্ক।",
        role: "প্যাকেজিং ডিজাইনার",
        tools: "প্যাকেজিং · ডাইলাইন · ৩ডি",
        brief: "",
        problem: "",
        thinking: "",
        direction: "",
        solution: "",
        production: "",
        mockup: "",
        feedback: "",
        result: "",
      },
      journey: {
        en: PHASE_DEFAULTS.map((p, i) => ({
          id: `step-${i + 1}`,
          type: p.type as JourneyStep["type"],
          title: p.labelEn,
          date: new Date().toISOString().split("T")[0],
          image: "",
          imageAlt: "",
          description: "",
          sourceUrl: "",
          sourceLabel: "View Blueprint",
        })),
        bn: PHASE_DEFAULTS.map((p, i) => ({
          id: `step-${i + 1}`,
          type: p.type as JourneyStep["type"],
          title: p.labelBn,
          date: new Date().toISOString().split("T")[0],
          image: "",
          imageAlt: "",
          description: "",
        })),
      },
    };

    setSelectedProjectId(newP.id);
    setCurrentProject(newP);
  };

  // Direct Image Upload
  const handleFileUpload = async (
    file: File,
    onSuccess: (url: string) => void
  ) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onSuccess(data.url);
        flash(`Uploaded: ${file.name}`);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Save Project
  const handleSaveProject = async () => {
    if (!currentProject) return;
    if (!currentProject.id || !currentProject.en.title) {
      alert("Project ID and English Title are required.");
      return;
    }

    try {
      const isExisting = projects.some((p) => p.id === currentProject.id);
      const url = isExisting
        ? `/api/projects/${currentProject.id}`
        : "/api/projects";
      const method = isExisting ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProject),
      });

      const data = await res.json();
      if (res.ok) {
        flash("Project saved & published live!");
        loadProjects();
      } else {
        alert("Error saving: " + data.error);
      }
    } catch (err) {
      alert("Failed to save project");
    }
  };

  // Delete Project
  const handleDeleteProject = async () => {
    if (!currentProject) return;
    if (
      !confirm(
        `Are you sure you want to delete "${currentProject.en.title}"? This cannot be undone.`
      )
    )
      return;

    try {
      const res = await fetch(`/api/projects/${currentProject.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        flash("Project deleted");
        setSelectedProjectId(null);
        setCurrentProject(null);
        loadProjects();
      }
    } catch (err) {
      alert("Failed to delete");
    }
  };

  // Duplicate Project
  const handleDuplicateProject = () => {
    if (!currentProject) return;
    const copy: Project = JSON.parse(JSON.stringify(currentProject));
    copy.id = `${copy.id}-copy-${Date.now().toString().slice(-4)}`;
    copy.en.title = `${copy.en.title} (Copy)`;
    copy.bn.title = `${copy.bn.title} (কপি)`;
    setSelectedProjectId(copy.id);
    setCurrentProject(copy);
    flash("Duplicated. Click Save to publish.");
  };

  // Save Site Data
  const handleSaveSiteData = async () => {
    if (!siteData) return;
    try {
      const res = await fetch("/api/site", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteData),
      });
      if (res.ok) {
        flash("Profile & site credentials updated!");
      }
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  // RENDER: Login Screen
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-[#0b0b0a] text-white flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#141414] border border-[#333] shadow-[8px_8px_0px_#caff39] p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#caff39] text-[#0b0b0a] font-mono font-bold text-xs flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </span>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-[#a0a09a]">
                STUDIO ADMIN
              </h2>
              <h1 className="font-serif text-2xl font-bold text-white">
                Packaging Content Manager
              </h1>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-mono text-xs text-[#a0a09a] block mb-2 uppercase">
                Access Password:
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-3 bg-[#1e1e1e] border border-[#444] text-white font-mono text-sm focus:outline-none focus:border-[#caff39]"
                autoFocus
              />
              <span className="font-mono text-[10px] text-[#70716b] block mt-1">
                Default password: <code className="text-[#caff39]">zasim@pran2026</code>
              </span>
            </div>

            {loginError && (
              <p className="font-mono text-xs text-[#ff4a36] bg-[#ff4a36]/10 p-2 border border-[#ff4a36]/30">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#caff39] text-[#0b0b0a] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors"
            >
              Sign In to Studio
            </button>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="font-mono text-xs text-[#70716b] hover:text-white"
              >
                ← Back to public website
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center font-mono text-xs text-[#70716b]">
        Verifying admin session...
      </div>
    );
  }

  // RENDER: Admin Studio Dashboard
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#0b0b0a]">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#0b0b0a] text-white border-b border-[#222] px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 hover:text-[#caff39] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider">
              Live Site
            </span>
          </Link>
          <span className="text-[#444]">|</span>
          <span className="font-mono text-xs text-[#caff39] font-bold">
            ZASIM STUDIO ADMIN
          </span>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-3">
          {statusMessage && (
            <span className="bg-[#caff39] text-[#0b0b0a] font-mono text-xs font-bold px-3 py-1 animate-pulse">
              {statusMessage}
            </span>
          )}

          <button
            onClick={() => setActiveTab("projects")}
            className={`font-mono text-xs px-3 py-1.5 uppercase transition-colors ${
              activeTab === "projects"
                ? "bg-white text-[#0b0b0a] font-bold"
                : "text-[#a0a09a] hover:text-white"
            }`}
          >
            Projects ({projects.length})
          </button>

          <button
            onClick={() => setActiveTab("brands")}
            className={`font-mono text-xs px-3 py-1.5 uppercase transition-colors ${
              activeTab === "brands"
                ? "bg-white text-[#0b0b0a] font-bold"
                : "text-[#a0a09a] hover:text-white"
            }`}
          >
            Brands &amp; Testimonials ({brands.length})
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`font-mono text-xs px-3 py-1.5 uppercase transition-colors ${
              activeTab === "gallery"
                ? "bg-white text-[#0b0b0a] font-bold"
                : "text-[#a0a09a] hover:text-white"
            }`}
          >
            Photo Gallery ({galleryItems.length})
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`font-mono text-xs px-3 py-1.5 uppercase transition-colors ${
              activeTab === "profile"
                ? "bg-white text-[#0b0b0a] font-bold"
                : "text-[#a0a09a] hover:text-white"
            }`}
          >
            Profile &amp; Bio
          </button>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="p-1.5 text-[#a0a09a] hover:text-[#ff4a36] transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      {activeTab === "projects" ? (
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-50px)]">
          {/* SIDEBAR: Project List */}
          <aside className="w-full lg:w-80 bg-white border-r border-[#0b0b0a] p-4 flex flex-col justify-between">
            <div className="space-y-4">
              <button
                onClick={handleNewProject}
                className="w-full py-3 bg-[#0b0b0a] text-white hover:bg-[#caff39] hover:text-[#0b0b0a] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#0b0b0a] shadow-[4px_4px_0px_#caff39] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>New Project</span>
              </button>

              <div className="pt-2 font-mono text-[10px] uppercase text-[#70716b] tracking-wider">
                Select Project to Edit:
              </div>

              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {projects.map((p) => {
                  const isSelected = p.id === currentProject?.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => selectProject(p)}
                      className={`w-full text-left p-3 border transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-[#0b0b0a] text-white border-[#0b0b0a] shadow-[4px_4px_0px_#caff39]"
                          : "bg-[#f4f1ea] border-[#d8d4ca] text-[#0b0b0a] hover:border-[#0b0b0a]"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <strong className="block font-serif text-sm truncate">
                          {p.en?.title || "Untitled"}
                        </strong>
                        <span className="font-mono text-[10px] text-[#70716b] block">
                          {p.category} · {p.year}
                        </span>
                      </div>
                      {p.published === false && (
                        <span className="font-mono text-[9px] bg-[#ff4a36] text-white px-1.5 py-0.5">
                          DRAFT
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick backup tip */}
            <div className="pt-6 border-t border-[#d8d4ca] font-mono text-[10px] text-[#70716b] space-y-1">
              <span>Automatic cloud &amp; file sync active.</span>
              <p className="text-[9px]">Every save is instant and public.</p>
            </div>
          </aside>

          {/* MAIN FORM: Project Editor */}
          <main className="flex-1 p-6 lg:p-10 max-w-5xl">
            {currentProject ? (
              <div className="space-y-10">
                {/* Form Header & Action Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#0b0b0a]">
                  <div>
                    <span className="font-mono text-xs text-[#70716b] uppercase">
                      Editing Project: {currentProject.id}
                    </span>
                    <h2 className="font-serif text-3xl font-bold text-[#0b0b0a]">
                      {currentProject.en.title || "Untitled Project"}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/project/${currentProject.id}`}
                      target="_blank"
                      className="px-4 py-2.5 bg-white border border-[#0b0b0a] font-mono text-xs font-semibold hover:bg-[#f4f1ea] flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </Link>

                    <button
                      onClick={handleDuplicateProject}
                      title="Duplicate this project"
                      className="px-4 py-2.5 bg-white border border-[#0b0b0a] font-mono text-xs font-semibold hover:bg-[#f4f1ea] flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Duplicate</span>
                    </button>

                    <button
                      onClick={handleDeleteProject}
                      title="Delete project"
                      className="px-4 py-2.5 bg-[#ff4a36] text-white border border-[#0b0b0a] font-mono text-xs font-semibold hover:bg-black flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>

                    <button
                      onClick={handleSaveProject}
                      className="px-6 py-2.5 bg-[#0b0b0a] text-white hover:bg-[#caff39] hover:text-[#0b0b0a] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#0b0b0a] shadow-[4px_4px_0px_#caff39] transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save &amp; Publish</span>
                    </button>
                  </div>
                </div>

                {/* 01: Core Identification */}
                <section className="bg-white border border-[#0b0b0a] p-6 shadow-[6px_6px_0px_#0b0b0a] space-y-6">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#2b59ff] border-b border-[#d8d4ca] pb-2">
                    01 / Project Core Identity
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
                    <div>
                      <label className="block text-[#70716b] mb-1">Project Slug/ID</label>
                      <input
                        type="text"
                        value={currentProject.id}
                        onChange={(e) =>
                          setCurrentProject({ ...currentProject, id: e.target.value })
                        }
                        className="w-full p-2 border border-[#0b0b0a] font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[#70716b] mb-1">Category</label>
                      <input
                        type="text"
                        value={currentProject.category}
                        onChange={(e) =>
                          setCurrentProject({ ...currentProject, category: e.target.value })
                        }
                        placeholder="Packaging, Label, Box..."
                        className="w-full p-2 border border-[#0b0b0a] font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[#70716b] mb-1">Year</label>
                      <input
                        type="text"
                        value={currentProject.year}
                        onChange={(e) =>
                          setCurrentProject({ ...currentProject, year: e.target.value })
                        }
                        className="w-full p-2 border border-[#0b0b0a] font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[#70716b] mb-1">Market Status</label>
                      <select
                        value={currentProject.marketStatus || "In Supermarkets (Live)"}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            marketStatus: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-[#0b0b0a] font-mono text-xs bg-white"
                      >
                        <option value="In Supermarkets (Live)">In Supermarkets (Live)</option>
                        <option value="In Factory Production">In Factory Production</option>
                        <option value="Export Compliant">Export Compliant</option>
                        <option value="Brand Concept">Brand Concept</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-[#70716b] block mb-1">
                        Title — English (Required)
                      </label>
                      <input
                        type="text"
                        value={currentProject.en.title}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            en: { ...currentProject.en, title: e.target.value },
                          })
                        }
                        className="w-full p-2.5 border border-[#0b0b0a] font-serif text-lg font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs text-[#70716b] block mb-1">
                        Title — বাংলা
                      </label>
                      <input
                        type="text"
                        value={currentProject.bn?.title || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            bn: { ...currentProject.bn, title: e.target.value },
                          })
                        }
                        className="w-full p-2.5 border border-[#0b0b0a] font-sans text-base"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-[#70716b] block mb-1">
                        Client / Brand (e.g. PRAN Foods Ltd.)
                      </label>
                      <input
                        type="text"
                        value={currentProject.en.client}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            en: { ...currentProject.en, client: e.target.value },
                          })
                        }
                        className="w-full p-2 border border-[#0b0b0a] font-mono text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs text-[#70716b] block mb-1">
                        Export Region (e.g. GCC / Middle East, UK)
                      </label>
                      <input
                        type="text"
                        value={currentProject.exportRegion || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            exportRegion: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-[#0b0b0a] font-mono text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs text-[#70716b] block mb-1">
                      Summary (Overview of the project)
                    </label>
                    <textarea
                      rows={2}
                      value={currentProject.en.summary}
                      onChange={(e) =>
                        setCurrentProject({
                          ...currentProject,
                          en: { ...currentProject.en, summary: e.target.value },
                        })
                      }
                      className="w-full p-2 border border-[#0b0b0a] font-sans text-sm"
                    />
                  </div>

                  <div className="flex gap-6 font-mono text-xs pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentProject.featured}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            featured: e.target.checked,
                          })
                        }
                        className="w-4 h-4 accent-[#0b0b0a]"
                      />
                      <span className="font-bold">Feature on Homepage</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentProject.published !== false}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            published: e.target.checked,
                          })
                        }
                        className="w-4 h-4 accent-[#0b0b0a]"
                      />
                      <span className="font-bold text-[#10b981]">Published Live</span>
                    </label>
                  </div>
                </section>

                {/* 02: Visuals & Cover Upload */}
                <section className="bg-white border border-[#0b0b0a] p-6 shadow-[6px_6px_0px_#0b0b0a] space-y-6">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#2b59ff] border-b border-[#d8d4ca] pb-2">
                    02 / Cover &amp; Thumbnail Images
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Thumbnail */}
                    <div className="space-y-3">
                      <span className="font-mono text-xs font-bold uppercase block">
                        Thumbnail (Grid Card View)
                      </span>
                      <div className="relative aspect-[4/3] bg-[#111] border border-[#0b0b0a] flex items-center justify-center overflow-hidden">
                        {currentProject.thumbnail ? (
                          <Image
                            src={currentProject.thumbnail}
                            alt="Thumbnail preview"
                            fill
                            className="object-contain p-2"
                          />
                        ) : (
                          <span className="font-mono text-xs text-[#70716b]">
                            No image selected
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer px-3 py-2 bg-[#0b0b0a] text-white font-mono text-xs font-semibold flex items-center gap-1.5 hover:bg-[#caff39] hover:text-[#0b0b0a] transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (url) => {
                                  setCurrentProject({
                                    ...currentProject,
                                    thumbnail: url,
                                  });
                                });
                              }
                            }}
                          />
                        </label>
                        <input
                          type="text"
                          placeholder="or paste image URL..."
                          value={currentProject.thumbnail}
                          onChange={(e) =>
                            setCurrentProject({
                              ...currentProject,
                              thumbnail: e.target.value,
                            })
                          }
                          className="flex-1 p-2 border border-[#d8d4ca] font-mono text-xs"
                        />
                      </div>
                    </div>

                    {/* Big Cover */}
                    <div className="space-y-3">
                      <span className="font-mono text-xs font-bold uppercase block">
                        Full-Width Hero Cover
                      </span>
                      <div className="relative aspect-[4/3] bg-[#111] border border-[#0b0b0a] flex items-center justify-center overflow-hidden">
                        {currentProject.coverImage ? (
                          <Image
                            src={currentProject.coverImage}
                            alt="Cover preview"
                            fill
                            className="object-contain p-2"
                          />
                        ) : (
                          <span className="font-mono text-xs text-[#70716b]">
                            No image selected
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="cursor-pointer px-3 py-2 bg-[#0b0b0a] text-white font-mono text-xs font-semibold flex items-center gap-1.5 hover:bg-[#caff39] hover:text-[#0b0b0a] transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleFileUpload(file, (url) => {
                                  setCurrentProject({
                                    ...currentProject,
                                    coverImage: url,
                                  });
                                });
                              }
                            }}
                          />
                        </label>
                        <input
                          type="text"
                          placeholder="or paste image URL..."
                          value={currentProject.coverImage}
                          onChange={(e) =>
                            setCurrentProject({
                              ...currentProject,
                              coverImage: e.target.value,
                            })
                          }
                          className="flex-1 p-2 border border-[#d8d4ca] font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* 03: The 5-Phase Commercial Packaging Journey */}
                <section className="bg-white border border-[#0b0b0a] p-6 shadow-[6px_6px_0px_#0b0b0a] space-y-8">
                  <div className="border-b border-[#d8d4ca] pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#2b59ff]">
                        03 / The 5-Phase Packaging Journey
                      </h3>
                      <p className="font-mono text-[11px] text-[#70716b] mt-0.5">
                        Brief → Dieline &amp; Sketches → 3D Render → Print Specs → Supermarket Shelf
                      </p>
                    </div>
                  </div>

                  <div className="space-y-8">
                    {PHASE_DEFAULTS.map((def, idx) => {
                      const stepEn = currentProject.journey?.en?.[idx] || {
                        id: `step-${idx + 1}`,
                        type: def.type as JourneyStep["type"],
                        title: def.labelEn,
                        date: "",
                        image: "",
                        description: "",
                      };

                      return (
                        <div
                          key={idx}
                          className="p-5 border border-[#0b0b0a] bg-[#f4f1ea] space-y-4"
                        >
                          <div className="flex items-center justify-between border-b border-[#d8d4ca] pb-2">
                            <strong className="font-mono text-xs uppercase font-bold text-[#0b0b0a]">
                              PHASE 0{idx + 1}: {def.labelEn}
                            </strong>
                            <span className="font-mono text-[10px] bg-[#0b0b0a] text-white px-2 py-0.5 uppercase">
                              {def.type}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                            {/* Phase Image Upload Screen */}
                            <div className="sm:col-span-4 space-y-2">
                              <div className="relative aspect-[4/3] bg-[#111] border border-[#0b0b0a] overflow-hidden flex items-center justify-center">
                                {stepEn.image ? (
                                  <Image
                                    src={stepEn.image}
                                    alt="Phase preview"
                                    fill
                                    className="object-contain p-2"
                                  />
                                ) : (
                                  <span className="font-mono text-[10px] text-[#70716b]">
                                    Upload phase photo
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                <label className="cursor-pointer w-full py-1.5 bg-[#0b0b0a] text-white font-mono text-[10px] font-semibold text-center hover:bg-[#caff39] hover:text-[#0b0b0a] block">
                                  <span>Choose File</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        handleFileUpload(file, (url) => {
                                          const updatedJourney = {
                                            ...currentProject.journey,
                                          };
                                          if (!updatedJourney.en) updatedJourney.en = [];
                                          updatedJourney.en[idx] = {
                                            ...stepEn,
                                            image: url,
                                          };
                                          setCurrentProject({
                                            ...currentProject,
                                            journey: updatedJourney,
                                          });
                                        });
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>

                            {/* Phase Details Inputs */}
                            <div className="sm:col-span-8 space-y-3 font-mono text-xs">
                              <div>
                                <label className="block text-[#70716b] text-[10px] uppercase mb-1">
                                  Phase Title:
                                </label>
                                <input
                                  type="text"
                                  value={stepEn.title}
                                  onChange={(e) => {
                                    const updatedJourney = { ...currentProject.journey };
                                    if (!updatedJourney.en) updatedJourney.en = [];
                                    updatedJourney.en[idx] = {
                                      ...stepEn,
                                      title: e.target.value,
                                    };
                                    setCurrentProject({
                                      ...currentProject,
                                      journey: updatedJourney,
                                    });
                                  }}
                                  className="w-full p-2 border border-[#0b0b0a] bg-white font-serif text-sm font-bold"
                                />
                              </div>

                              <div>
                                <label className="block text-[#70716b] text-[10px] uppercase mb-1">
                                  Description / Insights:
                                </label>
                                <textarea
                                  rows={3}
                                  value={stepEn.description}
                                  onChange={(e) => {
                                    const updatedJourney = { ...currentProject.journey };
                                    if (!updatedJourney.en) updatedJourney.en = [];
                                    updatedJourney.en[idx] = {
                                      ...stepEn,
                                      description: e.target.value,
                                    };
                                    setCurrentProject({
                                      ...currentProject,
                                      journey: updatedJourney,
                                    });
                                  }}
                                  placeholder="Explain the technical decisions, dieline blueprint, print cylinder choices, or supermarket shelf observations..."
                                  className="w-full p-2 border border-[#0b0b0a] bg-white font-sans text-xs leading-relaxed"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* 04: Story Notes & Technical Specs */}
                <section className="bg-white border border-[#0b0b0a] p-6 shadow-[6px_6px_0px_#0b0b0a] space-y-6">
                  <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#2b59ff] border-b border-[#d8d4ca] pb-2">
                    04 / Factory Printing &amp; Dieline Specs
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div>
                      <label className="block text-[#70716b] mb-1">Packaging Format</label>
                      <input
                        type="text"
                        value={currentProject.dielineSpecs?.type || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            dielineSpecs: {
                              ...currentProject.dielineSpecs,
                              type: e.target.value,
                            },
                          })
                        }
                        placeholder="e.g. Stand-Up Pouch, Wrap-around PET Label"
                        className="w-full p-2 border border-[#0b0b0a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#70716b] mb-1">Material / Substrates</label>
                      <input
                        type="text"
                        value={currentProject.dielineSpecs?.material || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            dielineSpecs: {
                              ...currentProject.dielineSpecs,
                              material: e.target.value,
                            },
                          })
                        }
                        placeholder="e.g. Matte BOPP / Met-PET / Polyethylene"
                        className="w-full p-2 border border-[#0b0b0a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#70716b] mb-1">Printing Process</label>
                      <input
                        type="text"
                        value={currentProject.dielineSpecs?.printProcess || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            dielineSpecs: {
                              ...currentProject.dielineSpecs,
                              printProcess: e.target.value,
                            },
                          })
                        }
                        placeholder="e.g. 8-Color Rotogravure Printing"
                        className="w-full p-2 border border-[#0b0b0a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#70716b] mb-1">Special Finishing / Lacquers</label>
                      <input
                        type="text"
                        value={currentProject.dielineSpecs?.specialFinishing || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            dielineSpecs: {
                              ...currentProject.dielineSpecs,
                              specialFinishing: e.target.value,
                            },
                          })
                        }
                        placeholder="e.g. Registered Matte Lacquer, Spot Gloss, Gold Foil"
                        className="w-full p-2 border border-[#0b0b0a]"
                      />
                    </div>
                  </div>

                  {/* Story Notes */}
                  <div className="space-y-4 pt-4 border-t border-[#d8d4ca]">
                    <div>
                      <label className="font-mono text-xs text-[#70716b] block mb-1">
                        Client Brief &amp; Context:
                      </label>
                      <textarea
                        rows={3}
                        value={currentProject.en.brief || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            en: { ...currentProject.en, brief: e.target.value },
                          })
                        }
                        className="w-full p-2 border border-[#0b0b0a] font-sans text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs text-[#70716b] block mb-1">
                        The Supermarket Shelf Challenge:
                      </label>
                      <textarea
                        rows={3}
                        value={currentProject.en.problem || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            en: { ...currentProject.en, problem: e.target.value },
                          })
                        }
                        className="w-full p-2 border border-[#0b0b0a] font-sans text-xs"
                      />
                    </div>

                    <div>
                      <label className="font-mono text-xs text-[#70716b] block mb-1">
                        Commercial Market Result (Shelf Presence &amp; Sales):
                      </label>
                      <textarea
                        rows={3}
                        value={currentProject.en.result || ""}
                        onChange={(e) =>
                          setCurrentProject({
                            ...currentProject,
                            en: { ...currentProject.en, result: e.target.value },
                          })
                        }
                        className="w-full p-2 border border-[#0b0b0a] font-sans text-xs"
                      />
                    </div>
                  </div>
                </section>

                {/* Bottom Save Bar */}
                <div className="pt-4 flex justify-end gap-4">
                  <button
                    onClick={handleSaveProject}
                    className="px-8 py-4 bg-[#0b0b0a] text-white hover:bg-[#caff39] hover:text-[#0b0b0a] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#0b0b0a] shadow-[6px_6px_0px_#caff39] transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save &amp; Publish Project</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-24 text-center">
                <span className="font-mono text-xs text-[#70716b]">
                  Select a project from the left sidebar or click &quot;New Project&quot;.
                </span>
              </div>
            )}
          </main>
        </div>
      ) : activeTab === "brands" ? (
        <AdminBrandsTab
          brands={brands}
          onRefresh={loadBrands}
          onFlash={flash}
          onFileUpload={handleFileUpload}
          uploading={uploading}
        />
      ) : activeTab === "gallery" ? (
        <AdminGalleryTab
          items={galleryItems}
          onRefresh={loadGalleryItems}
          onFlash={flash}
          onFileUpload={handleFileUpload}
          uploading={uploading}
        />
      ) : (
        /* PROFILE & SITE CREDENTIALS TAB */
        <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-8">
          <div className="pb-6 border-b border-[#0b0b0a]">
            <span className="font-mono text-xs text-[#70716b] uppercase">
              Profile Management
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0b0b0a]">
              Designer Credentials &amp; Bio
            </h2>
          </div>

          {siteData ? (
            <div className="space-y-6 bg-white border border-[#0b0b0a] p-8 shadow-[8px_8px_0px_#0b0b0a]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="block text-[#70716b] mb-1">Your Full Name</label>
                  <input
                    type="text"
                    value={siteData.en.name}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        en: { ...siteData.en, name: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={siteData.en.experienceCompany}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        en: { ...siteData.en, experienceCompany: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Professional Role</label>
                  <input
                    type="text"
                    value={siteData.en.experienceRole}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        en: { ...siteData.en, experienceRole: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Email for Inquiries</label>
                  <input
                    type="email"
                    value={siteData.en.email}
                    onChange={(e) =>
                      setSiteData({
                        ...siteData,
                        en: { ...siteData.en, email: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-xs text-[#70716b] block mb-1">
                  Professional Bio:
                </label>
                <textarea
                  rows={4}
                  value={siteData.en.aboutBody}
                  onChange={(e) =>
                    setSiteData({
                      ...siteData,
                      en: { ...siteData.en, aboutBody: e.target.value },
                    })
                  }
                  className="w-full p-2.5 border border-[#0b0b0a] font-sans text-sm"
                />
              </div>

              <div className="pt-4 border-t border-[#d8d4ca] flex justify-end">
                <button
                  onClick={handleSaveSiteData}
                  className="px-6 py-3 bg-[#0b0b0a] text-white hover:bg-[#caff39] hover:text-[#0b0b0a] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#0b0b0a] shadow-[4px_4px_0px_#caff39] transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Profile Data</span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
