"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Lang = "en" | "bn";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "bn",
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Bengali ('bn') directly as requested by the user
  const [lang, setLangState] = useState<Lang>("bn");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("zasim_lang") as Lang | null;
      if (saved === "en" || saved === "bn") {
        setLangState(saved);
        document.documentElement.lang = saved;
        document.documentElement.setAttribute("data-lang", saved);
      } else {
        setLangState("bn");
        localStorage.setItem("zasim_lang", "bn");
        document.documentElement.lang = "bn";
        document.documentElement.setAttribute("data-lang", "bn");
      }
    } catch {
      // Fallback for private browsing or restricted localStorage
      document.documentElement.lang = "bn";
      document.documentElement.setAttribute("data-lang", "bn");
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("zasim_lang", newLang);
    } catch {
      // Ignore storage errors
    }
    document.documentElement.lang = newLang;
    document.documentElement.setAttribute("data-lang", newLang);
  };

  const toggleLang = () => {
    const next = lang === "en" ? "bn" : "en";
    setLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
