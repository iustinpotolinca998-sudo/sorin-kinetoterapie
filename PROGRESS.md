# PROGRESS — Site Kinetoterapie SORIN

Jurnal de sprinturi. La fiecare sprint: ce s-a făcut, ce a rămas, ce probleme au
apărut, ce s-a extras din skill-uri.

---

## Stare generală

| Sprint | Subiect | Stare |
|---|---|---|
| 0 | Setup + scaffolding + tokens + motion + Lenis/GSAP | ✅ Făcut |
| 1 | Assets hero (Nano Banana → Kling → FFmpeg) | ⛔ Blocat în acest mediu (vezi mai jos) |
| 2 | Hero scroll-scrubbed pe canvas + fallback mobil | ⏳ După confirmarea vizuală a frame-urilor |
| 3 | Secțiuni landing + staggered reveals | ⏳ |
| 4 | Formular programare → Supabase + SEO/schema | ⏳ |
| 5 | Pass performanță + QA Chrome mobil + Lighthouse | ⏳ |

---

## Sprint 0 — fundație ✅

### Ce s-a făcut
- **Scaffold Next.js 14** (App Router, TypeScript `strict` + reguli extra:
  `noUncheckedIndexedAccess`, `noUnusedLocals/Parameters`), Tailwind, PostCSS.
  Structură: `app/`, `components/` (`site/`, `ui/`, `providers/`), `lib/`,
  `public/`, `docs/`.
- **CLAUDE.md** păstrat verbatim. **PROGRESS.md** (acest fișier).
- **Design tokens** în `tailwind.config.ts` — singura sursă de adevăr pentru
  culoare/type/spacing/timing. Componentele citesc tokenul, niciodată hex/px.
  - Culori cu rol semantic: `night` (hero), `bone` (figură/text pe închis),
    `ivory` (corp), `ink`/`ink-soft`/`ink-muted`, `sage` (brand), `clay` (CTA),
    `line` (hairline).
  - Type: scală display fluidă cu `clamp()` (ceiling 6rem), `tracking` strâns,
    `max-w-measure` 68ch. Fonturi Fraunces (display) + Inter (body) via
    `next/font` ca variabile CSS.
  - Spacing: peste scala nativă 4/8 a Tailwind, tokeni `section`/`gutter`.
  - Motion: `transitionTimingFunction` `brand` (in-out) + `brand-out` (ease-out),
    durate `micro/fast/base/slow`. Scală `zIndex` semantică (fără 999/9999).
- **`lib/motion.ts`** — sistemul de mișcare (EASE/DURATION/STAGGER/REVEAL +
  `prefersReducedMotion()`), framework-agnostic, safe în Server & Client.
- **Lenis + GSAP + ScrollTrigger** cablate corect într-un singur provider client
  (`components/providers/SmoothScroll.tsx`): Lenis e sursa unică de scroll și dă
  `ScrollTrigger.update`; `gsap.ticker` conduce `lenis.raf`; `lagSmoothing(0)`;
  cleanup pe unmount; **un singur rAF loop**. `prefers-reduced-motion` → fără
  Lenis (scroll nativ). **Zero animații de conținut** (corect pentru Sprint 0).
- **Shell home**: hero server-renderat (LCP = `<h1>`, neînvelit în nicio
  animație opacity-0), placeholder hairline-SVG pentru figură (`HeroFigure`),
  bandă „metodă" scurtă, ancoră „programare", footer cu NAP `TODO`.
- **`fără three.js`** — confirmat, nu e în dependențe.
- Verificare: `npx tsc --noEmit` și `npm run build` (vezi „Verificare" mai jos).

### Ce a rămas
- Lock paletă + fonturi în Claude Design (vezi „Conflicte semnalate").
- Date reale Sorin (NAP, telefon, email, program) — marcate `TODO` în cod.

### Review adversarial + fixe aplicate
Pass de review pe 3 dimensiuni (corectitudine/wiring, accesibilitate,
anti-slop/tokeni), fiecare finding verificat adversarial. 14 semnalate → 10
confirmate (4 false-pozitive respinse corect, ex. „lagSmoothing nerestaurat" =
benign, providerul nu se demontează niciodată). Toate cele 10 aplicate:
- **P1** `next/font` fără subset `latin-ext` → glifele RO `ș/ț/ă` cădeau pe font
  de sistem. Adăugat `latin-ext` la Fraunces + Inter.
- **P1** CTA primar pica contrastul WCAG AA (ivory pe clay = 3.5:1). Butonul
  folosește acum `clay-600` (#A0512F, ~5.2:1) resting + `clay-700` hover.
- **P2** Contrast AA: microcopy hero `bone/45`→`/55`, copyright footer
  `bone/40`→`/55`.
- **P2** Skip-link „Sari la conținut" adăugat (target `#main`, era orfan).
- **P2** Lenis `anchors: true` → CTA-urile cu hash gliseaza, nu sar.
- **P2/P3** Em-dash eliminat din title/OG, copy vizibil, și 2 `aria-label`.
- **P3** Glow-ul hero nu mai dublează hex-ul sage: o singură sursă `--sage-rgb`,
  citită de tokenul `sage` și de gradient.

Re-verificat: `tsc --noEmit` ✅, `next build` ✅ (home tot static, 94 kB),
zero em-dash în `app/`+`components/`, CSS compilat confirmat (var sage, clay-600/700,
skip-link).

---

## Ce s-a extras din skill-uri (Sprint 0)

> Regula proiectului: înainte de fază, citește skill-urile relevante și scrie ce
> ai extras. Mai jos, pe scurt, per skill (extragere făcută prin citire paralelă
> a fiecărui skill). Precedența: `frontend-design`+`taste` (ce arătăm) →
> `emilkowalski` (cum se mișcă) → `impeccable` (bara de calitate + perf).

### `frontend-design` (direcția vizuală — citit primul)
Fundamentează totul în lumea subiectului: corpul, respirația, range-of-motion,
mâinile terapeutului, arcul recuperării. Cheltuie îndrăzneala într-**un singur**
element-semnătură (aici: secvența scroll-scrubbed a corpului) și ține restul
liniștit. „Mai puțină mișcare = mai mult" → validează decizia de a cabla doar
infrastructura de motion în Sprint 0, fără animații de conținut. **Constatare
critică:** paleta propusă (ivory cald + serif high-contrast + accent
clay/terracotta) e aproape identică cu „AI-default look #1" documentat de skill;
o propunere nu e o „fixare" de brief, deci axa asta nu trebuie cheltuită pe un
default — vezi „Conflicte". Aplicat: tokeni cu nume de **rol** (nu de culoare),
accente marcate „under review", semnătura = mișcarea, nu paleta.

### `taste-skill` (+ `high-end-visual-design`, `minimalist-ui`)
Citește camera: pentru un public trust-first (durere/post-accidentare/vârstnici)
diale **joase** — VARIANCE 4–5 (editorial-asimetric, nu haotic), MOTION 3–4
(liniștit, motivat), DENSITY 2–3 (whitespace de galerie). Locks de consistență:
UN theme, UN sistem de accent (sage + clay, restul neutre), O scală de radius, O
familie de iconuri cu stroke standard, UN registru de copy. Contract anti-slop
aplicat acum: **zero em-dash** (curățat din copy), fără emoji, fără
glassmorphism default, fără „scroll cue" (eliminat din hero), fără zid de carduri
egale. Aplicat: `ink-muted` rezervat doar pentru meta (nu body), `max-w-measure`
pe paragrafe, secțiuni cu `py-section`.

### `emilkowalski/skills` → `emil-design-eng` (craft-ul de mișcare)
Easing-ul e **semantic și direcțional**: enter/exit → **ease-out** (feedback
responsiv), mișcare pe ecran/morph → ease-in-out, scrub → **linear**. Niciodată
ease-in pe UI. Durata invers proporțională cu frecvența și legată de mărime:
press 0.12–0.16s, hover/UI 0.2–0.3s, reveal 0.6s, hero/marketing 1.0–1.2s.
Nimic nu apare „din nimic" (start din `y:8–16px`/`scale:0.96`, niciodată
`scale:0`); animează doar `transform`/`opacity`. **Refinare adoptată:** vezi
„Contract de mișcare" — am adăugat un ease-out pentru intrări/UI lângă
`power3.inOut`, plus un press `scale(0.98)` ~140ms pe CTA (suprafață de
conversie).

### `emilkowalski/skills` → `review-animations` (bara de calitate motion)
Contract GPU-only: doar `transform`/`opacity` (nimic layout/`color`-on-scroll).
`will-change` cu disciplină — doar pe elementul pinned activ, nu global.
Listeners passive; **niciodată** `window.addEventListener('scroll')` — Lenis
conduce ScrollTrigger. `prefers-reduced-motion` = reduce mișcarea dar **păstrează
opacity/comprehensiune**, gate hover pe `(hover:hover)`/`(pointer:fine)`. Pattern
`ScrollTrigger.batch()` pentru reveal-uri grupate (schelet pentru Sprint 3).

### `impeccable` (bara de calitate + performanță)
Core Web Vitals ca contract: **LCP < 2.5s** (= headline-ul RO server-renderat,
ținut în afara oricărei intrări opacity-0/class-gated, altfel randările headless
trimit secțiunea goală), **CLS ~0** (`next/font` swap + cutie cu aspect-ratio
rezervată pentru canvas-ul din Sprint 2 + dimensiuni pe imagini), **INP < 200ms**.
Un singur rAF loop (Lenis prin `gsap.ticker`). **Detector local** inclus
(`scripts/detector`, fără rețea) + hook opțional la edit-time. **Două conflicte
verificate** (vezi mai jos): Fraunces ȘI Inter sunt pe lista de fonturi
„reflex-reject" a skill-ului (hardcodate în `overused-font`), iar `#F7F4EF`
trece gate-ul `isCreamColor` → ar declanșa `cream-palette`. `ink-muted` pe body
peste fundal cald = eroarea #1 de contrast → rezervat pentru meta.

---

## Conflicte semnalate (pentru lock-ul din Claude Design, înainte de Sprint 3)

Acestea contrazic **chiar contractul anti-AI-slop din CLAUDE.md**. Le-am
implementat ca atare (sunt direcția propusă, marcată „de confirmat"), dar le
ridic explicit ca să le decizi informat. Swap-ul e trivial: totul e în tokeni.

1. **Paletă ≈ AI-default look #1.** `ivory #F7F4EF` + serif high-contrast +
   accent clay `#C06A4B` = exact look-ul default semnalat de `frontend-design` și
   de banda „premium-consumer" din `taste-skill`; `impeccable` confirmă că
   `#F7F4EF` (rgb 247,244,239, warmth 8) declanșează regula `cream-palette`.
   Sage-ul atenuează, dar combinația rămâne în familia semnalată. **Opțiuni la
   lock:** (a) justifică deliberat (cald = anti-clinic, siguranță pentru oameni
   cu durere) și acceptă conștient; (b) răcește neutrele / mută corpul spre un
   off-white la chroma ~0 și duci căldura prin accent + tipografie + foto, nu
   prin fundal.

2. **Fonturi pe lista „reflex-reject".** Fraunces (display) ȘI Inter (body) sunt
   ambele semnalate de `impeccable` (și Fraunces de `taste-skill`) ca defaults
   LLM. **Opțiuni:** (a) justifică Fraunces prin vocea warm/editorial și
   acceptă; (b) rotește la o pereche ne-default (display: Reckless / Tiempos /
   Recoleta / EB Garamond; body: un grotesk mai puțin folosit) — o linie în
   `app/layout.tsx`, restul nu se atinge (tokeni `--font-display`/`--font-sans`).

3. **Deviere asumată de la „un singur ease"** — vezi „Contract de mișcare".
   Nu e un conflict de rezolvat, ci o decizie luată conform precedenței.

---

## Contract de mișcare (final, Sprint 0)

CLAUDE.md cere „un singur ease". Precedența proprie a proiectului pune însă
`emilkowalski/skills` la conducerea craft-ului de mișcare, iar acel skill (+
`review-animations`) e ferm: **intrările trebuie ease-out**, iar un scrub trebuie
**linear**. Am păstrat deci un set mic și principial, nu un singur curve:

- `EASE = power3.inOut` — mișcare/morph + reveal-uri scroll-driven (default).
- `EASE_OUT = power3.out` — intrări/ieșiri + micro-interacțiuni UI.
- `EASE_SCRUB = none` (linear) — **doar** scrub-ul heroului (1:1 cu scrollbar-ul).
- Durate: `micro 0.14` / `fast 0.25` / `base 0.6` / `slow 1.1`. Tier-ul slow e
  rezervat hero/marketing, niciodată UI interactiv.
- Doar `transform`/`opacity`. `prefers-reduced-motion` respectat la nivel de
  infrastructură (fără Lenis, reveal-urile devin fade simplu).

---

## Sprint 1 — assets hero ⛔ BLOCAT în acest mediu

**Generarea frame-urilor nu poate rula în acest mediu remote.** Lipsesc:
- skill-ul `ai-hero-asset-pipeline` (nu există aici — e skill-ul tău local/user);
- skill-ul `scroll-hero-builder` (idem, necesar Sprint 2);
- `ffmpeg` și ImageMagick (neinstalate);
- acces la Nano Banana (Gemini Image) / Kling (fără chei API / fără MCP de gen).

### Ce am pregătit în loc (ca să nu fie blocaj la rândul lui)
- `public/frames/` creat (placeholder `.gitkeep` + README).
- `lib/hero.ts` — `HERO_SEQUENCE`: contractul tipat dintre assets și canvas
  (path pattern `frame_%04d.webp`, `frameCount` = 0 acum, țintă ~90, dimensiuni
  pentru cutia cu aspect-ratio, frame de fallback mobil).
- `docs/hero-asset-pipeline.md` — pipeline-ul complet documentat (prompt Nano
  Banana contact-sheet multi-unghi, pași Kling first/last frame, comandă FFmpeg
  de extragere, convenție denumire, buget, QA consistență anatomică).
- `HeroFigure` — placeholder hairline-SVG on-brief, ca heroul să arate intenționat
  până vin frame-urile reale.

### Cum continuăm Sprint 1
Rulează pipeline-ul în mediul tău local (VS Code), unde ai skill-urile și
`ffmpeg`, sau printr-un MCP de generare imagine/video. Pune WebP-urile în
`/public/frames`, setează `HERO_SEQUENCE.frameCount`, validează vizual (Claude în
Chrome) — abia apoi Sprint 2.

---

## Decizii deschise (pentru lock)
- Paletă finală (vezi conflict #1).
- Pereche de fonturi finală (vezi conflict #2).
- Hook `impeccable` la edit-time: pornit (`node .agents/skills/impeccable/scripts/hook-admin.mjs on`)
  sau nu. E local și safe, dar ar semnala chiar paleta/fonturile propuse acum —
  de pornit după ce fixezi direcția, ca să nu fie zgomotos. **Nu l-am pornit** —
  e o modificare de workflow, decizia ta.
- Cursuri/Stripe: rămâne „later" (Checkout vs LMS) — nu intră în MVP.
