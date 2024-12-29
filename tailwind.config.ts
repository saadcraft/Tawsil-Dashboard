import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primer: "#1e3b42",
        second: "#1c1d31",
        third: "#10b8eb",
        fourth: "#074aac",
        fifth: "#afe3f6",
        six: "#e2f5fc",
        seven: "#d0eaf8",
      },
      maxWidth:{
        "8xl" : "85rem",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
      addUtilities({
        '.no-arrows': {
          '-webkit-appearance': 'none', /* Chrome, Safari */
          '-moz-appearance': 'textfield', /* Firefox */
          'appearance': 'textfield', /* General */
        },
      });
    },
  ],
} satisfies Config;
