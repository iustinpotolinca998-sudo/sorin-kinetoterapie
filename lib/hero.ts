/**
 * Hero scroll-scrubbed sequence — config the Sprint 2 canvas builder consumes.
 *
 * The frame WebPs (frame_0001.webp …) are produced by the `ai-hero-asset-
 * pipeline` skill (Nano Banana → Kling → FFmpeg) and dropped into
 * /public/frames. This file is the single contract between those assets and
 * the canvas component so neither side hardcodes magic numbers.
 *
 * NOTE: as of Sprint 0 the sequence does not exist yet (see
 * docs/hero-asset-pipeline.md). `FRAME_COUNT = 0` is the honest current state;
 * bump it once frames land and the static fallback gives way to the scrub.
 */
export const HERO_SEQUENCE = {
  /** Number of frames currently present in /public/frames. 0 until generated. */
  frameCount: 0,
  /** Target sequence length once generated (60–120 per the brief; aim ~90). */
  targetFrameCount: 90,
  /** Path pattern; index is 1-based, zero-padded to 4 digits. */
  framePath: (i: number) => `/frames/frame_${String(i).padStart(4, "0")}.webp`,
  /** Intrinsic frame dimensions — reserve this aspect-ratio box to keep CLS ~0. */
  width: 1280,
  height: 1600,
  /** Mobile fallback: a single representative frame, no heavy scrub. */
  fallbackFrame: "/frames/frame_0001.webp",
} as const;

export type HeroSequence = typeof HERO_SEQUENCE;
