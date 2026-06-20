# 太极图 × 现代科学 / Taiji Diagram × Modern Science

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-white?logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock)](https://gsap.com/)

> **Live**: [tai-chi-diagram-science.vercel.app](https://tai-chi-diagram-science.vercel.app)

A bilingual (EN/ZH) interactive educational website that maps the ancient **Taiji (Yin-Yang) diagram** onto **11 modern scientific domains** — revealing how the ancient pattern of polarity, mutual dependence, and emergence recurs across quantum physics, information theory, chaos, systems science, and more.

---

## ✨ What's on the site

| Feature | Description |
|---------|-------------|
| 🗺️ **3D Universe Map** | 21 nodes across 11 disciplines in a force-directed Three.js graph. Drag/zoom/pan. Golden nodes open deep-dive pages. |
| 🎥 **Guided Tour** | GSAP-powered camera fly-through of 6 core nodes in narrative order. |
| 📖 **11 Domain Pages** | Each domain has custom Canvas/SVG/Three.js visualizations, bilingual explanations, and comparison views. |
| 📝 **Knowledge Quiz** | Per-domain quiz after each article + cumulative 11-domain assessment with score tracking. |
| 📍 **Reading Progress** | localStorage-based tracking — visited domains get amber dot indicators and a "Continue Reading" prompt. |
| 🎨 **Animated Taiji** | GSAP rotating Yin-Yang hero with orbiting domain icons and 120-particle cosmic background. |
| 🌐 **Fully Bilingual** | Defaults to English for international visitors. `next-intl` v4 with `/[locale]` routing. |

### The 11 Scientific Domains

| # | Domain | Taiji Connection |
|---|--------|------------------|
| 01 | **Mathematics & Bagua** | Leibniz discovered binary arithmetic (0-63) in the 64 hexagrams, 1701 |
| 02 | **Quantum Entanglement** | Paired particles mirror the Yin-Yang mutual dependence pattern |
| 03 | **Symmetry Breaking** | Universe's forces emerging from undifferentiated state ≈ Yin-Yang from Wuji |
| 04 | **Information Theory** | Shannon entropy formalizing order-from-chaos — pure Yang emerging from Yin |
| 05 | **Chaos & Fractals** | Hidden order in apparent randomness, infinite self-similarity |
| 06 | **Systems Science** | Micro-level Yin-Yang rules self-organizing into macroscopic complexity |
| 07 | **Cosmology** | Dark energy (Yin) / matter (Yang) — the universe's balancing act |
| 08 | **Biology** | Homeostasis, feedback loops, predator-prey — balance as life's governing principle |
| 09 | **Artificial Intelligence** | Generative-adversarial networks — two opposing networks creating through competition |
| 10 | **Computer Science** | Binary logic, dualities, and the hardware-software boundary |
| 11 | **Psychology** | Conscious/subconscious, approach/avoidance — the mind's polar architecture |

---

## 🏗️ Tech Stack

```
Next.js 16 (App Router + Turbopack)  •  React 19
TypeScript                           •  Tailwind CSS v4
next-intl v4 (i18n)                  •  GSAP 3 + ScrollTrigger
@react-three/fiber + drei            •  @react-three/postprocessing
vitest                               •  Canvas API
mulberry32 PRNG (SSR/CSR deterministic randomness)
```

## 📁 Architecture

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, html)
│   ├── [locale]/
│   │   ├── layout.tsx          # NextIntlClientProvider wrapper
│   │   ├── page.tsx            # Homepage (hero + intro + card gallery + quiz)
│   │   ├── domain/[slug]/      # Domain detail pages (SSG)
│   │   ├── panorama/           # 3D universe map page
│   │   └── quiz/               # Cumulative 11-domain quiz page
│   └── api/feedback/           # Feedback submission endpoint
├── components/
│   ├── panorama/               # 3D scene (R3F Canvas, nodes, connections, starfield)
│   ├── domain-visualizations/  # 23 custom Canvas/SVG/Three.js viz components
│   ├── NavBar.tsx              # Bilingual navigation
│   ├── Footer.tsx              # Fully i18n'd footer
│   ├── TaijiIntro.tsx          # "What is the Taiji Diagram?" 3-column intro
│   ├── DomainCard.tsx          # Double-bezel card with visit tracking
│   ├── QuizSection.tsx         # Per-domain quiz
│   └── CumulativeQuiz.tsx      # All-domains comprehensive quiz
├── messages/{en,zh}.json       # ~90 i18n keys across 7 namespaces
├── data/
│   ├── domains.ts              # 11 domain definitions (bilingual content)
│   ├── panorama-domains.ts     # 21 panorama node definitions
│   └── quiz-questions.ts       # Quiz question bank per domain
└── lib/
    ├── panorama-layout-3d.ts   # Seeded 3D force layout algorithm
    ├── progress-store.ts       # localStorage reading progress
    └── tour-steps.ts           # Panorama guided tour waypoints
```

---

## 🚀 Development

```bash
# Install
npm install

# Dev server (Turbopack)
npm run dev          # → http://localhost:3000 (auto-redirects to /en)

# Tests
npm test             # Vitest unit + component tests

# Build
npm run build        # Next.js SSG output
```

## 🌍 Deployment

Deployed on [Vercel](https://vercel.com). Push to `master` triggers automatic deployment.

**URL**: [tai-chi-diagram-science.vercel.app](https://tai-chi-diagram-science.vercel.app)

---

## 🤝 Contributing

This is an educational project exploring the intersection of ancient philosophy and modern science. Contributions are welcome:

- **Content**: Better examples of Yin-Yang principles in science
- **Visualizations**: New domain visualizations (Canvas/SVG/Three.js)
- **Translations**: Better English text for the domain pages
- **Bug fixes**: Especially around SSR/CSR consistency and mobile

Open an issue or PR on GitHub.

## 📄 License

MIT — see [LICENSE](LICENSE)
