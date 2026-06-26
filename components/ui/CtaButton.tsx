import Link from "next/link";

type Variant = "primary" | "ghost";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  /** Render dark-on-light (default) or light-on-dark for the hero stage. */
  onDark?: boolean;
};

/**
 * The single button primitive. `primary` is the warm-clay conversion action
 * (reserved for "Programează-te"); `ghost` is the quiet secondary link.
 * Every variant ships real hover / active / focus-visible states.
 */
export default function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
  onDark = false,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-card px-6 py-3 text-sm font-medium tracking-wide " +
    "transition-[transform,background-color,color,border-color] duration-fast ease-brand-out " +
    "active:scale-[0.98] active:duration-micro motion-reduce:transition-none";

  const styles: Record<Variant, string> = {
    primary:
      "bg-clay text-ivory shadow-[0_1px_0_0_rgba(0,0,0,0.04)] hover:bg-clay-600 hover:-translate-y-px",
    ghost: onDark
      ? "text-bone/80 hover:text-bone underline-offset-4 hover:underline decoration-sage"
      : "text-ink-soft hover:text-ink underline-offset-4 hover:underline decoration-sage",
  };

  return (
    <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Link>
  );
}
