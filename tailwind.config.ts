import type { Config } from "tailwindcss";

/**
 * Design tokens — Site Kinetoterapie SORIN.
 *
 * Single source of truth for color, type, spacing and motion timing.
 * Components must read from these tokens, never hardcode hex/px values.
 * The visual direction is PROPOSED (CLAUDE.md) and gets locked in Claude
 * Design before Sprint 3 — keeping every value here makes that swap trivial.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Hero — dark stage the anatomical figure lives on.
        night: {
          DEFAULT: "#0A0A0B",
          800: "#141416",
          700: "#1C1C1F",
        },
        // Warm off-white of the hero figure / on-dark text.
        bone: "#F4EEE6",
        // Site body — warm ivory canvas.
        ivory: {
          DEFAULT: "#F7F4EF",
          dim: "#EFEAE1",
        },
        // Ink — primary and softened text on ivory.
        ink: {
          DEFAULT: "#1F1B17",
          soft: "#2A2622",
          muted: "#6B635A",
        },
        // Brand accent — sage, calm / recovery. Used sparingly.
        // UNDER REVIEW for the Claude Design lock (see PROGRESS.md → "Conflicte
        // semnalate"): proposed palette resembles a known AI-default. Swap here
        // only — components read the token, never the hex.
        sage: {
          DEFAULT: "#5E7C6B",
          600: "#4F6B5B",
          200: "#C5D2C9",
        },
        // CTA accent — warm clay. Reserved EXCLUSIVELY for conversion actions
        // (the booking KPI); never a background wash. UNDER REVIEW (see above).
        clay: {
          DEFAULT: "#C06A4B",
          600: "#A9573B",
          200: "#E7C2B2",
        },
        // Hairline rules / borders on ivory.
        line: "#E3DCD1",
      },
      fontFamily: {
        // Display serif (Fraunces) and body sans (Inter) injected via next/font.
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        // Fluid editorial display scale (clamp: mobile -> desktop).
        "display-xl": ["clamp(2.75rem, 6vw + 1rem, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4vw + 1rem, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.75rem, 2.5vw + 1rem, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        eyebrow: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.18em" }],
      },
      letterSpacing: {
        display: "-0.02em",
      },
      maxWidth: {
        // 60–75ch comfortable reading measure for body copy.
        measure: "68ch",
        "measure-tight": "54ch",
      },
      spacing: {
        // Editorial section rhythm on top of Tailwind's native 4/8px scale.
        section: "clamp(5rem, 10vw, 9rem)",
        gutter: "clamp(1.25rem, 5vw, 4rem)",
      },
      borderRadius: {
        card: "14px",
      },
      transitionTimingFunction: {
        // Movement / scroll-driven motion — CSS equivalent of GSAP power3.inOut.
        brand: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        // Entrances + UI micro-interactions — strong ease-out (see lib/motion.ts).
        "brand-out": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      transitionDuration: {
        micro: "140ms",
        fast: "250ms",
        base: "600ms",
        slow: "1100ms",
      },
      zIndex: {
        // Semantic scale — never raw 999/9999.
        base: "0",
        raised: "10",
        header: "20",
        overlay: "30",
        modal: "40",
        toast: "50",
      },
    },
  },
  plugins: [],
};

export default config;
