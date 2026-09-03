# subhampanda7.github.io

Personal portfolio of **Subham Panda** — Backend Software Engineer.
Live at **<https://subhampanda7.github.io>**.

A statically exported Next.js site: every section is prerendered to HTML at
build time, so it indexes like a plain document while still running the
animation work on the client.

## Stack

| Concern    | Choice                                                |
| ---------- | ----------------------------------------------------- |
| Framework  | Next.js 16 (App Router, `output: "export"`)           |
| Language   | TypeScript                                            |
| Styling    | Tailwind CSS v4 (CSS-first `@theme` tokens)           |
| Animation  | Motion (Framer Motion) + Lenis for momentum scrolling |
| Icons      | lucide-react, with hand-rolled brand marks            |
| Deployment | GitHub Actions → GitHub Pages                         |

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script                    | Does                                                  |
| ------------------------- | ----------------------------------------------------- |
| `npm run dev`             | Dev server                                            |
| `npm run build`           | Static export into `out/`                             |
| `npm run lint`            | ESLint                                                |
| `npm run typecheck`       | `tsc --noEmit`                                        |
| `npm run optimize:images` | Regenerates `public/img/*` from `assets/`             |

## Project layout

```
src/
  app/           layout, page, metadata, sitemap, robots, globals.css
  components/
    layout/      navbar, footer, backdrop, smooth scroll, scroll progress
    sections/    one folder per page section
    ui/          reusable primitives (Card, Button, Counter, Reveal, …)
    visuals/     ArchitectureFlow data-flow diagrams
  content/       all copy and data — no prose lives in components
  hooks/         useActiveSection, useSpotlight
  lib/           cn(), accent tokens, Lenis helpers
assets/          source images (not deployed)
public/          served files: resume, certificate, generated images
scripts/         build-time image optimisation
```

**Editing content** is the common case, and it never requires touching a
component. Everything lives in `src/content/`:

- `site.ts` — name, role, links, hero phrases, nav sections, tech marquee
- `metrics.ts` — About copy, the latency comparison, animated counters
- `experience.ts` — roles, achievements, impact chips, awards
- `projects.ts` — problem/approach/scale plus the architecture flow nodes
- `skills.ts` — skill categories
- `education.ts` — degrees and recognition

Highlight text inside strings with `**double asterisks**`; `RichText` renders it.

## Images

Source artwork lives in `assets/` and is never served. `npm run optimize:images`
produces the AVIF/WebP/PNG variants and the Open Graph card in `public/img/`.
Re-run it after replacing `assets/profile-hero.png`.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which lints,
typechecks, builds and publishes `out/` to GitHub Pages.

**One-time setup:** in the repository, go to
_Settings → Pages → Build and deployment_ and set **Source** to
**GitHub Actions**. Without this the site keeps serving the old
branch-root files.

## Accessibility & performance notes

- `prefers-reduced-motion` disables Lenis, count-ups and transform animations.
- Section content is server-rendered; only interactive pieces ship client JS.
- The portrait is served as AVIF/WebP with a PNG fallback (~42 KB vs 573 KB).
- The hero entrance is CSS, not JS. Motion would serialise the server HTML at
  `opacity: 0` and only animate after hydration, which pushed LCP past 2.5s.
  The portrait animates on transform alone, because an element that is
  transparent on first paint is permanently disqualified as an LCP candidate.

Measured on the static build at 4× CPU throttling: FCP ~0.25 s, LCP ~0.25 s,
CLS 0, TBT ~0 ms.
