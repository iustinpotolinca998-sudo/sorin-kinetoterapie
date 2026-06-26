# Hero asset pipeline — secvența scroll-scrubbed

Documentația pentru generarea secvenței de frame-uri a heroului (Sprint 1),
consumată de canvas-ul din Sprint 2 (`lib/hero.ts` → `HERO_SEQUENCE`).

> **Status (Sprint 0):** frame-urile **nu** sunt încă generate. Generarea
> propriu-zisă necesită skill-ul `ai-hero-asset-pipeline` (Nano Banana + Kling)
> și `ffmpeg` — **niciuna nu este disponibilă în acest mediu remote** (vezi
> PROGRESS.md → „Blocaj Sprint 1"). Pașii de mai jos sunt contractul de
> producție: rulează-i în mediul tău local (VS Code) unde ai skill-ul și
> tooling-ul, sau pune manual frame-urile produse în `/public/frames`.

## Conceptul

O figură anatomică umană cinematică, off-white cald (`#F4EEE6`) pe fundal
aproape negru (`#0A0A0B`), prin care vizitatorul „mișcă camera" pe scroll.
Metafora: injury → recovery (mișcarea revine în corp). Secvența e
**piesa-semnătură** a site-ului — restul paletei rămâne deliberat liniștit în
jurul ei (vezi extragerea `frontend-design` din PROGRESS.md).

## Buget & specificații

| Parametru | Țintă |
|---|---|
| Număr frame-uri | 60–120 (țintă ~90, vezi `HERO_SEQUENCE.targetFrameCount`) |
| Format | WebP optimizat |
| Dimensiuni | ~1280×1600 (portret; vezi `HERO_SEQUENCE.width/height`) |
| Greutate totală secvență | cât mai mică pentru web (țintă: zeci de KB/frame, nu MB) |
| Denumire | `frame_0001.webp`, `frame_0002.webp`, … (1-based, zero-pad 4) |
| Locație | `/public/frames/` |

## Pași (pipeline `ai-hero-asset-pipeline`)

### 1. Nano Banana — contact sheet multi-unghi (consistență)
Generează un **contact sheet** cu aceeași figură din mai multe unghiuri/poziții
ale arcului de mișcare, ca să fixezi identitatea vizuală înainte de animație.
- Prompt-bază (de rafinat la rulare): figură anatomică umană, siluetă curată,
  lumină editorială moale, off-white cald pe fundal aproape negru, fără text,
  fără UI, fără fundal de scenă; aceeași persoană în toate cadrele.
- Păstrează: siluetă, paletă, lumină, material, unghi de cameră consecvent.
- `TODO`: notează aici prompturile finale folosite la rulare.

### 2. Kling — interpolare first/last frame
Din cadrele-cheie aprobate, generează tranziția video (first frame → last
frame) care descrie arcul injury → recovery.
- `TODO`: notează parametrii Kling (durată, first/last frame ales, seed).

### 3. FFmpeg — extragere frame-uri
```bash
# Extrage ~90 frame-uri din clipul Kling, redimensionează și exportă WebP
ffmpeg -i hero.mp4 -vf "fps=30,scale=1280:-1" -q:v 80 public/frames/frame_%04d.webp
# (ajustează fps ca să nimerești numărul-țintă de frame-uri)
```
- Verifică numerotarea 1-based, zero-pad 4 (`frame_0001.webp`).
- Optimizează fiecare WebP (calitate ~75–82) pentru bugetul de greutate.

### 4. QA consistență anatomică (obligatoriu)
Conținut „medical-adjacent": verifică între cadre că figura rămâne coerentă
anatomic (fără membre în plus, fără morph nenatural, proporții stabile). Aruncă
și regenerează cadrele care „derapează". Documentează verdictul aici.

## După generare
1. Pune WebP-urile în `/public/frames`.
2. Setează `HERO_SEQUENCE.frameCount` în `lib/hero.ts` la numărul real.
3. Validează vizual frame-urile (în Claude în Chrome) **înainte** de Sprint 2.
4. Abia apoi se construiește scrub-ul pe canvas (Sprint 2, `scroll-hero-builder`).
