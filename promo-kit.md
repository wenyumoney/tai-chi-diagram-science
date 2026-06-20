# Promo Kit — Taiji Diagram × Modern Science

> URL: **https://tai-chi-diagram-science.vercel.app**

---

## 各平台发布方案

### ✅ dev.to (可访问 — 推荐首选)

**标签**：`#threejs` `#nextjs` `#dataviz` `#science` `#webgl` `#tutorial`

**标题**（英文）：
> I Built an Interactive 3D Universe Map Connecting the Yin-Yang Diagram to 11 Scientific Fields

**正文**：

---

I've been working on an unusual educational website: a bilingual (EN/ZH) platform that maps the ancient Taiji (Yin-Yang) diagram onto 11 modern scientific domains — quantum physics, information theory, chaos theory, systems science, and more.

**The core idea**: the Yin-Yang diagram isn't mysticism — it's a remarkably prescient model of polarity, mutual dependence, and emergence. These same patterns appear across modern science in surprising ways.

**Tech stack**:
- **Next.js 16** (App Router, Turbopack) with next-intl for bilingual routing
- **Three.js** via @react-three/fiber + drei + postprocessing (Bloom)
- **GSAP** for camera animations and scroll reveals
- **Tailwind CSS v4** with a custom dark theme
- Seeded PRNG (mulberry32) for deterministic SSR/CSR random generation

**What you can do on the site**:
- 🗺️ **3D Universe Map** — 21 nodes across 11 disciplines, connected by conceptual bridges. Drag to rotate, scroll to zoom, click golden nodes to enter deep-dive pages.
- 🎥 **Guided Tour** — GSAP-powered camera fly-through covering 6 core nodes.
- 📖 **Domain deep-dives** — Each of the 11 fields has its own page with custom Canvas/SVG visualizations (quantum entanglement, symmetry breaking, chaos fractals, etc.)
- 📝 **Cumulative quiz** — 11 questions, one from each domain, with seeded randomization.
- 📍 **Reading progress** — localStorage-based tracking across visits.

**Why this was hard**:
- Making the 3D graph both beautiful AND meaningful took many iterations of the force layout algorithm.
- Keeping the UI elegant in both Chinese and English (very different text lengths) forced a flexible card-based design.
- SSR/CSR consistency for random quiz questions required implementing a seeded PRNG.

Link: [https://tai-chi-diagram-science.vercel.app](https://tai-chi-diagram-science.vercel.app)
Source: [github.com/wenyumoney/tai-chi-diagram-science](https://github.com/wenyumoney/tai-chi-diagram-science)

Would love feedback on the 3D map UX and the bilingual design patterns!

---

### ✅ GitHub (可访问)

**Actions**:
1. **美化 README** — 当前 README 太简单，添加截图 GIF + 技术栈说明
2. **开启 Discussions** — Settings → General → Features → Discussions ✓
3. **在 README 加徽章**: Vercel deploy status, license

### ✅ Lobste.rs (可访问，但需邀请)

Lobste.rs 是邀请制的，适合纯技术分享。如果你能搞到邀请码，用这个简化版：

**标题**: `Taiji Diagram × Modern Science: A 3D interactive map built with Next.js + Three.js`

**标签**: `visualization`, `web`

**正文** (短, 技术向):
> Built an interactive 3D universe map that connects ancient Taiji (Yin-Yang) philosophy to 11 modern scientific domains. 21 nodes in a force-directed 3D graph, each opening deep-dive pages with custom Canvas/SVG visualizations. Stack: Next.js 16 + R3F + GSAP + Tailwind v4. Bilingual (EN/ZH) with next-intl. Source on GitHub.

---

### 🔒 Reddit (需 VPN) — 备选

#### r/taoism (~250k members)
**标题**: *Exploring the Tao in Modern Science — A 3D interactive map connecting Yin-Yang to quantum physics, information theory, and chaos*

**正文**:
> I built a website that explores how the Yin-Yang principle appears across modern science — not as metaphor, but as a structural pattern. For example: quantum entanglement mirrors yin-within-yang mutual dependence; symmetry breaking in physics mirrors the emergence of duality from Wuji (无���); Shannon entropy mirrors the process of extracting order from chaos.
>
> The site includes a 3D interactive map connecting 11 scientific domains, each with custom visualizations and explanations. It's fully bilingual (EN/ZH, defaults to English for international visitors).
>
> I'd love to hear your thoughts: is framing the Taiji diagram as a "unified visual language for complex systems" valid, or is it stretching too far?
>
> Link: https://tai-chi-diagram-science.vercel.app

#### r/dataisbeautiful (~21M members)
**标题**: *[OC] I built a 3D interactive universe map connecting the Yin-Yang diagram to 11 scientific fields*

**正文**: 放一张 3D 全景图的截图，简短说明用 Three.js + R3F 做的交互式 3D 数据可视化。

#### r/webdev (~2.3M members)
**标题**: *Showoff Saturday: A bilingual science education site with 3D panorama, GSAP animations, and 11 custom domain visualizations*

**正文**: 偏技术栈展示，讲 Next.js 16 + R3F + GSAP + Tailwind v4 + next-intl 的集成经验。

---

### 🔒 Hacker News (需 VPN) — 备选

**Show HN 标题**: *Show HN: Taiji Diagram × Modern Science — interactive 3D map connecting ancient wisdom to quantum physics*

**正文**:
> I spent months building an educational website that maps the ancient Chinese Taiji (Yin-Yang) diagram onto 11 modern scientific domains. What started as "is this just a pretty metaphor?" turned into a surprisingly deep exploration.
>
> A few things I didn't expect to find:
> - Leibniz discovered binary arithmetic through the Bagua diagram in 1701 (64 hexagrams = 0-63 in binary)
> - The Yin-Yang concept of "mutual dependence of opposites" is essentially a primitive model of feedback loops, which show up everywhere from climate systems to neural networks
> - Quantum superposition is the closest physics analogue to "Wuji" (the undifferentiated state before Yin-Yang splits)
> - Shannon information entropy — eliminating noise to reveal signal — is a formalization of "pure yang emerging from yin"
>
> Tech: Next.js 16, Three.js (R3F), GSAP, seeded PRNG for SSR/CSR determinism.
>
> Would love your thoughts — especially from physicists, mathematicians, and philosophers.

---

## 中文平台同步推广

### 知乎
**专栏**：科学传播 / 前端开发
**标题**: *我用 Three.js 做了一个太极图科学宇宙地图 — 当阴阳遇上量子物理*
**正文**: 介绍网站 + 配技术实现截图，重点讲 3D 全景地图和 GSAP 动画设计。

### B站
**形式**: 录屏 + 解说视频（3-5 分钟）
**内容**: 从太极图入门页 → 3D 全景导览 → 某个领域详情页 → 综合测验，英文中文各录一版。

### V2EX / 掘金
**标题**: *[分享] 用 Next.js 16 + Three.js 搭建的双语太极科学科普站*
**正文**: 偏技术实现分享，讲 SSR/CSR 一致性、3D 布局算法、种子 PRNG 等。

---

## 发布建议

| | 不要 |
|------|------|
| 一个平台一个帖，不要一稿多投 | 不要 spam 多个 subreddit 同时发 |
| 根据每个社区文化调整标题和语气 | 不要用中文标题发英文社区 |
| 发帖后主动回复评论 | 不要只发不回 |
| 附上源码链接 (GitHub) | 不要只放网站链接（像广告） |
| 周末上午发（欧美流量高峰） | 不要工作日深夜发 |

## 优先级建议

1. **dev.to** — 可达，受众精准，立即发
2. **GitHub** — 美化 README + 开启 Discussions
3. **知乎/V2EX** — 中文圈曝光
4. **Reddit/HN** — 通过手机 VPN 或让海外朋友代发
