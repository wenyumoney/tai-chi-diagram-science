# Design System: 太极图 × 现代科学 (Taiji Diagram × Modern Science)

## 1. Visual Theme & Atmosphere

**Archetype: Ethereal Glass × Editorial Depth**

A bilingual (Chinese/English) popular-science website exploring the connections between the Taiji diagram (Yin-Yang philosophy) and modern science. The atmosphere is deep, contemplative, and scholarly — like a planetarium wrapped in black velvet. The interface breathes heavily with generous negative space, while subtle mesh-gradient orbs drift imperceptibly in the deep OLED background, evoking cosmic microwave background radiation.

- **Density: 4 (Art Gallery Airy)** — Generous section gaps (`py-24` to `py-40`), broad negative space, every element has room to breathe. Cards are islands, not walls.
- **Variance: 8 (Asymmetric Anti-Center)** — Hero uses a split-screen layout (`grid-cols-[1fr_1.2fr]`), headers are left-aligned, no centered H1 sections. The panorama map is free-pannable with no fixed center.
- **Motion: 6 (Fluid CSS + Precision GSAP)** — All transitions use a custom deceleration curve. The Taiji diagram rotates with quadratic acceleration via GSAP `power1.in`. Scroll entrances use IntersectionObserver-triggered staggered fade-ups. No continuous animation loops outside the Taiji rotation.

**Key emotional notes:** Scholarly, not mystical. Precise, not cold. The design communicates that ancient Chinese philosophy and cutting-edge science speak the same language — and the visitor is being let in on the conversation.

## 2. Color Palette & Roles

### Neutral Foundation (Zinc Scale)
- **Deep Void** (`#09090b`) — Root background. Off-black charcoal, never pure `#000`. The canvas everything floats on.
- **Surface Depth** (`#0c0c0f`) — Inner core of Double-Bezel cards. Slightly lifted from the void for subtle depth.
- **Whisper Border** (`rgba(255,255,255,0.03)`) — Hairline structural lines on cards and sections. Barely visible, purely architectural.
- **Hairline Highlight** (`rgba(255,255,255,0.06-0.08)`) — Outer shell borders on cards, nav pill. The physical edge.
- **Primary Text** (`#f4f4f5` / Zinc-100) — Headlines and key information. High contrast against the void.
- **Body Text** (`#d4d4d8` / Zinc-300) — Running text in content sections. Comfortable reading contrast.
- **Secondary Text** (`#71717a` / Zinc-500) — Descriptions, taglines, metadata. Recedes appropriately.
- **Muted** (`#52525b` / Zinc-600) — Footer text, hints, tertiary information.
- **Buried** (`#3f3f46` / Zinc-700) — Copyright, legal, truly secondary metadata.

### Accent: Scholar's Gold
- **Core Gold** (`#d4a853`) — The sole accent color. Used for the Taiji diagram's orbit dots, RPM display, core nodes on the panorama map, domain order badges, section accent dots, and active/focus states. Saturation ≈ 64%, below the 80% ceiling. Evokes aged manuscript gold leaf, not flashy neon.
- **Gold Ambient** (`rgba(212,168,83,0.10-0.35)`) — Glow for RPM text shadow, core node radial gradients on panorama.
- **Gold Subtle** (`rgba(212,168,83,0.04-0.08)`) — Background tint for gold-tagged badges and buttons.

### Domain Accent Colors (One per scientific discipline)
Each of the 6 core domains has a distinct accent for its DomainCard spotlight border, section dots, and detail page theme. All are desaturated below 80%:

| Domain | Color | Hex | Role |
|--------|-------|-----|------|
| Taiji & Math | Gold | `#d4a853` | Primary domain |
| Quantum Entanglement | Electric Blue | `#60a5fa` | Physics domains |
| Symmetry Breaking | Violet | `#a78bfa` | Physics/chemistry |
| Information Theory | Emerald | `#34d399` | Math/CS domains |
| Chaos & Fractal | Rose | `#f472b6` | Complex systems |
| Systems Science | Amber | `#fb923c` | Interdisciplinary |

### Ambient Background Orbs (Mesh Gradient)
Three fixed, blurred orbs (`blur-[120px]`) drift on 30-40s alternating cycles behind all content:
- **Emerald Orb** — `rgba(16,185,129,0.04)` at top-left, `orb-drift-1` (30s)
- **Amber Orb** — `rgba(245,158,11,0.03)` at bottom-right, `orb-drift-2` (40s)
- **Indigo Orb** — `rgba(99,102,241,0.03)` at center, `orb-drift-3` (35s)

These are pointer-events-none, fixed-position, and never attached to scrolling containers.

### Banned Color Patterns
- **NO** pure black (`#000000`) — always use `#09090b` minimum
- **NO** neon/outer glow shadows on buttons or cards
- **NO** purple/blue AI aesthetic — the gold accent is mandatory
- **NO** oversaturated accents (>80% saturation)
- **NO** warm/cool gray mixing — stick to Zinc exclusively
- **NO** gradient text on headers

## 3. Typography Rules

### Font Stack
```
--font-geist-sans: 'Geist', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif
--font-geist-mono: 'Geist Mono', 'SF Mono', 'Cascadia Code', monospace
--font-song: 'Noto Serif SC', serif
```

All three are loaded via `next/font/google` with `display: swap` and injected as CSS custom properties.

### Type Scale & Roles
- **Display / H1:** `text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-none` in `text-zinc-100`. Set in Geist Sans. Hierarchy comes from weight (font-semibold to font-black) and color, not just scale.
- **H2 (Section headers):** `text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400`. Preceded by a 6px accent-colored dot. Restrained — sections announce themselves through structure, not shouting.
- **H3 (Card titles):** `text-lg font-semibold text-zinc-100 tracking-tight leading-tight`. Inside Double-Bezel cards.
- **Body:** `text-sm md:text-base text-zinc-500 leading-relaxed max-w-[65ch]`. Geist Sans. Comfortable reading.
- **Eyebrow badges:** `text-[10px] uppercase tracking-[0.2em] font-medium`. Microscopic pill-shaped labels above major sections.
- **Mono (numbers, metadata, order):** `text-[10px] font-mono font-medium`. Geist Mono for order numbers, reference indices, RPM labels.
- **Song (Gold special):** `font-black text-[#d4a853]` with `text-shadow: 0 0 40px rgba(212,168,83,0.35)`. Noto Serif SC (思源宋体) exclusively for the RPM counter and philosophical narration above the Taiji diagram. Gold Song typeface is the only serif usage in the entire site.

### Typography Anti-Patterns
- **NO** `Inter` font anywhere
- **NO** generic serif fonts (`Times New Roman`, `Georgia`, `Garamond`) — only Noto Serif SC for the gold accent text
- **NO** oversized H1s that scream — hierarchy through weight and color
- **NO** gradient text fills on headers

## 4. Component Stylings

### The Double-Bezel (Doppelrand) — Universal Card Architecture
Every premium card, container, and section follows this nested-shell pattern:

**Outer Shell:** A wrapper `<div>` with:
- `rounded-[2rem]` (or `rounded-2xl` for smaller cards)
- `p-[1px]` or `p-[1.5px]` (the bezel thickness)
- `bg-white/[0.03]` (the bezel material — barely visible)
- On DomainCards: dynamic `radial-gradient` background at mouse position for spotlight effect

**Inner Core:** The content container inside:
- `rounded-[calc(2rem-1px)]` (mathematically concentric)
- `p-6 md:p-8` (generous internal padding)
- `bg-[#0c0c0f]` (slightly lifted from `#09090b` void)
- `border border-white/[0.03]` or `[0.04]` (hairline separation)
- `shadow-[inset_0_1px_0_rgba(255,255,255,0.02-0.03)]` (inner top highlight — the glass edge)

This applies to: DomainCards, panorama map container, detail page content sections, selected node detail panel.

### Buttons & CTAs

**Primary Pills:** `rounded-full px-4 py-2` with `border border-white/[0.06]` on `bg-white/[0.02]`. Hover: `bg-white/[0.04] border-white/[0.12]`. Active: `scale-[0.97]` tactile push. Text in `text-zinc-400` → `text-zinc-200` on hover.

**Button-in-Button Trailing Icon:** When a CTA has an arrow (→ or ↗), the arrow is nested inside its own circular wrapper:
```html
<span class="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center
             group-hover:translate-x-0.5 group-hover:-translate-y-px">
  <svg><!-- arrow --></svg>
</span>
```
The inner circle translates diagonally on hover, creating internal kinetic tension.

**DomainCard Explore CTA:** Hidden by default (`opacity-0 translate-y-2`), revealed on card hover (`group-hover:opacity-100 group-hover:translate-y-0`). Accent-colored with a Button-in-Button mini arrow.

**Active State (all interactive elements):** `active:scale-[0.98]` or `active:scale-[0.97]` for tactile press feedback. Never use `:active` color changes alone — always pair with a transform.

### Navigation Bar
**Floating Glass Pill:**
- `fixed top-4 left-1/2 -translate-x-1/2 z-50` — detached from all edges
- `rounded-full px-2 py-2` — fully rounded pill
- `bg-zinc-950/70 backdrop-blur-2xl` — heavy frosted glass
- `border border-white/[0.08]` — subtle edge definition
- `shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]` — depth + inner glass refraction

**Mobile Hamburger Morph:** Two `<span>` lines that rotate (±45°) and translate to form an X on open. Transition: `duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]`.

**Mobile Overlay Menu:** `fixed inset-0 z-40 bg-black/80 backdrop-blur-3xl`. Links stagger in from below (`translate-y-8 opacity-0` → `translate-y-0 opacity-100`) with `delay-0`, `delay-100`, `delay-200`.

### Cards (DomainCard)
**Spotlight Border variant of Double-Bezel:**
- Outer shell background is dynamic: a `radial-gradient` centered at the mouse cursor position using the domain's accent color at 10-30% opacity
- On mouse leave, falls back to solid `{domainColor}10`
- Inner core has an additional ambient glow `<div>` (`opacity-0 group-hover:opacity-100`) with another radial gradient matching mouse position
- Card scales `hover:scale-[1.01] active:scale-[0.99]`
- Order number in a mini accent-colored pill: `w-6 h-6 rounded-full` with domain accent border and background

### Inputs & Forms
Not applicable — this is a content/reading site without form inputs. The language switcher uses pill-shaped toggle buttons, not a `<select>`.

### Loading States
Not applicable — the site is statically generated (Next.js SSG). No async data fetching on the client.

### Empty States
Not applicable — all content is pre-defined in `src/data/domains.ts`.

### Error States
Next.js `notFound()` triggers the built-in 404 page. Domain slugs are validated at build time via `generateStaticParams`.

### Panorama Map (Canvas Component)
- On-demand redraw only — no continuous `requestAnimationFrame` loop
- Core nodes: 7px radius with radial gold gradient (`#d4a853` → transparent)
- Extended nodes: 4px radius in Zinc-500
- Connection lines: 0.5px stroke in `#3f3f4620`, highlighted to `#d4a85345` on hover
- Selected node detail panel: Double-Bezel popup at bottom of canvas
- Drag threshold: < 8px total movement = click, ≥ 8px = pan
- Zoom: scroll-wheel with 0.4×–4× range, zooms toward cursor position

## 5. Layout Principles

### Hero Section
**Asymmetric Split Screen** (per ANTI-CENTER BIAS, Variance 8):
- `grid grid-cols-1 md:grid-cols-[1fr_1.2fr]` — left 45% text, right 55% Taiji diagram
- On mobile: single column, Taiji stacks above text (`order-1` / `order-2`)
- Left text block: eyebrow badge → H1 → subtitle → quick-nav pills (all left-aligned)
- No centered content in the hero whatsoever

### Card Gallery
**Asymmetric Grid** (per "NO 3-Column Equal Cards" ban):
- `grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr]` — first card is 2× the width of others
- Each card uses the DomainCard spotlight Double-Bezel
- Staggered entrance animation via `animate-fade-up-stagger` class
- Section divider: horizontal hairline (`h-px bg-white/[0.04]`) with centered eyebrow text

### Content Sections (Detail Pages)
**Vertical Stack of Double-Bezel containers:**
- Each major section (Overview, Taiji Connections, Key Examples, Comparison, References) is wrapped in its own Double-Bezel
- Section headers use the accent dot + uppercase label pattern
- Taiji Connections: vertical list of mini Double-Bezel cards, each with monospace index
- Key Examples: 2-column grid on desktop
- Taiji Comparison: 2-column grid with mini SVG icons for Taiji/Science columns
- References: numbered ordered list with monospace indices and type badges

### Footer
**3-Column Asymmetric Grid:**
- `grid grid-cols-1 md:grid-cols-[1fr_auto_auto]` — brand (wide) + navigation (narrow) + quote (narrow)
- Mini Taiji SVG brand mark
- `border-t border-white/[0.04]` top divider
- `py-16 md:py-20` generous vertical breathing room

### Spacing Philosophy
- **Section gaps:** `py-16 md:py-24` minimum, `py-24 md:py-40` for major sections
- **Content max-width:** `max-w-7xl` (80rem / 1280px) for pages, `max-w-5xl` for detail articles
- **Internal card padding:** `p-6 md:p-8` for large Double-Bezel containers, `p-5` for smaller ones
- **Text measure:** `max-w-[60ch]` on paragraphs, `max-w-[65ch]` on body text
- **Element gaps:** `gap-4` to `gap-6` within grids, `space-y-10` between major sections

### Responsive Strategy
- **Breakpoint:** `md:` (768px) is the single collapse point
- **Mobile:** All multi-column grids collapse to single column (`grid-cols-1`)
- **Hero image/text stacking:** On mobile, Taiji visual stacks above text
- **Typography:** Headlines scale from `text-3xl` (mobile) → `md:text-5xl` → `lg:text-6xl`
- **Navigation:** Desktop floating pill → mobile hamburger + fullscreen overlay
- **Card grid:** Asymmetric `[2fr_1fr_1fr]` → single column on mobile
- **Footer:** 3-column → single column on mobile
- **Panorama:** Full-width canvas, detail panel constrained to `min(90vw, 360px)`
- **No horizontal scroll on any viewport** — this is a hard constraint

## 6. Motion & Interaction

### Transition Engine
**Universal custom cubic-bezier:** `cubic-bezier(0.32, 0.72, 0, 1)` — a weighted deceleration curve that starts fast and settles gently. Applied to all `transition` properties site-wide.

**Duration scale:**
- Micro-interactions (hover color, icon translate): `duration-300`
- Card hover effects (spotlight, CTA reveal): `duration-500`
- Page transitions, scroll reveals: `duration-700` to `duration-800`
- Nav overlay stagger: `duration-500` with `delay-100/200/300`

### Taiji Diagram Animation (GSAP)
The centerpiece animation uses GSAP (dynamically imported, zero bundle cost until mounted):
- **Animation:** `rotation: 10_800_000` degrees over `duration: 360` seconds
- **Easing:** `power1.in` — quadratic acceleration (θ ∝ t², linear RPM increase)
- **Repeat:** `-1` (infinite) with `onRepeat` callback resetting RPM to 0
- **RPM tracking:** Computed from elapsed time in `onUpdate`, displayed above the Taiji in gold Song typeface
- **Philosophical narration:** 7-threshold text beneath RPM that changes as speed increases:
  - < 500 RPM: "静极生动，阴阳初分" / "Stillness breaks — yin and yang emerge"
  - < 1500 RPM: "阴消阳长，太极始转" / "Yang rises, yin recedes — the Taiji turns"
  - < 3000 RPM: "阴阳相推，万物生化" / "Yin and yang entwine — all things arise"
  - < 5000 RPM: "刚柔相摩，八卦相荡" / "Hard and soft grind — the eight trigrams stir"
  - < 7000 RPM: "动极而静，静极复动" / "Motion peaks — stillness already begins"
  - < 9000 RPM: "无往不复，天地际也" / "No departure without return — the cosmic pulse"
  - ≥ 9000 RPM: "阴阳合一，道法自然" / "Yin and yang unite — the Dao unfolds"
- **Orbit icons:** 6 domain icons positioned at 60° intervals at 42% radius, each with Double-Bezel styling and hover tooltip

### Scroll Entrance Animations
**CSS-only staggered cascade** (no JavaScript scroll listeners):
- `animate-fade-up-stagger` — applied to static card grids on the home page. Children fade up sequentially with 100ms delays.
- `animate-fade-up-stagger-reveal` — applied by the `ScrollReveal` component using `IntersectionObserver`. Children animate when the container enters the viewport. Delay calculated as `calc(var(--stagger-delay) * N)`.
- Individual `animate-fade-up` class available for single elements.

**Keyframe:** `fade-up-in` — from `opacity: 0; transform: translateY(24px)` to `opacity: 1; transform: translateY(0)`, duration 800ms, custom cubic-bezier.

### Background Ambient Motion
**Mesh Gradient Orbs** (CSS only):
- Three `blur-[120px]` radial gradient circles at fixed positions
- Each has its own `orb-drift-N` keyframe with 30-40s alternating cycles
- Subtle scale (1.0→1.08-1.15) and translate (4-8%) transforms
- `pointer-events-none` to never interfere with interaction

### Hover Physics
- **DomainCard spotlight:** `radial-gradient` follows mouse cursor via `onMouseMove` → `getBoundingClientRect` → percentage calculation
- **Button-in-Button icon:** Diagonal translate (`translate-x-0.5 -translate-y-px`) + slight scale on hover
- **Navigation links:** Color transition only, no transform
- **Panorama nodes:** Hover detection via canvas coordinate math, highlight ring + connection highlighting

### Performance Guardrails
- **GPU-safe only:** All animations use exclusively `transform` and `opacity`. No `top`, `left`, `width`, or `height` animation.
- **Backdrop-blur discipline:** Only applied to fixed nav (`backdrop-blur-2xl`) and overlay menu (`backdrop-blur-3xl`). Never on scrolling content.
- **Canvas efficiency:** Panorama map redraws only on state changes via `needsRedraw` ref flag. No continuous `requestAnimationFrame` loop.
- **GSAP isolation:** Dynamically imported in `useEffect`, cleanup via `ctx.revert()`. Zero bundle cost on server.
- **Particle/Mesh orbs:** Fixed-position, `pointer-events-none`, `will-change: transform` on actively animating orbs only.
- **No `window.addEventListener('scroll')`** — all scroll-driven behavior uses `IntersectionObserver`.

## 7. Anti-Patterns (Banned)

### Visual & CSS
- **NO** emojis anywhere in code, markup, or text content — replaced with inline SVG icons
- **NO** pure black (`#000000`) — minimum `#09090b`
- **NO** neon/outer glow shadows — use inner borders and tinted shadows only
- **NO** AI purple/blue aesthetic — the accent is Scholar's Gold (`#d4a853`)
- **NO** oversaturated accents (>80% saturation)
- **NO** gradient text fills on headers
- **NO** custom mouse cursors
- **NO** `backdrop-blur` on scrolling containers
- **NO** noise/grain overlays on non-fixed elements

### Typography
- **NO** `Inter` font
- **NO** generic serif fonts (`Times New Roman`, `Georgia`, `Garamond`, `Palatino`)
- **NO** oversized screaming H1s
- **NO** filler UI text: "Scroll to explore", "Swipe down", scroll arrows, bouncing chevrons

### Layout & Spacing
- **NO** centered Hero sections (Variance 8 → Anti-Center Bias enforced)
- **NO** 3-column equal-width card grids — use asymmetric `[2fr_1fr_1fr]` instead
- **NO** flexbox percentage math (`w-[calc(33%-1rem)]`) — always use CSS Grid
- **NO** `h-screen` for full-height sections — always use `min-h-[100dvh]`
- **NO** overlapping elements — every element occupies its own clean spatial zone
- **NO** horizontal scroll on any viewport

### Content & Data
- **NO** AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen"
- **NO** generic placeholder names
- **NO** fake round numbers
- **NO** broken Unsplash links

### Motion
- **NO** `linear` or default `ease-in-out` transitions
- **NO** `window.addEventListener('scroll')` — use IntersectionObserver
- **NO** animating `top`, `left`, `width`, `height` — only `transform` and `opacity`
- **NO** continuous animation loops outside the Taiji rotation

## 8. Tech Stack Reference

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` syntax) |
| Fonts | `next/font/google`: Geist, Geist Mono, Noto Serif SC |
| i18n | `next-intl` v4, `localePrefix: 'always'`, locales: `zh`/`en` |
| Animation | GSAP (dynamic import for Taiji), CSS `@keyframes` for everything else |
| Deployment | Vercel (static export, 14 pages pre-rendered) |
| Testing | Vitest (unit), Playwright (E2E) |

## 9. Key Spatial Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Page max-width | `1280px` (`max-w-7xl`) | Home, panorama |
| Article max-width | `1024px` (`max-w-5xl`) | Domain detail pages |
| Card outer radius | `2rem` (`rounded-[2rem]`) | Large Double-Bezel containers |
| Card inner radius | `calc(2rem - 1px)` | Mathematically concentric inner core |
| Small card radius | `1.5rem` (`rounded-2xl`) | Mini Double-Bezel cards |
| Nav pill radius | `9999px` (`rounded-full`) | Navigation, CTA pills, badges |
| Bezel thickness | `1px` or `1.5px` | Outer shell padding |
| Section gap | `py-16 md:py-24` minimum | Between major sections |
| Card padding | `p-6 md:p-8` | Inner core of large containers |
| Mini card padding | `p-5` | Inner core of small containers |
| Body max-width | `65ch` | Paragraph measure |
| Accent dot size | `6px` (`w-1.5 h-1.5`) | Section header indicator |
| Mini icon size | `20-24px` (`w-5 h-5` to `w-6 h-6`) | Inline SVG icons |
| Border hairline | `1px solid rgba(255,255,255,0.03-0.08)` | All structural borders |
