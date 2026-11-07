"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BrandRecommendation } from "@/lib/types";
import {
  Plus,
  Trash2,
  Save,
  Upload,
  CheckCircle2,
  Phone,
  Building2,
  Briefcase,
  Quote,
  Sparkles,
} from "lucide-react";

interface Props {
  brands: BrandRecommendation[];
  onRefresh: () => void;
  onFlash: (msg: string) => void;
  onFileUpload: (file: File, onSuccess: (url: string) => void) => void;
  uploading: boolean;
}

export default function AdminBrandsTab({
  brands,
  onRefresh,
  onFlash,
  onFileUpload,
  uploading,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(
    brands.length > 0 ? brands[0].id : null
  );
  const [currentBrand, setCurrentBrand] = useState<BrandRecommendation | null>(
    brands.length > 0 ? JSON.parse(JSON.stringify(brands[0])) : null
  );

  const selectBrand = (b: BrandRecommendation) => {
    setSelectedId(b.id);
    setCurrentBrand(JSON.parse(JSON.stringify(b)));
  };

  const handleNewBrand = () => {
    const newB: BrandRecommendation = {
      id: `brand-${Date.now()}`,
      name: "New Brand",
      nameBn: "নতুন ব্র্যান্ডের নাম",
      parentCompany: "PRAN-RFL Group",
      category: "Consumer FMCG Packaging",
      categoryBn: "কনজিউমার এফএমসিজি প্যাকেজিং",
      logo: "/assets/img/brands/goodluck.svg",
      featured: true,
      order: brands.length + 1,
      yearWorked: "2024 — Present",
      manager: {
        name: "Brand Manager Name",
        nameBn: "ব্র্যান্ড ম্যানেজারের নাম",
        designation: "Senior Brand Manager",
        designationBn: "সিনিয়র ব্র্যান্ড ম্যানেজার",
        department: "Marketing & Brand Operations",
        departmentBn: "মার্কেটিং ও ব্র্যান্ড অপারেশন্স",
        company: "Brand Name Ltd.",
        companyBn: "ব্র্যান্ড নেম লি.",
        location: "PRAN-RFL Centre, Dhaka-1212",
        locationBn: "প্রাণ-আরএফএল সেন্টার, ঢাকা-১২১২",
        phone: "+880 1711-000000",
        email: "brand.manager@example.com",
      },
      endorsement: {
        en: "Zasim's pre-press precision and structural dieline engineering ensured zero cylinder register errors across our high-speed automated packaging runs.",
        bn: "জসিমের নিখুঁত প্রি-প্রেস দক্ষতা ও স্ট্রাকচারাল ডাইলাইন আর্কিটেকচার আমাদের হাই-স্পিড অটোমেটেড প্যাকেজিং লাইনে শতভাগ মসৃণ প্রোডাকশন নিশ্চিত করেছে।",
      },
      projectHighlight: {
        en: "Engineered high-speed wrap labels and corrugated master cartons.",
        bn: "হাই-স্পিড র্যাপ লেবেল এবং করোগেটেড মাস্টার কার্টন আর্টওয়ার্ক তৈরি।",
      },
    };
    setSelectedId(newB.id);
    setCurrentBrand(newB);
  };

  const handleSave = async () => {
    if (!currentBrand) return;
    if (!currentBrand.id || !currentBrand.name) {
      alert("Brand ID and Name are required");
      return;
    }

    try {
      const res = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentBrand),
      });

      if (res.ok) {
        onFlash("Brand Recommendation Saved!");
        onRefresh();
      } else {
        alert("Failed to save brand");
      }
    } catch (err) {
      alert("Error saving brand");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this brand and recommendation?")) return;

    try {
      const res = await fetch(`/api/brands/${id}`, { method: "DELETE" });
      if (res.ok) {
        onFlash("Brand deleted");
        onRefresh();
        if (selectedId === id) {
          const remaining = brands.filter((b) => b.id !== id);
          if (remaining.length > 0) {
            selectBrand(remaining[0]);
          } else {
            setSelectedId(null);
            setCurrentBrand(null);
          }
        }
      }
    } catch (err) {
      alert("Error deleting brand");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-50px)]">
      {/* SIDEBAR: Brands List */}
      <div className="w-full lg:w-80 bg-[#161614] border-r border-[#2c2c28] flex flex-col shrink-0">
        <div className="p-3 border-b border-[#2c2c28] flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            Brands ({brands.length})
          </span>
          <button
            onClick={handleNewBrand}
            className="flex items-center gap-1 bg-[#caff39] text-[#0b0b0a] font-mono text-[11px] font-bold px-2.5 py-1 hover:bg-white transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Brand</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#232320]">
          {brands.map((b) => {
            const isSelected = selectedId === b.id;
            return (
              <div
                key={b.id}
                onClick={() => selectBrand(b)}
                className={`p-3 cursor-pointer transition-colors flex items-center gap-3 ${
                  isSelected ? "bg-[#242420] border-l-4 border-[#caff39]" : "hover:bg-[#1c1c1a]"
                }`}
              >
                <div className="w-10 h-7 rounded bg-black/60 border border-white/10 p-0.5 flex items-center justify-center shrink-0 overflow-hidden">
                  <Image
                    src={b.logo}
                    alt={b.name}
                    width={40}
                    height={25}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-xs font-bold text-white truncate">{b.name}</p>
                  <p className="font-mono text-[10px] text-[#a0a09a] truncate">
                    {b.manager?.name} · {b.parentCompany}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN EDITOR */}
      <div className="flex-1 bg-[#f4f1ea] overflow-y-auto p-4 sm:p-8 text-[#0b0b0a]">
        {currentBrand ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Top Bar Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d8d4ca]">
              <div className="flex items-center gap-3">
                <div className="w-14 h-9 bg-black rounded p-1 border border-black/20 flex items-center justify-center overflow-hidden">
                  <Image
                    src={currentBrand.logo}
                    alt={currentBrand.name}
                    width={60}
                    height={32}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-sans">{currentBrand.name}</h2>
                  <p className="font-mono text-xs text-[#70716b]">
                    ID: {currentBrand.id} · {currentBrand.parentCompany}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(currentBrand.id)}
                  className="px-3 py-1.5 border border-[#ff4a36] text-[#ff4a36] hover:bg-[#ff4a36] hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-[#0b0b0a] text-white hover:bg-[#caff39] hover:text-[#0b0b0a] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#0b0b0a] shadow-[3px_3px_0px_#caff39] transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Brand</span>
                </button>
              </div>
            </div>

            {/* Section 1: Basic Brand Info */}
            <div className="bg-white border border-[#0b0b0a] p-5 space-y-4 shadow-[4px_4px_0px_rgba(0,0,0,0.06)]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b0b0a] pb-2 border-b border-[#eee]">
                01. Brand &amp; Company Info
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-[#70716b] mb-1">Brand Name (English):</label>
                  <input
                    type="text"
                    value={currentBrand.name}
                    onChange={(e) => setCurrentBrand({ ...currentBrand, name: e.target.value })}
                    className="w-full p-2 border border-[#0b0b0a] font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Brand Name (Bangla):</label>
                  <input
                    type="text"
                    value={currentBrand.nameBn || ""}
                    onChange={(e) => setCurrentBrand({ ...currentBrand, nameBn: e.target.value })}
                    className="w-full p-2 border border-[#0b0b0a] font-kalpurush text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Parent Company:</label>
                  <input
                    type="text"
                    value={currentBrand.parentCompany}
                    onChange={(e) =>
                      setCurrentBrand({ ...currentBrand, parentCompany: e.target.value })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                    placeholder="e.g. RFL Group / PRAN-RFL"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Years Worked:</label>
                  <input
                    type="text"
                    value={currentBrand.yearWorked || ""}
                    onChange={(e) =>
                      setCurrentBrand({ ...currentBrand, yearWorked: e.target.value })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                    placeholder="e.g. 2022 — Present"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Category (English):</label>
                  <input
                    type="text"
                    value={currentBrand.category}
                    onChange={(e) => setCurrentBrand({ ...currentBrand, category: e.target.value })}
                    className="w-full p-2 border border-[#0b0b0a]"
                    placeholder="e.g. School & Office Stationery"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Category (Bangla):</label>
                  <input
                    type="text"
                    value={currentBrand.categoryBn}
                    onChange={(e) =>
                      setCurrentBrand({ ...currentBrand, categoryBn: e.target.value })
                    }
                    className="w-full p-2 border border-[#0b0b0a] font-kalpurush"
                    placeholder="e.g. স্কুল ও অফিস স্টেশনারি"
                  />
                </div>
              </div>

              {/* Logo Upload Section */}
              <div className="pt-2">
                <label className="block text-[#70716b] text-xs font-mono mb-1">
                  Brand Logo (SVG or Image URL):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentBrand.logo}
                    onChange={(e) => setCurrentBrand({ ...currentBrand, logo: e.target.value })}
                    className="flex-1 p-2 border border-[#0b0b0a] font-mono text-xs"
                  />
                  <label className="px-4 py-2 bg-[#0b0b0a] text-white hover:bg-[#caff39] hover:text-[#0b0b0a] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploading ? "Uploading..." : "Upload Logo"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onFileUpload(file, (url) => {
                            setCurrentBrand({ ...currentBrand, logo: url });
                          });
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Section 2: Brand Manager Details & Verification Phone */}
            <div className="bg-white border border-[#0b0b0a] p-5 space-y-4 shadow-[4px_4px_0px_rgba(0,0,0,0.06)]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b0b0a] pb-2 border-b border-[#eee] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#2563eb]" />
                <span>02. Brand Manager &amp; Phone Verification</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-[#70716b] mb-1">Manager Name (English):</label>
                  <input
                    type="text"
                    value={currentBrand.manager.name}
                    onChange={(e) =>
                      setCurrentBrand({
                        ...currentBrand,
                        manager: { ...currentBrand.manager, name: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Manager Name (Bangla):</label>
                  <input
                    type="text"
                    value={currentBrand.manager.nameBn}
                    onChange={(e) =>
                      setCurrentBrand({
                        ...currentBrand,
                        manager: { ...currentBrand.manager, nameBn: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a] font-kalpurush"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Designation (English):</label>
                  <input
                    type="text"
                    value={currentBrand.manager.designation}
                    onChange={(e) =>
                      setCurrentBrand({
                        ...currentBrand,
                        manager: { ...currentBrand.manager, designation: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                    placeholder="e.g. Senior Brand Manager"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Designation (Bangla):</label>
                  <input
                    type="text"
                    value={currentBrand.manager.designationBn}
                    onChange={(e) =>
                      setCurrentBrand({
                        ...currentBrand,
                        manager: { ...currentBrand.manager, designationBn: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a] font-kalpurush"
                    placeholder="e.g. সিনিয়র ব্র্যান্ড ম্যানেজার"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Department (English):</label>
                  <input
                    type="text"
                    value={currentBrand.manager.department}
                    onChange={(e) =>
                      setCurrentBrand({
                        ...currentBrand,
                        manager: { ...currentBrand.manager, department: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Department (Bangla):</label>
                  <input
                    type="text"
                    value={currentBrand.manager.departmentBn}
                    onChange={(e) =>
                      setCurrentBrand({
                        ...currentBrand,
                        manager: { ...currentBrand.manager, departmentBn: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a] font-kalpurush"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1 text-blue-600 font-bold">
                    Direct Phone / Verification Number:
                  </label>
                  <input
                    type="text"
                    value={currentBrand.manager.phone}
                    onChange={(e) =>
                      setCurrentBrand({
                        ...currentBrand,
                        manager: { ...currentBrand.manager, phone: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-blue-500 font-bold bg-blue-50"
                    placeholder="e.g. +880 1713-389420"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Official Work Email:</label>
                  <input
                    type="email"
                    value={currentBrand.manager.email || ""}
                    onChange={(e) =>
                      setCurrentBrand({
                        ...currentBrand,
                        manager: { ...currentBrand.manager, email: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                    placeholder="e.g. tanvir@rflbd.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[#70716b] mb-1">
                    Corporate Office Address (English):
                  </label>
                  <input
                    type="text"
                    value={currentBrand.manager.location}
                    onChange={(e) =>
                      setCurrentBrand({
                        ...currentBrand,
                        manager: { ...currentBrand.manager, location: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[#70716b] mb-1">
                    Corporate Office Address (Bangla):
                  </label>
                  <input
                    type="text"
                    value={currentBrand.manager.locationBn}
                    onChange={(e) =>
                      setCurrentBrand({
                        ...currentBrand,
                        manager: { ...currentBrand.manager, locationBn: e.target.value },
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a] font-kalpurush"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Recommendation / Endorsement Text */}
            <div className="bg-white border border-[#0b0b0a] p-5 space-y-4 shadow-[4px_4px_0px_rgba(0,0,0,0.06)]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b0b0a] pb-2 border-b border-[#eee] flex items-center gap-2">
                <Quote className="w-4 h-4 text-[#eab308]" />
                <span>03. Recommendation &amp; Endorsement Quotes</span>
              </h3>

              <div>
                <label className="block text-[#70716b] text-xs font-mono mb-1">
                  Endorsement Quote (English):
                </label>
                <textarea
                  rows={4}
                  value={currentBrand.endorsement.en}
                  onChange={(e) =>
                    setCurrentBrand({
                      ...currentBrand,
                      endorsement: { ...currentBrand.endorsement, en: e.target.value },
                    })
                  }
                  className="w-full p-2.5 border border-[#0b0b0a] font-sans text-sm leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[#70716b] text-xs font-mono mb-1">
                  Endorsement Quote (Bangla):
                </label>
                <textarea
                  rows={4}
                  value={currentBrand.endorsement.bn}
                  onChange={(e) =>
                    setCurrentBrand({
                      ...currentBrand,
                      endorsement: { ...currentBrand.endorsement, bn: e.target.value },
                    })
                  }
                  className="w-full p-2.5 border border-[#0b0b0a] font-kalpurush text-sm leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-[#70716b] text-xs font-mono mb-1">
                  Packaging Project Highlight (English):
                </label>
                <input
                  type="text"
                  value={currentBrand.projectHighlight?.en || ""}
                  onChange={(e) =>
                    setCurrentBrand({
                      ...currentBrand,
                      projectHighlight: {
                        en: e.target.value,
                        bn: currentBrand.projectHighlight?.bn || "",
                      },
                    })
                  }
                  className="w-full p-2 border border-[#0b0b0a] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[#70716b] text-xs font-mono mb-1">
                  Packaging Project Highlight (Bangla):
                </label>
                <input
                  type="text"
                  value={currentBrand.projectHighlight?.bn || ""}
                  onChange={(e) =>
                    setCurrentBrand({
                      ...currentBrand,
                      projectHighlight: {
                        en: currentBrand.projectHighlight?.en || "",
                        bn: e.target.value,
                      },
                    })
                  }
                  className="w-full p-2 border border-[#0b0b0a] text-xs font-kalpurush"
                />
              </div>
            </div>

            {/* Bottom Save */}
            <div className="flex justify-end pt-2 pb-8">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-[#0b0b0a] text-white hover:bg-[#caff39] hover:text-[#0b0b0a] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#0b0b0a] shadow-[4px_4px_0px_#caff39] transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 text-[#70716b] font-mono text-sm">
            No brand selected. Click &quot;Add Brand&quot; or select one from the sidebar.
          </div>
        )}
      </div>
    </div>
  );
}