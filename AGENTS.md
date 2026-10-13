# AGENTS.md

Persistent context for agents working in this repository.

## Project

Scrollytelling.ai — a marketing site + product mock for a scroll-driven storytelling
platform. Dark "obsidian" theme, GSAP ScrollTrigger pinning, react-three-fiber 3D scenes,
and a split-screen Studio workspace.

## Stack

- Next.js 16 (App Router, Turbopack) + React 19 + TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`; config lives in `app/globals.css` `@theme`)
- GSAP 3 + ScrollTrigger, framer-motion 14, three 0.186 + `@react-three/fiber` 9
- Zustand 5 for studio/scroll state

## Commands

```bash
npm install
npm run dev            # dev server (default port 3000)
npx tsc --noEmit       # typecheck
npx next build         # production build (also runs typecheck)
npx next start -p 12000
```

The build runs TypeScript as part of `next build`; a clean build requires zero type errors.

## Routes

| Route       | File                          | Notes                                            |
| ----------- | ----------------------------- | ------------------------------------------------ |
| `/`         | `app/page.tsx`                | Landing: hero, 3 pinned modules, templates, pricing |
| `/showcase` | `app/showcase/page.tsx`       | Filterable template gallery                      |
| `/editor`   | `app/editor/page.tsx`         | Scrolly Studio workspace                         |
| `/create`   | `app/create/page.tsx`         | Alias that renders the same Studio               |
| `/docs`     | `app/docs/page.tsx`           | API guide (`<scrolly-embed>`, `useScrollStep`, bundle) |
| `/pricing`  | `app/pricing/page.tsx`        | Plans, comparison table, FAQ                     |

`app/icon.svg` is the favicon and `app/sitemap.ts` the sitemap.

## Architecture notes

- **Server/client boundary.** Pages are server components; anything with scroll state,
  GSAP, framer-motion or r3f is a `"use client"` component. `ScrollySection` takes a
  **serializable** `mediaKind` string (`"kinetic" | "charts" | "three"`) rather than a
  render-prop — render props crossing the server→client boundary break the build.
- **Scroll primitives.** `components/ScrollySection.tsx` is the core pinned
  text-over-media section (`position: sticky` + a scrubbed ScrollTrigger). `ScrollyHero`
  is the hero with its live preview widget. `lib/scroll.ts` holds `ensureGsap` /
  `ScrollTrigger` helpers; `lib/store.ts` holds the Zustand story store.
- **Performance.** Scroll handlers throttle `setState` so a repaint only happens when the
  rendered value actually changes.
- **Design tokens** live in `app/globals.css` (`--color-obsidian`, `--color-canvas`,
  `--color-indigo-glow`, `--color-emerald-glow`, `--color-violet-glow`, `--color-offwhite`,
  `--color-muted`, `--color-faint`, `--color-line`) exposed as Tailwind utilities
  (`bg-obsidian`, `text-muted`, …). Fonts are wired via Next font variables
  (`--font-jakarta` display, `--font-inter` body, `--font-jetbrains` mono) — keep these
  distinct from the design-token CSS variables to avoid collisions.

## Verification

There is no test runner. Verify with `npx tsc --noEmit` and `npx next build`, then smoke
the routes against a running `next start`. Check WebGL pages for console errors and
confirm no horizontal overflow at 390px.
