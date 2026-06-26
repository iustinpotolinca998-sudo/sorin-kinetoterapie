/**
 * Motion system — Site Kinetoterapie SORIN.
 *
 * ONE duration scale and a deliberately SMALL, semantic easing set drive every
 * GSAP tween and CSS transition so the site moves with a single recognisable
 * hand. Motion scales with element size: small UI uses `fast`, full-page /
 * hero transitions use `slow` (CLAUDE.md "Sistem de mișcare").
 *
 * On easing — a justified refinement of CLAUDE.md's "un singur ease".
 * CLAUDE.md's own precedence rule puts emilkowalski/skills in charge of motion
 * craft, and that skill (plus review-animations) is firm that *entrances and
 * UI feedback must be ease-OUT*, while a symmetric in-out reads slightly
 * sluggish at the moment the user is watching. A pure scroll-scrub must be
 * LINEAR so it tracks the scrollbar 1:1. So instead of one curve we keep a
 * principled trio, each with a clear job. This is NOT a licence for ad-hoc
 * easings — these three are the whole vocabulary.
 *
 * Kept framework-agnostic (plain constants) so it is safe to import from both
 * Server and Client Components.
 */

/* ----------------------------- Easing ----------------------------------- */

/** Brand movement / on-screen morph / scroll-driven reveals. The default. */
export const EASE = "power3.inOut" as const;
/** Entrances, exits and UI micro-interactions (responsive, decelerating). */
export const EASE_OUT = "power3.out" as const;
/** Hero scroll-scrub only — tracks the scrollbar 1:1, never eased. */
export const EASE_SCRUB = "none" as const;

/** CSS equivalents, for Tailwind / plain `transition` timing. */
export const EASE_CSS = "cubic-bezier(0.645, 0.045, 0.355, 1)" as const; // power3.inOut
export const EASE_OUT_CSS = "cubic-bezier(0.23, 1, 0.32, 1)" as const; // strong ease-out

/* ---------------------------- Durations --------------------------------- */

/** Duration scale, in seconds (GSAP units). */
export const DURATION = {
  /** Tactile press feedback on the CTA (~140ms). Below the `fast` floor. */
  micro: 0.14,
  /** Hover, focus, small UI state changes (0.2–0.3s). */
  fast: 0.25,
  /** Standard element reveals and transitions (0.6s). */
  base: 0.6,
  /** Full-page / hero-scale transitions and the scrubbed sequence (1.0–1.2s). */
  slow: 1.1,
} as const;

/** Stagger steps for grouped reveals, in seconds (kept short, decorative). */
export const STAGGER = {
  tight: 0.05,
  base: 0.08,
} as const;

/* ----------------------------- Presets ---------------------------------- */

/**
 * Canonical entrance: fade up from a small offset, ease-out. Nothing appears
 * "from nothing" — start visible-adjacent, never from scale(0). Used by every
 * content reveal from Sprint 3 on; degrades to an opacity-only fade under
 * reduced motion.
 */
export const REVEAL = {
  from: { opacity: 0, y: 16 },
  to: { opacity: 1, y: 0 },
  duration: DURATION.base,
  ease: EASE_OUT,
} as const;

/* ---------------------------- Utilities --------------------------------- */

/** True when the visitor asked the OS to reduce motion. SSR-safe. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type Duration = keyof typeof DURATION;
