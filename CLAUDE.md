# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build / Run / Test

```bash
npm run dev            # Next.js dev server (Turbopack) → http://localhost:3000
npm run build          # Production build (runs check-data prebuild)
npm run start          # Production server
npm run lint           # ESLint
npm test               # vitest run (21 tests, jsdom environment)
npm run test:watch     # vitest in watch mode
npx vitest run -t "test name pattern"   # Run a single test by name
npx vitest run src/components/__tests__/TaijiDiagram.test.tsx  # Run one test file
npm run test:e2e       # Playwright e2e tests (in e2e/ directory)
npm run check-data     # Validate domains.ts + panorama-domains.ts data integrity
npx tsc --noEmit       # TypeScript type-check (zero errors required)
```

## Architecture

**Next.js 16 App Router** + React 19 + Tailwind CSS v4 + GSAP 3. Localized content site exploring Taiji (yin-yang) principles through 6 scientific domains.

### Routing & i18n

- `src/i18n/routing.ts` — Two locales (`zh`, `en`), default `zh`, `localePrefix: "always"`
- `next-intl` v4 with `createNextIntlPlugin()` wraps the Next.js config. Messages: `src/messages/zh.json` + `en.json`. Client components use `useTranslations()` from `"next-intl"`; server components use `await getMessages()` + manual key access.
- `generateStaticParams()` in domain detail pages pre-generates all `[locale]/[slug]` combos

### Data Layer

- `src/data/types.ts` — `DomainContent`, `PanoramaNode` interfaces + `getDomainBySlug()` helper
- `src/data/domains.ts` — 6 domains with full content (overview, taijiConnections, keyExamples, taijiComparison, references). ~47KB.
- `src/data/panorama-domains.ts` — 21 panorama nodes (6 core + 15 extended), with connection graphs
- `src/lib/check-data.ts` — Validation functions (`validateDomains`, `validatePanoramaNodes`) for data integrity; run via `check-data-cli.ts` at prebuild

### Component Organization

**Pages** (App Router):
- `src/app/[locale]/page.tsx` — Homepage: Hero (text + TaijiDiagram) + DomainCard gallery + panorama link
- `src/app/[locale]/domain/[slug]/page.tsx` — Domain detail: Hero viz + overview + connections + examples + comparison + references + visual comparison insert
- `src/app/[locale]/panorama/page.tsx` — 3D force-graph panorama map

**Hero visualizations** — registry pattern (`src/components/domain-visualizations/registry.ts`):
- Each domain slug maps to a viz component via `getVisualization(slug)`. Wrapper: `DomainHeroVisualization.tsx`
- `TaijiMathViz.tsx` — SVG trigram wheel with hover binary reveal
- `QuantumEntanglementViz.tsx` — Canvas entangled particles + Taiji
- `SymmetryBreakingViz.tsx` — Canvas Mexican hat potential
- `InformationTheoryViz.tsx` — Canvas bit grid entropy animation
- `ChaosFractalViz.tsx` — Canvas Sierpinski + strange attractor
- `SystemsScienceViz.tsx` — (existing, not yet upgraded)

**Comparison (inline) visualizations** — same registry pattern via `getComparisonVisualization(slug)`:
- `DomainComparisonVisuals.tsx` wrapper
- `TaijiMathComparison.tsx` — 3 interactive SVG comparisons (binary, trigram builder, S-curve)
- `QuantumComparison.tsx` — 3 interactive comparisons (superposition, entanglement, wave evolution)

**Key components:**
- `TaijiDiagram.tsx` — Client-side GSAP-driven rotating taiji SVG with RPM counter + orbiting domain icons + narration that changes with speed
- `DomainCard.tsx` — Mouse-tracking radial-glow cards with hover CTA reveal
- `ParticleField.tsx` — Fixed background: Canvas particle system + 3 CSS mesh-gradient orbs with drift animations
- `NavBar.tsx`, `Footer.tsx` — Layout shell components

### 3D Panorama (`src/components/panorama/`)

Three.js via `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing`. Dark space theme.

- `PanoramaScene.tsx` — R3F Canvas setup: OrbitControls, stars (`PanoramaStarfield`), connections (`PanoramaConnections`), nodes (`PanoramaNodes`), post-processing (Bloom)
- `PanoramaNodes.tsx` — 21 node meshes: icosahedrons (core) / octahedrons (extended) with wireframe cages, sinusoidal float bobbing, self-rotation, particle orbit rings on hover, torus selection rings
- `PanoramaConnections.tsx` — CylinderGeometry tubes between connected nodes, quaternion alignment via `setFromUnitVectors`, color lerp on hover
- `types.ts` — Color constants (`COLORS` object: sky blue core / light green extended), `PositionedNode`, connection/nodes animation state types
- `animations.ts` — Shared helpers: `easeOut()`, `lerpColor()`, `LERP_SPEED`

**Layout:** `src/lib/panorama-layout.ts` (2D force-directed) → `panorama-layout-3d.ts` extends to 3D with seeded PRNG (mulberry32, seed=42) for SSR/CSR determinism.

## Key Patterns & Conventions

### GSAP usage
- Always inside `useEffect` with `typeof window === "undefined"` guard and GSAP `context()` for cleanup
- Dynamic import: `import("gsap")` not static import (avoids SSR issues)
- Stagger animations use the project's cubic-bezier: `cubic-bezier(0.32,0.72,0,1)`

### Test environment (jsdom)
- Canvas/WebGL mocks in `vitest.setup.ts` — `getContext()` returns mock objects for both "2d" and "webgl2"
- Three.js components need defensive guards against missing DOM-like properties: `if (mesh?.quaternion)`, `if (cageRef.current?.rotation)`, etc.
- `ResizeObserver` and `IntersectionObserver` are globally mocked
- Components using `useFrame` or Canvas animations must handle jsdom where requestAnimationFrame doesn't fire

### Color system
- Domain accent colors defined per-domain in `domains.ts` (`color` field)
- Panorama uses sky-blue (#38bdf8) core / light-green (#4ade80) extended — defined in `panorama/types.ts` COLORS
- Gold (#d4a853) used for TaijiDiagram specific accents (RPM display, narration)
- Dark theme: bg `#09090b` / `#0c0c0f`, text zinc-100 through zinc-600
- Border accent pattern: `border-{color}/20 bg-{color}/[0.04]` for pills/badges

### Double-Bezel card pattern
Repeated UI pattern: outer `p-[1px]` div with gradient/transparent bg → inner `rounded-[calc(...-1px)]` div with solid bg + subtle border. Used across domain cards, detail sections, and comparison panels.

### Global styles (`src/app/globals.css`)
- Tailwind CSS v4 `@import "tailwindcss"` + `@theme` block for custom properties
- Keyframes defined: `spin`, `orb-drift-1/2/3` (ParticleField orbs), `fade-up-in` (stagger card gallery)
- Font variables: `--font-geist-sans`, `--font-geist-mono`, `--font-song` (for Chinese serif flair)
- Custom utility: `.animate-fade-up-stagger` applies staggered `fade-up-in` to direct children

### E2E tests (`e2e/`)
Playwright tests for critical paths. Run with `npm run test:e2e`. Separate from vitest unit tests.

