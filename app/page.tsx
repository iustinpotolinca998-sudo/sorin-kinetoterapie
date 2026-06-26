import SiteHeader from "@/components/site/SiteHeader";
import Hero from "@/components/site/Hero";
import CtaButton from "@/components/ui/CtaButton";

/**
 * Home — Sprint 0 shell.
 *
 * Foundation scope only: the server-rendered hero (LCP = the <h1>), one short
 * "method" band so the dark→light transition and smooth scroll are real, and a
 * booking CTA anchor. The full landing sections (servicii, metodă, despre,
 * testimoniale) arrive in Sprint 3; the booking form in Sprint 4.
 */
const FOCUS_AREAS = [
  "Dureri de spate și de gât",
  "Recuperare post-accidentare",
  "Reabilitare după operație",
  "Sportivi în revenire",
  "Mobilitate pentru vârstnici",
];

export default function HomePage() {
  const year = new Date().getFullYear();

  return (
    <>
      <SiteHeader />

      <main id="main">
        <Hero />

        {/* Method — brief, editorial. Full sections come in Sprint 3. */}
        <section id="metoda" className="bg-ivory">
          <div className="mx-auto max-w-6xl px-gutter py-section">
            <div className="grid gap-12 md:grid-cols-[1fr_0.8fr] md:gap-16">
              <div>
                <h2 className="text-display-md text-ink">
                  Recuperarea nu e o cursă.
                  <br />
                  E un drum făcut bine.
                </h2>
                <p className="mt-6 max-w-measure text-pretty text-lg leading-relaxed text-ink-soft">
                  Pornim de la o evaluare atentă: ce te doare, de când, ce îți
                  dorești înapoi. Construim un plan pe care îl înțelegi și pe
                  care îl ajustăm pe parcurs. Lucrez cu tine, nu doar cu
                  simptomul.
                </p>
              </div>

              <div className="md:pt-3">
                <p className="text-eyebrow font-medium uppercase text-ink-muted">
                  Pentru cine
                </p>
                <ul className="mt-5 space-y-3">
                  {FOCUS_AREAS.map((area) => (
                    <li
                      key={area}
                      className="border-b border-line pb-3 text-base text-ink-soft last:border-0"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Booking anchor — real form wired to Supabase in Sprint 4. */}
        <section id="programare" className="bg-ivory-dim">
          <div className="mx-auto max-w-6xl px-gutter py-section">
            <div className="max-w-measure">
              <h2 className="text-display-md text-ink">
                Hai să începem cu o evaluare.
              </h2>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-ink-soft">
                Spune-mi pe scurt ce te aduce aici. Îți răspund în aceeași zi și
                stabilim un moment care ți se potrivește.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                {/* TODO(Sprint 4): formular real → Supabase. Deocamdată telefon/email. */}
                <CtaButton href="tel:+40000000000">
                  Sună acum
                </CtaButton>
                <CtaButton href="mailto:contact@example.ro" variant="ghost">
                  Scrie-mi un mesaj
                </CtaButton>
              </div>
              <p className="mt-6 text-sm text-ink-muted">
                {/* TODO: date reale Sorin */}
                Telefon și adresă de email — placeholder până la datele reale.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-night text-bone">
        <div className="mx-auto max-w-6xl px-gutter py-16">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="font-display text-lg">
                Sorin<span className="text-bone/55"> · kinetoterapie</span>
              </p>
              <p className="mt-3 max-w-measure-tight text-sm leading-relaxed text-bone/60">
                Kinetoterapie și recuperare medicală în Iași. Revenim împreună
                la mișcarea care te ține în formă.
              </p>
            </div>

            <div className="text-sm text-bone/70">
              {/* TODO: înlocuiește cu datele reale ale cabinetului */}
              <p>Adresă: TODO, Iași</p>
              <p className="mt-2">Telefon: TODO</p>
              <p className="mt-2">Email: TODO</p>
              <p className="mt-2">Program: TODO</p>
            </div>
          </div>

          <p className="mt-12 text-xs text-bone/40">
            © {year} Kinetoterapie Sorin, Iași.
          </p>
        </div>
      </footer>
    </>
  );
}
