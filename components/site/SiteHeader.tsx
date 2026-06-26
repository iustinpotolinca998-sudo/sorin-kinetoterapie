import Link from "next/link";
import CtaButton from "@/components/ui/CtaButton";

/**
 * Minimal header that sits over the dark hero. Server-rendered, no client JS.
 * Wordmark left, single conversion action right — nothing competes with the
 * hero headline (the LCP).
 */
export default function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-gutter py-6">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-bone"
          aria-label="Kinetoterapie Sorin — acasă"
        >
          Sorin
          <span className="text-bone/55"> · kinetoterapie</span>
        </Link>

        <nav className="flex items-center gap-6" aria-label="Principal">
          <Link
            href="#metoda"
            className="hidden text-sm text-bone/70 transition-colors duration-fast ease-brand-out hover:text-bone sm:inline"
          >
            Metoda
          </Link>
          <CtaButton href="#programare" onDark>
            Programează-te
          </CtaButton>
        </nav>
      </div>
    </header>
  );
}
