/**
 * Static stand-in for the Sprint 2 scroll-scrubbed canvas figure.
 *
 * A single coherent hairline-SVG composition (per the anti-AI-slop contract):
 * an abstracted human axis with motion arcs sweeping back through the body —
 * the "mișcarea revine în corp" metaphor. This is intentionally a placeholder,
 * not the final hero; it keeps the stage composed and on-brief until the
 * generated WebP frame sequence lands in /public/frames.
 */
export default function HeroFigure({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 440"
      role="img"
      aria-label="Figură anatomică stilizată, mișcarea revine în corp"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Motion arcs returning toward the body (recovery). */}
      <g className="text-sage" opacity={0.55}>
        <path d="M160 60 C 250 120, 250 320, 160 380" />
        <path d="M160 80 C 222 130, 222 310, 160 360" opacity={0.7} />
        <path d="M160 100 C 196 140, 196 300, 160 340" opacity={0.5} />
      </g>

      {/* Abstracted human axis. */}
      <g className="text-bone" opacity={0.85}>
        {/* head */}
        <circle cx={160} cy={70} r={18} />
        {/* spine */}
        <path d="M160 88 L 160 250" />
        {/* shoulders */}
        <path d="M118 120 L 202 120" />
        {/* arms */}
        <path d="M118 120 L 104 196" />
        <path d="M202 120 L 216 196" />
        {/* pelvis */}
        <path d="M132 250 L 188 250" />
        {/* legs */}
        <path d="M138 250 L 128 372" />
        <path d="M182 250 L 192 372" />
        {/* joint accents */}
        <circle cx={160} cy={250} r={3} className="fill-bone" stroke="none" />
        <circle cx={160} cy={120} r={2.5} className="fill-bone" stroke="none" />
      </g>
    </svg>
  );
}
