import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme"); // Import default theme

const config: Config = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // These paths are relative to `frontend/` now
  ],
  theme: {
    extend: {
      colors: {
        'neo-teal': '#4DB6AC',       // Primary
        'cloud-gray': '#EEEEEE',     // Background
        'vivid-amethyst': '#9C27B0', // Accent
        'midnight-ink': '#0A0A1A',   // Deep dark blue/purple base
        'soft-coral': '#FF6E6E',     // Alert/Highlight
        'spring-mint': '#B2F2BB',    // Success/Positive
        'deep-purple': '#3A1078',    // Rich deep purple
        'cosmic-blue': '#2F58CD',    // Vibrant blue
        'neon-accent': '#40F8FF',    // Bright cyan accent
        'light-gray': '#D1D5DB',     // For light text on dark backgrounds
        'medium-gray': '#4B5563',    // For less prominent text/borders
      },
      borderRadius: {
        'DEFAULT': '2px', // Default border radius as specified
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "radial-gradient(ellipse at bottom, #3A1078 0%, #0A0A1A 80%)",
      },
      // Add custom font families
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-roboto)', ...fontFamily.sans], // Body: Inter primary, Roboto secondary, system sans-serif fallback
        headline: ['var(--font-space-grotesk)', 'var(--font-inter)', ...fontFamily.sans], // Headline: Space Grotesk primary, Inter secondary
        mono: ['var(--font-ibm-plex-mono)', ...fontFamily.mono], // Mono: IBM Plex Mono primary, system mono fallback
      },
    },
  },
  plugins: [],
};
export default config; 