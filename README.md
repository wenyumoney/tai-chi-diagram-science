# 太极图 × 现代科学 / Taiji Diagram × Modern Science

A bilingual (Chinese/English) popular science website exploring how the Taiji diagram's core principles (Yin-Yang complementarity, dynamic balance, mutual containment) manifest in modern science.

## Features

- **Animated Taiji Diagram** — GSAP-powered rotating Yin-Yang with 6 orbiting domain icons
- **Canvas Particle Background** — 120 particles with mouse attraction, cosmic aesthetic
- **6 Core Scientific Domains** — Math, Quantum Entanglement, Symmetry Breaking, Information Theory, Chaos & Fractals, Systems Science
- **Interactive Visualizations** — Canvas/GSAP animations for each domain
- **Panorama Map** — 21-node constellation map with force-directed layout, touch/drag/zoom
- **Bilingual (zh/en)** — Full content in Chinese and English
- **SSG** — All pages statically generated for performance

## Tech Stack

- Next.js 16 (App Router) + TypeScript
- next-intl v4 (i18n)
- GSAP + ScrollTrigger (animations)
- Canvas API (particle system, visualizations, panorama)
- Tailwind CSS v4
- Vitest (unit/component tests)

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Deployment

Deployed on Vercel. Push to main triggers automatic deployment.

## License

MIT
