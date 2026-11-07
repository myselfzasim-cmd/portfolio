import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg-dark)",
        ink: "var(--text-main)",
        muted: "var(--text-muted)",
        accent: "var(--neon-lime)",
        "accent-blue": "var(--neon-blue)",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "'Hind Siliguri'", "sans-serif"],
        mono: ["'DM Mono'", "monospace"],
        kalpurush: ["'Kalpurush'", "'SutonnyMJ'", "serif"],
        handwriting: ["'Caveat'", "'Dancing Script'", "'Atma'", "cursive", "sans-serif"],
        script: ["'Kaushan Script'", "'Satisfy'", "'Caveat'", "cursive", "sans-serif"],
        handwritingBn: ["'Atma'", "'Baloo Da 2'", "cursive", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
