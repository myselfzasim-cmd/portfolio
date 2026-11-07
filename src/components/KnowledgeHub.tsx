"use client";

import { useState } from "react";
import { BookOpen, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface Article {
  id: string;
  tagEn: string;
  tagBn: string;
  readTimeEn: string;
  readTimeBn: string;
  titleEn: string;
  titleBn: string;
  snippetEn: string;
  snippetBn: string;
  contentEn: string;
  contentBn: string;
}

const ARTICLES: Article[] = [
  {
    id: "vffs-pouches",
    tagEn: "Engineering & Pre-Press",
    tagBn: "প্রি-প্রেস ইঞ্জিনিয়ারিং",
    readTimeEn: "2 min read",
    readTimeBn: "২ মিনিট পাঠ",
    titleEn: "Why High-Speed Pouches Burst: Dieline Tolerances for VFFS Machines",
    titleBn: "হাই-স্পিড পাউচ কেন ফেটে যায়: VFFS মেশিনের জন্য ডাইলাইন টলারেন্স",
    snippetEn:
      "Understanding vertical-form-fill-seal jaw pressures, fin seal margins, and why 3mm of extra bleed prevents factory machine jams.",
    snippetBn:
      "অটোমেটেড VFFS মেশিনের সিলিং চাপ, ফিন সিল মার্জিন এবং কেন ৩ মিলিমিটার অতিরিক্ত ব্লিড ফ্যাক্টরি মেশিনের জ্যাম হওয়া রোধ করে।",
    contentEn: `When packaging food or snacks on automated VFFS (Vertical Form Fill Seal) packaging lines, standard graphic rules do not apply. 

The heat-seal jaws compress multi-layer laminates (BOPP/Met-PET/PE) at speeds exceeding 120 packs per minute. If the packaging designer does not calculate the nitrogen-flush expansion curve or places critical barcode artwork across the vertical fin seal, package integrity fails in distribution trucks.

Key Production Rules:
1. Maintain minimum 15mm clear seal zone free of heavy metallic ink to ensure thermal bonding.
2. Eye-mark sensor contrast must achieve minimum 80% optical density difference against background film.
3. Test slip-coefficient (COF) on laminate surface to prevent film drag across the forming collar.`,
    contentBn: `অটোমেটিক VFFS (Vertical Form Fill Seal) লাইনে যখন স্ন্যাকস বা ফুড পাউচ প্যাক করা হয়, তখন সাধারণ গ্রাফিক্স নিয়ম কাজ করে না।

মেশিনের হিট-সিল জ (jaws) প্রতি মিনিটে ১২০টিরও বেশি গতিতে মাল্টি-লেয়ার ল্যামিনেট (BOPP/Met-PET/PE) সিল করে। ডিজাইনার যদি নাইট্রোজেন-ফ্লাশ গ্যাসের চাপ হিসাব না করেন অথবা সিলিং লাইনের উপর মেটালিক কালার ফেলে রাখেন, তবে পরিবহনের সময় প্যাকেট ফেটে যায়।

মূল প্রোডাকশন নিয়মাবলি:
১. তাপীয় বন্ধন মজবুত রাখতে সিলের ১৫ মিলিমিটার মার্জিনে কোনো ভারী মেটালিক কালি রাখা যাবে না।
২. কাটিং সেন্সর নিখুঁতভাবে কাজ করার জন্য আই-মার্ক (Eye-mark) ব্যাকগ্রাউন্ডের সাথে অন্তত ৮০% কনট্রাস্টে হতে হবে।
৩. ফর্মিং রোলারের ঘর্ষণ এড়াতে ল্যামিনেট ফিল্মের স্লিপ-কোফিশিয়েন্ট (COF) আগেই পরীক্ষা করতে হবে।`,
  },
  {
    id: "rotogravure-vs-flexo",
    tagEn: "Print Economics",
    tagBn: "প্রিন্টিং ইকোনমিক্স",
    readTimeEn: "3 min read",
    readTimeBn: "৩ মিনিট পাঠ",
    titleEn: "Rotogravure vs. HD Flexography: Cost Optimization for Mass FMCG",
    titleBn: "রোটোগ্র্যাভিউর বনাম এইচডি ফ্লেক্সো: ব্যাপক এফএমসিজি উৎপাদনের খরচ কমানোর কৌশল",
    snippetEn:
      "When to invest in copper-engraved cylinders vs photopolymer plates to balance upfront tooling costs and million-unit unit economics.",
    snippetBn:
      "তামার রোটোগ্র্যাভিউর সিলিন্ডার বনাম ফ্লেক্সোগ্রাফিক প্লেটের প্রাথমিক খরচ ও মিলিয়ন ইউনিটের প্রিন্টিং খরচের তুলনামূলক বিশ্লেষণ।",
    contentEn: `At PRAN-RFL Group scales, a single product run frequently reaches 5 to 20 million packages. In this volume tier, Rotogravure cylinder engraving provides unbeatable dot sharpness, solid ink coverage, and cylinder longevity.

However, for shorter seasonal promotional runs (under 500,000 units), high-definition flexography reduces tooling turnaround from 14 days down to 48 hours with significantly lower plate costs.

Strategic Takeaway:
By consolidating spot colors and engineering 7-color process separations (Extended Color Gamut - ECG), packaging teams can share common ink cylinders across product variations—reducing prepress expenditure by up to 22%.`,
    contentBn: `প্রাণ-আরএফএল গ্রুপের মতো বড় প্রতিষ্ঠানে একটি একক পণ্যের প্রোডাকশন রান প্রায়ই ৫ থেকে ২০ মিলিয়ন প্যাকেটে পৌঁছায়। এই ব্যাপক পরিমাণে রোটোগ্র্যাভিউর কপার সিলিন্ডার অতুলনীয় শার্পনেস এবং দীর্ঘস্থায়ী স্থায়িত্ব প্রদান করে।

তবে স্বল্পমেয়াদী সিজনাল ক্যাম্পেইনের জন্য (৫ লাখ ইউনিটের নিচে), এইচডি ফ্লেক্সোগ্রাফি প্লেটের খরচ কমায় এবং ১৪ দিনের পরিবর্তে মাত্র ৪৮ ঘণ্টার মধ্যে প্রোডাকশন চালু করা সম্ভব করে।

কৌশলগত সিদ্ধান্ত:
স্পট কালার অপটিমাইজ করে ৭-কালার প্রসেস সেপারেশন (ECG) ব্যবহার করলে একাধিক ফ্লেভারের প্যাকেজিংয়ে একই সিলিন্ডার শেয়ার করা যায়—যা প্রি-প্রেস খরচ প্রায় ২২% কমিয়ে দেয়।`,
  },
  {
    id: "export-compliance",
    tagEn: "Global Compliance",
    tagBn: "আন্তর্জাতিক রেগুলেশন",
    readTimeEn: "2 min read",
    readTimeBn: "২ মিনিট পাঠ",
    titleEn: "Designing for 140+ Export Markets: BSTI, FDA, and GCC Packaging Rules",
    titleBn: "১৪০+ দেশের এক্সপোর্টের নিয়ম: বিএসটিআই, ইউএস এফডিএ ও জিসিসি অ্যারাবিক কমপ্লায়েন্স",
    snippetEn:
      "How to layout multi-lingual Arabic, English, and Bengali typography while strictly preserving legal nutrition and ingredient panels.",
    snippetBn:
      "আরবি, ইংরেজি ও বাংলা টাইপোগ্রাফির ভারসাম্য বজায় রেখে আন্তর্জাতিক পুষ্টিগুণ ও উপাদান প্যানেল প্রস্তুতের নির্দেশিকা।",
    contentEn: `Export packaging must survive international port inspections. In GCC Middle Eastern territories, Arabic mandatory labeling cannot simply be pasted as secondary text; GSO regulations dictate equal optical weight for product identity and Halal certifications.

Simultaneously, US FDA and UK FSA standards require specific font sizes (minimum 6pt to 8pt x-height) for mandatory allergen declarations and net-weight indications.

Best Practice:
Design the legal and regulatory architecture first before locking the decorative branding zone. A package that fails customs clearance halts multi-container shipments regardless of aesthetic appeal.`,
    contentBn: `রপ্তানিমুখী প্যাকেজিংকে আন্তর্জাতিক বন্দরের কঠোর পরিদর্শন অতিক্রম করতে হয়। মিডল ইস্টের জিসিসিভুক্ত দেশগুলোতে আরবি তথ্য কেবল দ্বিতীয় ভাষা হিসেবে রাখলে চলে না; জিএসও (GSO) নিয়ম অনুযায়ী ব্র্যান্ড ও হালাল সার্টিফিকেশনের সমান গুরুত্ব দিতে হয়।

একই সাথে ইউএস এফডিএ এবং ইউকে এফএসএ মানদণ্ডে অ্যালার্জি সতর্কতা এবং ওজনের তথ্যের জন্য ন্যূনতম ৬ থেকে ৮ পয়েন্ট ফন্ট সাইজ বাধ্যতামূলক।

সঠিক নিয়ম:
সৌন্দর্যবর্ধক গ্রাফিক্সের আগেই লিগ্যাল ও নিউট্রিশন প্যানেলের ডাই-লাইন স্পেস লক করে নিতে হবে। যে প্যাকেট কাস্টমস ক্লিয়ারেন্সে আটকে যায়, তা পুরো শিপমেন্টের ব্যাপক ক্ষতি ডেকে আনে।`,
  },
];

export default function KnowledgeHub() {
  const { lang } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section className="bg-[#10121a] border border-[#222634] rounded-2xl p-6 sm:p-8 my-10 shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-[#1c202c] mb-6">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-5 h-5 text-[#38bdf8]" />
          <span className="font-mono text-xs uppercase font-extrabold text-[#f3f4f8] tracking-wider">
            {lang === "bn"
              ? "প্যাকেজিং ফিল্ড নোটস ও টেকনিক্যাল প্রবন্ধ"
              : "Packaging Field Notes & Technical Insights"}
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#d4ff33] font-bold bg-[#d4ff33]/10 px-2.5 py-1 rounded-full border border-[#d4ff33]/20">
          {lang === "bn" ? "প্রাণ-আরএফএল এফএমসিজি স্ট্যান্ডার্ড" : "PRAN-RFL FMCG Standards"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono">
        {ARTICLES.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="p-5 bg-[#0b0d13] border border-[#1e2333] hover:border-[#d4ff33] rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-[#d4ff33]/5"
          >
            <div>
              <div className="flex justify-between items-center text-[10px] text-[#8c93a8] mb-2 uppercase font-kalpurush">
                <span className="text-[#38bdf8] font-bold">
                  {lang === "bn" ? art.tagBn : art.tagEn}
                </span>
                <span>{lang === "bn" ? art.readTimeBn : art.readTimeEn}</span>
              </div>
              <h4 className="font-heading font-headline text-sm sm:text-base font-bold text-[#f3f4f8] leading-snug group-hover:text-[#d4ff33] transition-colors">
                {lang === "bn" ? art.titleBn : art.titleEn}
              </h4>
              <p className="font-kalpurush text-xs text-[#8c93a8] mt-2 line-clamp-2 leading-relaxed">
                {lang === "bn" ? art.snippetBn : art.snippetEn}
              </p>
            </div>
            <div className="pt-4 flex items-center gap-1.5 text-[11px] font-bold text-[#f3f4f8] mt-3 border-t border-[#1a1e2b] font-kalpurush">
              <span>{lang === "bn" ? "প্রবন্ধটি পড়ুন" : "Read Insight"}</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#d4ff33] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10121a] border border-[#2b3145] max-w-2xl w-full p-6 sm:p-8 rounded-2xl shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-5 right-5 p-1.5 hover:bg-[#1a1e2b] rounded-lg transition-colors text-[#8c93a8] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="font-mono text-xs text-[#38bdf8] font-bold uppercase mb-2 font-kalpurush">
              {lang === "bn" ? selectedArticle.tagBn : selectedArticle.tagEn} ·{" "}
              {lang === "bn" ? selectedArticle.readTimeBn : selectedArticle.readTimeEn}
            </div>

            <h3 className="font-heading font-headline text-2xl sm:text-3xl font-extrabold text-[#f3f4f8] mb-4 leading-tight">
              {lang === "bn" ? selectedArticle.titleBn : selectedArticle.titleEn}
            </h3>

            <div className="font-kalpurush text-sm sm:text-base text-[#c5cde0] leading-relaxed whitespace-pre-line space-y-3 border-t border-[#1c202c] pt-5">
              {lang === "bn" ? selectedArticle.contentBn : selectedArticle.contentEn}
            </div>

            <div className="mt-8 pt-4 border-t border-[#1c202c] flex justify-between items-center font-mono text-xs text-[#8c93a8] font-kalpurush">
              <span>
                {lang === "bn"
                  ? "লেখক: জসিম উদ্দিন · এসসিটি ডিজাইন হাউস · প্রাণ-আরএফএল গ্রুপ"
                  : "Authored by Zasim Uddin · SCT Design House · PRAN-RFL Group"}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 bg-[#d4ff33] text-black hover:bg-white rounded-lg font-bold uppercase text-[11px] font-mono font-kalpurush"
              >
                {lang === "bn" ? "বন্ধ করুন" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
