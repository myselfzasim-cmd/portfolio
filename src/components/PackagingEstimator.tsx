"use client";

import { useState } from "react";
import { X, Calculator, Check, Send } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PackagingEstimator({ isOpen, onClose }: Props) {
  const { lang } = useLanguage();
  const [packType, setPackType] = useState("Stand-Up Pouch");
  const [scope, setScope] = useState("New Product Launch");
  const [variants, setVariants] = useState("2-4 Flavor Variants");
  const [market, setMarket] = useState("Local FMCG Market (BD)");
  const [submitted, setSubmitted] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppLink = () => {
    const text = `Hi Zasim, I would like to inquire about a packaging project:%0A- Format: ${packType}%0A- Scope: ${scope}%0A- Variants: ${variants}%0A- Market: ${market}%0A- Name: ${contactName || "Client"} (${contactEmail || "No email"})`;
    return `https://wa.me/8801723005886?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#10121a] border border-[#2b3145] max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1c202c] bg-[#141724]">
          <div className="flex items-center gap-2.5">
            <Calculator className="w-5 h-5 text-[#38bdf8]" />
            <span className="font-mono text-xs uppercase font-extrabold text-[#f3f4f8] tracking-wider">
              {lang === "bn"
                ? "প্যাকেজিং প্রজেক্ট এস্টিমেটর ও কোটেশন"
                : "Packaging Project Estimator & Inquiry"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#1f2438] rounded-lg transition-colors text-[#8c93a8] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* 1. Format */}
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#8c93a8] block mb-2 font-bold">
                {lang === "bn" ? "০১ / প্যাকেজিং ফরম্যাট নির্বাচন করুন:" : "01 / Packaging Format:"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                {[
                  { en: "Stand-Up Pouch", bn: "স্ট্যান্ড-আপ পাউচ" },
                  { en: "Bottle / Jar Label", bn: "বোতল / জার লেবেল" },
                  { en: "Folding Carton", bn: "ফোল্ডিং কার্টন বক্স" },
                  { en: "Flexible Sachet", bn: "ফ্লেক্সিবল স্যাশে" },
                  { en: "Rigid Box", bn: "লাক্সারি রিজিড বক্স" },
                  { en: "Shrink Sleeve", bn: "স্রিঙ্ক স্লিভ লেবেল" },
                ].map((item) => (
                  <button
                    key={item.en}
                    type="button"
                    onClick={() => setPackType(item.en)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      packType === item.en
                        ? "bg-[#d4ff33] text-black border-[#d4ff33] font-black shadow-md shadow-[#d4ff33]/20"
                        : "bg-[#0b0d13] text-[#a4acc4] border-[#1e2333] hover:border-[#383f56] hover:text-white"
                    }`}
                  >
                    {lang === "bn" ? item.bn : item.en}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Scope */}
            <div>
              <label className="font-mono text-[11px] uppercase tracking-wider text-[#8c93a8] block mb-2 font-bold">
                {lang === "bn" ? "০২ / কাজের পরিধি:" : "02 / Project Scope:"}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
                {[
                  { en: "New Product Launch", bn: "নতুন প্রোডাক্ট লঞ্চ" },
                  { en: "Modern Redesign", bn: "আধুনিক রি-ডিজাইন" },
                  { en: "Dieline & Pre-Press", bn: "ডাইলাইন ও প্রি-প্রেস" },
                ].map((item) => (
                  <button
                    key={item.en}
                    type="button"
                    onClick={() => setScope(item.en)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      scope === item.en
                        ? "bg-[#d4ff33] text-black border-[#d4ff33] font-black shadow-md shadow-[#d4ff33]/20"
                        : "bg-[#0b0d13] text-[#a4acc4] border-[#1e2333] hover:border-[#383f56] hover:text-white"
                    }`}
                  >
                    {lang === "bn" ? item.bn : item.en}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Variants & Market */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div>
                <label className="block text-[#8c93a8] text-[10px] uppercase font-bold mb-1.5">
                  {lang === "bn" ? "এসকিউ বা ভ্যারিয়েন্ট সংখ্যা:" : "SKU Count:"}
                </label>
                <select
                  value={variants}
                  onChange={(e) => setVariants(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#1e2333] bg-[#0b0d13] text-[#f3f4f8] font-mono text-xs focus:border-[#d4ff33] focus:outline-none"
                >
                  <option value="1 Single Hero SKU">
                    {lang === "bn" ? "১টি একক হিরো প্রোডাক্ট" : "1 Single Hero SKU"}
                  </option>
                  <option value="2-4 Flavor Variants">
                    {lang === "bn" ? "২-৪টি ফ্লেভার/কালার ভ্যারিয়েন্ট" : "2-4 Flavor Variants"}
                  </option>
                  <option value="5+ Extended Product Range">
                    {lang === "bn" ? "৫টির বেশি সম্পূর্ণ প্রোডাক্ট রেঞ্জ" : "5+ Extended Range"}
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[#8c93a8] text-[10px] uppercase font-bold mb-1.5">
                  {lang === "bn" ? "টার্গেট বাজার:" : "Target Distribution:"}
                </label>
                <select
                  value={market}
                  onChange={(e) => setMarket(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#1e2333] bg-[#0b0d13] text-[#f3f4f8] font-mono text-xs focus:border-[#d4ff33] focus:outline-none"
                >
                  <option value="Local FMCG Market (BD)">
                    {lang === "bn" ? "বাংলাদেশ লোকাল মার্কেট" : "Local FMCG (Bangladesh)"}
                  </option>
                  <option value="International Export (GCC/EU/US)">
                    {lang === "bn" ? "আন্তর্জাতিক এক্সপোর্ট (জিসিসি/ইউরোপ/ইউএসএ)" : "International Export"}
                  </option>
                  <option value="Both Local & Export">
                    {lang === "bn" ? "দেশি ও আন্তর্জাতিক উভয় বাজার" : "Both Local & Export"}
                  </option>
                </select>
              </div>
            </div>

            {/* 4. Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <input
                type="text"
                placeholder={lang === "bn" ? "আপনার নাম বা কোম্পানির নাম" : "Your Name / Company"}
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="p-3 rounded-xl border border-[#1e2333] bg-[#0b0d13] text-[#f3f4f8] focus:border-[#d4ff33] focus:outline-none"
              />
              <input
                type="email"
                placeholder={lang === "bn" ? "ইমেইল এড্রেস" : "Work Email"}
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="p-3 rounded-xl border border-[#1e2333] bg-[#0b0d13] text-[#f3f4f8] focus:border-[#d4ff33] focus:outline-none"
              />
            </div>

            {/* Submit Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1c202c]">
              <span className="font-mono text-[10px] text-[#8c93a8]">
                {lang === "bn" ? "সরাসরি ২৪ ঘণ্টার মধ্যে যোগাযোগ করা হবে।" : "Direct response within 24 hours."}
              </span>
              <div className="flex gap-2 w-full sm:w-auto">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] text-white font-mono text-xs font-bold uppercase rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <span>WhatsApp</span>
                </a>
                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-[#d4ff33] text-black hover:bg-white font-mono text-xs font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#d4ff33]/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === "bn" ? "কোটেশন পাঠান" : "Send Inquiry"}</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-10 text-center space-y-4">
            <div className="w-14 h-14 bg-[#d4ff33] text-black rounded-full flex items-center justify-center mx-auto shadow-xl shadow-[#d4ff33]/30">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-headline text-2xl font-black text-[#f3f4f8]">
              {lang === "bn" ? "কোটেশন সফলভাবে পাঠানো হয়েছে!" : "Inquiry Dispatched Successfully!"}
            </h3>
            <p className="font-kalpurush text-sm sm:text-base text-[#8c93a8] max-w-sm mx-auto leading-relaxed">
              {lang === "bn"
                ? `ধন্যবাদ, ${contactName || "পার্টনার"}। আপনার ${packType} প্যাকেজিং প্রজেক্টের রিকোয়েস্ট গৃহীত হয়েছে। আমি ডাইলাইন ও টার্নঅ্যারাউন্ড সময় সহ দ্রুত যোগাযোগ করব।`
                : `Thank you, ${contactName || "partner"}. Your project brief for ${packType} has been recorded. I will review the dieline feasibility and turnaround times.`}
            </p>
            <div className="pt-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#d4ff33] text-black font-mono text-xs uppercase font-bold rounded-xl hover:bg-white transition-colors font-kalpurush"
              >
                {lang === "bn" ? "সম্পন্ন" : "Done"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
