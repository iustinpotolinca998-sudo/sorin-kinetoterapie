# CLAUDE.md — Site Kinetoterapie SORIN

## Proiect
Site de marketing + programări pentru cabinetul de kinetoterapie al lui Sorin, Iași.
**KPI principal: programări pacienți.** Fiecare decizie servește conversia, nu flexul de portofoliu.
Copy românesc-first. Ton: cald, uman, de încredere, calm — recuperare, NU clinic-rece.
Public: oameni cu durere / post-accidentare / sportivi / vârstnici. Trebuie să inspire siguranță.

## Stack
- Next.js 14 (App Router) + TypeScript (strict) + Tailwind CSS
- GSAP + ScrollTrigger + Lenis (animație) — FĂRĂ 3D greu (vezi Hero)
- Supabase — submisii formular programare/contact
- Deploy: Vercel
Server Components by default. Client Components doar unde e nevoie de interactivitate
(canvas-ul heroului, formularul). Nu over-engineer. Ține PROGRESS.md la zi pe sprinturi.

## Hero — piesa centrală (citește atent)
Secvență de imagini **scroll-scrubbed pe canvas 2D fix (sticky)**, condusă de GSAP ScrollTrigger + Lenis.
O figură anatomică umană cinematică (corp/siluetă) prin care vizitatorul „mișcă camera" pe scroll —
metaforă injury → recovery (mișcarea revine în corp). Off-white cald pe fundal aproape negru.
Frame-urile se generează cu pipeline-ul Nano Banana → Kling (skill `ai-hero-asset-pipeline`),
se construiește cu skill `scroll-hero-builder`.

### Decizii LUATE — NU le redeschide fără confirmare explicită
- RESPINS: React Three Fiber / Three.js / model GLTF. NU readuce particule/mesh 3D la hero.
- RESPINS: video autoplay ca hero (LCP/CLS, autoplay iOS, seam la loop).
- RESPINS: zone anatomice clickabile pe durere — prea fragil.
- LCP-ul trebuie să fie **textul headline server-renderat**, NU canvas-ul. Canvas-ul nu blochează conținutul.
- Mobil: **fallback static obligatoriu** — fără scrub greu pe ecran mic (imagine statică sau secvență mult redusă).

## Direcția vizuală (PROPUSĂ — confirmată în Claude Design înainte de build)
- Hero: fundal `#0A0A0B`, figură off-white cald `#F4EEE6`. Tranziție proiectată hero-întunecat → corp-luminos.
- Corp site: fundal ivory cald `#F7F4EF`, text ink `#1F1B17`/`#2A2622`.
- Accent brand (calm, recuperare): salvie `#5E7C6B`. CTA (să iasă în evidență pentru programări): lut cald `#C06A4B`.
  Maxim 2 roluri de culoare cu rol clar; neutrele fac munca grea. (Abatere conștientă de la regula „un singur accent" — motiv: conversie.)
- Tipografie: display serif rafinat (Fraunces) + body sans curat (Inter). Tracking pe display, line-length 60–75ch.
- Spațiu dintr-o scală (4/8px), nu px aleatoriu. Whitespace generos. Layout editorial, asimetric — NU totul centrat.

## Sistem de mișcare (din emilkowalski/skills + impeccable)
- UN singur ease pe tot site-ul (ex. `power3.inOut`), o scală de durate: fast 0.2–0.3s / base 0.6s / slow 1.0–1.2s.
  Mișcarea scalează cu mărimea elementului (UI mic = rapid, tranziții full-page = lent).
- Pattern-uri permise: pinning, scrubbing (scroll ↔ progres animație), staggered reveal.
- DOAR `transform`/`opacity` în animații. `will-change: transform` pe elementele animate greu.
  Listeners passive. ScrollTrigger-uri grupate în timeline-uri, nu zeci de instanțe.
- `prefers-reduced-motion`: respectat — secvența heroului se oprește pe un cadru-cheie, revelele devin fade simplu.

## Contract anti-AI-slop (obligatoriu)
- FĂRĂ gradient mov/albastru generic, FĂRĂ glassmorphism by default, FĂRĂ look de shadcn/ui nemodificat.
- FĂRĂ emoji ca iconuri. Un singur set coerent de SVG inline, weight hairline.
- FĂRĂ lorem ipsum — copy real în română (placeholder realist marcat `TODO:` unde lipsesc datele lui Sorin).
- Fotografii (dacă există) gradate spre paletă; preferă poze reale Sorin/cabinet (`TODO:`). Fără stock generic.
- Butoane cu stări reale: hover / active / focus-visible. Nu flat default.
- Carduri: variază ritmul, nu zid de carduri cu aceeași umbră.
- Microcopy cald, românesc, nu filler corporate.

## SEO / local
- SEO local RO: „kinetoterapie Iași", „recuperare medicală Iași" etc. Schema LocalBusiness.
- HTML semantic, conținut server-renderat, metadata completă, sitemap, OG images.

## Workflow
- Claude Code (VS Code) = execuție.
- Claude în Chrome = QA vizual + performanță (FPS, mobil real) înainte de „gata".
- Claude Design = iterare pe art direction când e nevoie.
- Buget perf: Lighthouse mobil (nu doar desktop), LCP < 2.5s, CLS ~0. Test pe device real mid-range.

## Sprinturi (starea detaliată în PROGRESS.md)
- Sprint 0: setup skills + scaffolding + CLAUDE.md/PROGRESS.md + design tokens (culori/type/spacing/ease). ← START
- Sprint 1: generare assets hero (ai-hero-asset-pipeline) → frame-uri WebP numerotate în /public/frames.
- Sprint 2: hero scroll-scrubbed pe canvas (scroll-hero-builder) + Lenis + loader, cu fallback mobil static.
- Sprint 3: secțiuni landing (servicii, metoda/abordare, despre Sorin, testimoniale) cu staggered reveals.
- Sprint 4: formular programare/contact → Supabase + schema LocalBusiness + SEO.
- Sprint 5: pass de performanță (impeccable) + QA în Chrome pe mobil real + Lighthouse.
- (Opțional, ulterior, DOAR la confirmare: cursuri + Stripe — întrebare nerezolvată: doar acces Checkout vs LMS complet.)

În PROGRESS.md, la fiecare sprint: ce s-a făcut, ce a rămas, ce probleme au apărut, ce ai extras din skill-uri.
