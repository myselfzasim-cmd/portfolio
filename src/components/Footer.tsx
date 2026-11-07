"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { lang } = useLanguage();

  return (
    <footer className="bg-[#0b0b0a] text-[#f4f1ea] border-t border-[#222] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#222]">
          {/* Col 1 */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#caff39] text-[#0b0b0a] font-mono font-bold text-xs flex items-center justify-center">
                ZU
              </span>
              <span className="font-mono text-sm tracking-widest uppercase font-semibold">
                ZASIM UDDIN
              </span>
            </div>
            <p className="font-serif italic text-2xl text-[#d8d4ca] max-w-md">
              &quot;Design that survives the brief, the printing cylinder, and the supermarket shelf.&quot;
            </p>
            <p className="font-mono text-xs text-[#70716b] leading-relaxed max-w-md">
              Packaging &amp; production artwork specialist based in Dhaka, Bangladesh. Currently designing for PRAN-RFL Group&apos;s FMCG product portfolio.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#70716b] uppercase tracking-wider block mb-4">
              {lang === "en" ? "Explore" : "ন্যাভিগেশন"}
            </span>
            <div>
              <Link href="/#work" className="hover:text-[#caff39] transition-colors block py-1">
                {lang === "en" ? "Selected Works" : "বাছাইকৃত প্রজেক্ট"}
              </Link>
            </div>
            <div>
              <Link href="/#process" className="hover:text-[#caff39] transition-colors block py-1">
                {lang === "en" ? "5-Step Packaging Framework" : "৫-ধাপের প্যাকেজিং ফ্রেমওয়ার্ক"}
              </Link>
            </div>
            <div>
              <Link href="/#credentials" className="hover:text-[#caff39] transition-colors block py-1">
                {lang === "en" ? "Industry Credentials" : "ক্যারিয়ার ও অভিজ্ঞতা"}
              </Link>
            </div>
            <div>
              <Link href="/admin" className="text-[#caff39] hover:underline flex items-center gap-1 py-1">
                <span>Admin Studio</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Col 3: Direct Connect */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#70716b] uppercase tracking-wider block mb-4">
              {lang === "en" ? "Direct Inquiries" : "যোগাযোগ ও হায়ারিং"}
            </span>
            <p className="text-[#a0a09a] text-xs">
              Open for selective high-impact commercial packaging projects and consulting.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="mailto:zasim@example.com"
                className="hover:text-[#caff39] transition-colors flex items-center gap-1"
              >
                <span>Email me</span>
                <ArrowUpRight className="w-3 h-3 text-[#70716b]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#caff39] transition-colors flex items-center gap-1"
              >
                <span>LinkedIn Profile</span>
                <ArrowUpRight className="w-3 h-3 text-[#70716b]" />
              </a>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#caff39] transition-colors flex items-center gap-1"
              >
                <span>Behance Portfolio</span>
                <ArrowUpRight className="w-3 h-3 text-[#70716b]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[#70716b]">
          <span>© {new Date().getFullYear()} Zasim Uddin. Built for Global Packaging Showcase.</span>
          <span>SCT Design House · PRAN-RFL Group</span>
        </div>
      </div>
    </footer>
  );
}
