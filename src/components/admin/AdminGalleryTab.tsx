"use client";

import React, { useState } from "react";
import Image from "next/image";
import { GalleryItem } from "@/lib/types";
import {
  Plus,
  Trash2,
  Save,
  Upload,
  Camera,
  MapPin,
  Calendar,
  Layers,
  Tag,
} from "lucide-react";

interface Props {
  items: GalleryItem[];
  onRefresh: () => void;
  onFlash: (msg: string) => void;
  onFileUpload: (file: File, onSuccess: (url: string) => void) => void;
  uploading: boolean;
}

export default function AdminGalleryTab({
  items,
  onRefresh,
  onFlash,
  onFileUpload,
  uploading,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(
    items.length > 0 ? items[0].id : null
  );
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(
    items.length > 0 ? JSON.parse(JSON.stringify(items[0])) : null
  );

  const selectItem = (item: GalleryItem) => {
    setSelectedId(item.id);
    setCurrentItem(JSON.parse(JSON.stringify(item)));
  };

  const handleNewItem = () => {
    const newItem: GalleryItem = {
      id: `photo-${Date.now()}`,
      title: "New Photo Title",
      titleBn: "নতুন ছবির শিরোনাম",
      category: "press",
      imageUrl: "/assets/img/frooto-market.jpg",
      date: new Date().toISOString().split("T")[0],
      location: "PRAN Industrial Park, Habiganj",
      locationBn: "প্রাণ ইন্ডাস্ট্রিয়াল পার্ক, হবিগঞ্জ",
      aspectRatio: "landscape",
      description: "Photo description and technical packaging engineering notes.",
      descriptionBn: "ছবির বিবরণ ও পেছনের কারিগরি গল্প।",
      tags: ["Packaging", "Factory", "Press"],
      gearOrProcess: "8-Color Rotogravure Press",
      featured: true,
    };
    setSelectedId(newItem.id);
    setCurrentItem(newItem);
  };

  const handleSave = async () => {
    if (!currentItem) return;
    if (!currentItem.id || !currentItem.imageUrl) {
      alert("Photo ID and Image URL are required");
      return;
    }

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentItem),
      });

      if (res.ok) {
        onFlash("Photo saved to gallery!");
        onRefresh();
      } else {
        alert("Failed to save photo");
      }
    } catch (err) {
      alert("Error saving photo");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        onFlash("Photo deleted");
        onRefresh();
        if (selectedId === id) {
          const remaining = items.filter((i) => i.id !== id);
          if (remaining.length > 0) {
            selectItem(remaining[0]);
          } else {
            setSelectedId(null);
            setCurrentItem(null);
          }
        }
      }
    } catch (err) {
      alert("Error deleting photo");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-50px)]">
      {/* SIDEBAR: Gallery Photo List */}
      <div className="w-full lg:w-80 bg-[#161614] border-r border-[#2c2c28] flex flex-col shrink-0">
        <div className="p-3 border-b border-[#2c2c28] flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            Photos ({items.length})
          </span>
          <button
            onClick={handleNewItem}
            className="flex items-center gap-1 bg-[#caff39] text-[#0b0b0a] font-mono text-[11px] font-bold px-2.5 py-1 hover:bg-white transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Photo</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#232320]">
          {items.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => selectItem(item)}
                className={`p-3 cursor-pointer transition-colors flex items-center gap-3 ${
                  isSelected ? "bg-[#242420] border-l-4 border-[#caff39]" : "hover:bg-[#1c1c1a]"
                }`}
              >
                <div className="w-12 h-10 rounded bg-black/60 border border-white/10 overflow-hidden relative shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-xs font-bold text-white truncate">{item.title}</p>
                  <p className="font-mono text-[10px] text-[#a0a09a] truncate">
                    {item.category.toUpperCase()} · {item.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN EDITOR */}
      <div className="flex-1 bg-[#f4f1ea] overflow-y-auto p-4 sm:p-8 text-[#0b0b0a]">
        {currentItem ? (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Top Bar Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d8d4ca]">
              <div className="flex items-center gap-3">
                <div className="w-14 h-11 bg-black rounded overflow-hidden relative border border-black/20">
                  <Image
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-sans">{currentItem.title}</h2>
                  <p className="font-mono text-xs text-[#70716b]">
                    Category: {currentItem.category.toUpperCase()} · Date: {currentItem.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(currentItem.id)}
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
                  <span>Save Photo</span>
                </button>
              </div>
            </div>

            {/* Photo Image Upload & Preview */}
            <div className="bg-white border border-[#0b0b0a] p-5 space-y-4 shadow-[4px_4px_0px_rgba(0,0,0,0.06)]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b0b0a] pb-2 border-b border-[#eee] flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#0284c7]" />
                <span>01. Image Upload &amp; Preview</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 relative h-48 bg-[#090b10] border border-[#2b3348] rounded-xl overflow-hidden flex items-center justify-center">
                  <Image
                    src={currentItem.imageUrl}
                    alt={currentItem.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>

                <div className="md:col-span-7 space-y-3">
                  <div>
                    <label className="block text-[#70716b] text-xs font-mono mb-1">
                      Image URL:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentItem.imageUrl}
                        onChange={(e) =>
                          setCurrentItem({ ...currentItem, imageUrl: e.target.value })
                        }
                        className="flex-1 p-2 border border-[#0b0b0a] font-mono text-xs"
                      />
                      <label className="px-4 py-2 bg-[#0b0b0a] text-white hover:bg-[#caff39] hover:text-[#0b0b0a] font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploading ? "Uploading..." : "Upload"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onFileUpload(file, (url) => {
                                setCurrentItem({ ...currentItem, imageUrl: url });
                              });
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div>
                      <label className="block text-[#70716b] mb-1">Category:</label>
                      <select
                        value={currentItem.category}
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            category: e.target.value as any,
                          })
                        }
                        className="w-full p-2 border border-[#0b0b0a] bg-white font-bold"
                      >
                        <option value="press">Press &amp; Factory</option>
                        <option value="studio">3D &amp; Design Studio</option>
                        <option value="market">Supermarket Shelf Audits</option>
                        <option value="shoots">Commercial Shoots</option>
                        <option value="team">Team &amp; Memories</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#70716b] mb-1">Date Taken:</label>
                      <input
                        type="date"
                        value={currentItem.date}
                        onChange={(e) =>
                          setCurrentItem({ ...currentItem, date: e.target.value })
                        }
                        className="w-full p-2 border border-[#0b0b0a]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Metadata */}
            <div className="bg-white border border-[#0b0b0a] p-5 space-y-4 shadow-[4px_4px_0px_rgba(0,0,0,0.06)]">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#0b0b0a] pb-2 border-b border-[#eee]">
                02. Title, Location &amp; Technical Notes
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="block text-[#70716b] mb-1">Title (English):</label>
                  <input
                    type="text"
                    value={currentItem.title}
                    onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                    className="w-full p-2 border border-[#0b0b0a] font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Title (Bangla):</label>
                  <input
                    type="text"
                    value={currentItem.titleBn}
                    onChange={(e) => setCurrentItem({ ...currentItem, titleBn: e.target.value })}
                    className="w-full p-2 border border-[#0b0b0a] font-kalpurush text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Location (English):</label>
                  <input
                    type="text"
                    value={currentItem.location}
                    onChange={(e) => setCurrentItem({ ...currentItem, location: e.target.value })}
                    className="w-full p-2 border border-[#0b0b0a]"
                    placeholder="e.g. PRAN Industrial Park, Habiganj"
                  />
                </div>

                <div>
                  <label className="block text-[#70716b] mb-1">Location (Bangla):</label>
                  <input
                    type="text"
                    value={currentItem.locationBn}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, locationBn: e.target.value })
                    }
                    className="w-full p-2 border border-[#0b0b0a] font-kalpurush"
                    placeholder="e.g. প্রাণ ইন্ডাস্ট্রিয়াল পার্ক, হবিগঞ্জ"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[#70716b] mb-1">
                    Gear or Process Note (Machine, Camera, Line):
                  </label>
                  <input
                    type="text"
                    value={currentItem.gearOrProcess || ""}
                    onChange={(e) =>
                      setCurrentItem({ ...currentItem, gearOrProcess: e.target.value })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                    placeholder="e.g. 8-Color Bobst Rotogravure Press · Densitometer Proofing"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[#70716b] mb-1">
                    Tags (Comma-separated):
                  </label>
                  <input
                    type="text"
                    value={(currentItem.tags || []).join(", ")}
                    onChange={(e) =>
                      setCurrentItem({
                        ...currentItem,
                        tags: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                    className="w-full p-2 border border-[#0b0b0a]"
                    placeholder="e.g. Rotogravure, BOPP Film, Pre-Press"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#70716b] text-xs font-mono mb-1">
                  Description (English):
                </label>
                <textarea
                  rows={3}
                  value={currentItem.description}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, description: e.target.value })
                  }
                  className="w-full p-2.5 border border-[#0b0b0a] font-sans text-sm"
                />
              </div>

              <div>
                <label className="block text-[#70716b] text-xs font-mono mb-1">
                  Description (Bangla):
                </label>
                <textarea
                  rows={3}
                  value={currentItem.descriptionBn}
                  onChange={(e) =>
                    setCurrentItem({ ...currentItem, descriptionBn: e.target.value })
                  }
                  className="w-full p-2.5 border border-[#0b0b0a] font-kalpurush text-sm"
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
            No photo selected. Click &quot;Add Photo&quot; or select one from the sidebar.
          </div>
        )}
      </div>
    </div>
  );
}