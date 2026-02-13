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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Pastel theme colors - ITEM-006
        lavender: "#E6E6FA",
        "lavender-dark": "#D8D8F0",
        pink: "#FFB6C1",
        "pink-dark": "#FFA0B4",
        mint: "#98FB98",
        "mint-dark": "#7FE77F",
        muted: "#666666",
        hint: "#999999",
      },
      fontFamily: {
        sans: ['var(--font-quicksand)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
