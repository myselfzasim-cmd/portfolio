"use client";

import React from "react";
import { Globe } from "lucide-react";

interface Props {
  country?: string;
  className?: string;
}

/**
 * High-definition, cross-platform SVG national flags.
 * Bypasses Windows OS emoji font limitations (which show letters like "BD", "MY", "AE")
 * by rendering crisp, beautiful SVG flags with authentic colors and micro-borders.
 */
export default function CountryFlag({ country = "BD", className = "w-5 h-3.5" }: Props) {
  const code = (country || "BD").toUpperCase();

  switch (code) {
    case "BD":
    case "BANGLADESH":
      return (
        <span
          className={`inline-block shrink-0 overflow-hidden rounded-[3px] border border-black/20 shadow-xs align-middle ${className}`}
          title="Bangladesh"
        >
          <svg viewBox="0 0 20 14" className="w-full h-full block">
            <rect width="20" height="14" fill="#006a4e" />
            <circle cx="9" cy="7" r="4.2" fill="#f42a41" />
          </svg>
        </span>
      );

    case "MY":
    case "MALAYSIA":
      return (
        <span
          className={`inline-block shrink-0 overflow-hidden rounded-[3px] border border-black/20 shadow-xs align-middle ${className}`}
          title="Malaysia"
        >
          <svg viewBox="0 0 28 14" className="w-full h-full block">
            {/* 14 Red and White Stripes */}
            <rect width="28" height="1" y="0" fill="#cc0000" />
            <rect width="28" height="1" y="1" fill="#ffffff" />
            <rect width="28" height="1" y="2" fill="#cc0000" />
            <rect width="28" height="1" y="3" fill="#ffffff" />
            <rect width="28" height="1" y="4" fill="#cc0000" />
            <rect width="28" height="1" y="5" fill="#ffffff" />
            <rect width="28" height="1" y="6" fill="#cc0000" />
            <rect width="28" height="1" y="7" fill="#ffffff" />
            <rect width="28" height="1" y="8" fill="#cc0000" />
            <rect width="28" height="1" y="9" fill="#ffffff" />
            <rect width="28" height="1" y="10" fill="#cc0000" />
            <rect width="28" height="1" y="11" fill="#ffffff" />
            <rect width="28" height="1" y="12" fill="#cc0000" />
            <rect width="28" height="1" y="13" fill="#ffffff" />
            {/* Dark Blue Canton */}
            <rect width="14" height="8" x="0" y="0" fill="#000066" />
            {/* Yellow Crescent */}
            <circle cx="6.2" cy="4" r="2.8" fill="#ffcc00" />
            <circle cx="7.1" cy="4" r="2.35" fill="#000066" />
            {/* 14-Point Star */}
            <polygon
              points="9.8,2.2 10.3,3.3 11.4,2.9 11.2,4.0 12.3,4.2 11.6,5.1 12.5,5.8 11.5,6.2 11.9,7.2 10.9,7.1 10.7,8.2 10.0,7.4 9.3,8.2 9.0,7.1 8.0,7.2 8.4,6.2 7.4,5.8 8.3,5.1 7.6,4.2 8.7,4.0 8.5,2.9 9.6,3.3"
              fill="#ffcc00"
            />
          </svg>
        </span>
      );

    case "AE":
    case "UAE":
    case "UNITED ARAB EMIRATES":
      return (
        <span
          className={`inline-block shrink-0 overflow-hidden rounded-[3px] border border-black/20 shadow-xs align-middle ${className}`}
          title="United Arab Emirates"
        >
          <svg viewBox="0 0 24 14" className="w-full h-full block">
            {/* Top Green stripe */}
            <rect width="24" height="4.66" y="0" fill="#00732f" />
            {/* Middle White stripe */}
            <rect width="24" height="4.66" y="4.66" fill="#ffffff" />
            {/* Bottom Black stripe */}
            <rect width="24" height="4.68" y="9.32" fill="#000000" />
            {/* Left Red vertical bar */}
            <rect width="6" height="14" x="0" y="0" fill="#ff0000" />
          </svg>
        </span>
      );

    case "GB":
    case "UK":
    case "UNITED KINGDOM":
      return (
        <span
          className={`inline-block shrink-0 overflow-hidden rounded-[3px] border border-black/20 shadow-xs align-middle ${className}`}
          title="United Kingdom"
        >
          <svg viewBox="0 0 60 30" className="w-full h-full block">
            <clipPath id="uk-clip">
              <path d="M0,0 v30 h60 v-30 z" />
            </clipPath>
            <clipPath id="uk-diagonal">
              <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
            </clipPath>
            <g clipPath="url(#uk-clip)">
              <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
              <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
              <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-diagonal)" stroke="#c8102e" strokeWidth="4" />
              <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
              <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
            </g>
          </svg>
        </span>
      );

    case "US":
    case "USA":
    case "UNITED STATES":
      return (
        <span
          className={`inline-block shrink-0 overflow-hidden rounded-[3px] border border-black/20 shadow-xs align-middle ${className}`}
          title="United States"
        >
          <svg viewBox="0 0 38 20" className="w-full h-full block">
            <rect width="38" height="20" fill="#b22234" />
            <path d="M0,1.54 h38 M0,4.62 h38 M0,7.69 h38 M0,10.77 h38 M0,13.85 h38 M0,16.92 h38" stroke="#ffffff" strokeWidth="1.54" />
            <rect width="15.2" height="10.77" fill="#3c3b6e" />
            <circle cx="3" cy="2.5" r="0.8" fill="#ffffff" />
            <circle cx="6" cy="2.5" r="0.8" fill="#ffffff" />
            <circle cx="9" cy="2.5" r="0.8" fill="#ffffff" />
            <circle cx="12" cy="2.5" r="0.8" fill="#ffffff" />
            <circle cx="4.5" cy="5.4" r="0.8" fill="#ffffff" />
            <circle cx="7.5" cy="5.4" r="0.8" fill="#ffffff" />
            <circle cx="10.5" cy="5.4" r="0.8" fill="#ffffff" />
            <circle cx="3" cy="8.3" r="0.8" fill="#ffffff" />
            <circle cx="6" cy="8.3" r="0.8" fill="#ffffff" />
            <circle cx="9" cy="8.3" r="0.8" fill="#ffffff" />
            <circle cx="12" cy="8.3" r="0.8" fill="#ffffff" />
          </svg>
        </span>
      );

    case "IN":
    case "INDIA":
      return (
        <span
          className={`inline-block shrink-0 overflow-hidden rounded-[3px] border border-black/20 shadow-xs align-middle ${className}`}
          title="India"
        >
          <svg viewBox="0 0 24 14" className="w-full h-full block">
            <rect width="24" height="4.66" y="0" fill="#ff9933" />
            <rect width="24" height="4.66" y="4.66" fill="#ffffff" />
            <rect width="24" height="4.68" y="9.32" fill="#138808" />
            <circle cx="12" cy="7" r="1.8" fill="none" stroke="#000080" strokeWidth="0.5" />
            <circle cx="12" cy="7" r="0.4" fill="#000080" />
          </svg>
        </span>
      );

    default:
      return (
        <span
          className={`inline-flex items-center justify-center shrink-0 rounded-[3px] bg-blue-500/20 text-blue-400 border border-blue-500/40 align-middle ${className}`}
          title="International Export"
        >
          <Globe className="w-3.5 h-3.5" />
        </span>
      );
  }
}
