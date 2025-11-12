import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Toastmasters Official Brand Colors
        tm: {
          blue: "#004165",      // Corporate Blue (Primary)
          maroon: "#772432",    // Maroon (Primary Brand Color)
          yellow: "#F2DF74",    // Yellow (Accent/CTAs)
          grey: "#A9B2B1",      // Grey (Secondary/Support)
        },
      },
    },
  },
  plugins: [],
};
export default config;
