title: "I Built an Interactive 3D Universe Map Connecting the Yin-Yang Diagram to 11 Scientific Fields"
published: true
tags: threejs, nextjs, dataviz, science, webgl
canonical_url: "https://tai-chi-diagram-science.vercel.app"
---

I built an unusual educational website: a bilingual (EN/ZH) platform that maps the ancient Taiji (Yin-Yang) diagram onto 11 modern scientific domains — quantum physics, information theory, chaos theory, systems science, and more.

**The core idea**: the Yin-Yang diagram isn't mysticism — it's a remarkably prescient model of polarity, mutual dependence, and emergence. These same patterns appear across modern science in surprising ways.

![3D Universe Map](https://tai-chi-diagram-science.vercel.app)

## What you can do on the site

- 🗺️ **3D Universe Map** — 21 nodes across 11 disciplines, connected by conceptual bridges. Drag to rotate, scroll to zoom, click golden nodes to enter deep-dive pages.
- 🎥 **Guided Tour** — GSAP-powered camera fly-through covering 6 core nodes in narrative order.
- 📖 **11 Domain deep-dives** — Each has its own page with custom Canvas/SVG/Three.js visualizations exploring the Taiji connection.
- 📝 **Knowledge Quiz** — Per-domain quiz after each article + a cumulative 11-domain comprehensive quiz with score tracking.
- 📍 **Reading Progress** — localStorage-based tracking across visits. Resume where you left off.
- 🌐 **Fully Bilingual** — Defaults to English for international visitors.

## Tech stack

```
Next.js 16 (App Router)    •  React 19
TypeScript                 •  Tailwind CSS v4
Three.js / R3F / Drei      •  GSAP 3
next-intl v4 (i18n)        •  Vitest
```

## Some connections I found

- **Math**: Leibniz discovered binary arithmetic (0-63) through the 64 hexagrams in 1701 — the Bagua diagram is a 3-bit binary table
- **Quantum Entanglement**: Paired particles that mirror each other's states regardless of distance — pure *yin within yang, yang within yin*
- **Symmetry Breaking**: The universe's forces emerging from an undifferentiated state mirrors the Taiji concept of Yin-Yang differentiating from Wuji (the formless)
- **Information Theory**: Shannon entropy formalizes order emerging from chaos — literally *pure yang emerging from yin*
- **Chaos & Fractals**: Hidden order in apparent randomness, infinite self-similarity — the Taiji within the Taiji

## Why this was interesting to build

Making the 3D graph both beautiful and meaningful took many iterations of the force layout. Keeping the UI elegant in both Chinese and English (very different text lengths) forced a flexible card-based design. SSR/CSR consistency for the random quiz required implementing a seeded PRNG.

🔗 **Live site**: [tai-chi-diagram-science.vercel.app](https://tai-chi-diagram-science.vercel.app)
📂 **Source**: [github.com/wenyumoney/tai-chi-diagram-science](https://github.com/wenyumoney/tai-chi-diagram-science)

Would love feedback on the 3D map UX and the bilingual design patterns!
