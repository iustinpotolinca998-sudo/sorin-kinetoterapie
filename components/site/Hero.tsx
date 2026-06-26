import CtaButton from "@/components/ui/CtaButton";
import HeroFigure from "@/components/site/HeroFigure";

/**
 * Hero stage. The dark canvas the scroll-scrubbed figure sequence will own in
 * Sprint 2 — for now a static, composed stand-in. The <h1> is server-rendered
 * and is the intended LCP; nothing here blocks it.
 */
export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-bone">
      {/* Faint sage glow behind the figure — depth without the generic gradient. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(115% 85% at 72% 22%, rgba(94,124,107,0.12), transparent 58%)",
        }}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-gutter pb-20 pt-32">
        <div className="grid w-full items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
          {/* Text — editorial, left-weighted (not centered). */}
          <div className="max-w-measure">
            <p className="text-eyebrow font-medium uppercase text-sage-200/90">
              Kinetoterapie &amp; recuperare medicală · Iași
            </p>
            <h1 className="mt-5 text-display-xl text-bone">
              Corpul tău știe
              <br />
              drumul înapoi.
            </h1>
            <p className="mt-6 max-w-measure-tight text-pretty text-base leading-relaxed text-bone/70 sm:text-lg">
              Recuperare după accidentări, dureri de spate sau operații. Te
              evaluez, construim împreună un plan clar și revenim la mișcare,
              pas cu pas, fără grabă.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
              <CtaButton href="#programare">Programează o evaluare</CtaButton>
              <CtaButton href="#metoda" variant="ghost" onDark>
                Vezi cum lucrez
              </CtaButton>
            </div>

            <p className="mt-6 text-sm text-bone/45">
              {/* TODO: confirmă detaliile reale cu Sorin */}
              Răspund în aceeași zi · Evaluare inițială, fără angajament.
            </p>
          </div>

          {/* Figure stage — placeholder for the Sprint 2 canvas sequence. */}
          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            <HeroFigure className="mx-auto h-auto w-2/3 max-w-[320px] md:w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
