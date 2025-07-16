import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class", ":dark"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1.25" }], // 12px
      sm: ["0.875rem", { lineHeight: "1.5" }], // 14px
      base: ["1rem", { lineHeight: "1.5" }], // 16px
      lg: ["1.125rem", { lineHeight: "1.5" }], // 18px
      xl: ["1.25rem", { lineHeight: "1.75" }], // 20px
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "Arial", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      textColor: {
        gradient: "linear-gradient(to right, #6190E6, #A7BFE8)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
