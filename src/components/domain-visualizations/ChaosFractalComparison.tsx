"use client";

import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

const ACCENT = "#f472b6";

function SierpinskiViz() {
  return (
    <svg width="180" height="160" viewBox="0 0 180 160" className="mx-auto">
      {/* Big triangle */}
      <polygon points="90,10 10,150 170,150" fill="none" stroke={ACCENT} strokeWidth="0.8" opacity="0.4" />
      {/* Mid sub-triangles */}
      <polygon points="90,10 50,80 130,80" fill="none" stroke={ACCENT} strokeWidth="0.7" opacity="0.5" />
      <polygon points="50,80 10,150 90,150" fill="none" stroke={ACCENT} strokeWidth="0.7" opacity="0.5" />
      <polygon points="130,80 90,150 170,150" fill="none" stroke={ACCENT} strokeWidth="0.7" opacity="0.5" />
      {/* Inner sub-triangles */}
      <polygon points="90,28 70,63 110,63" fill="none" stroke={ACCENT} strokeWidth="0.6" opacity="0.6" />
      <polygon points="70,63 50,98 90,98" fill="none" stroke={ACCENT} strokeWidth="0.6" opacity="0.6" />
      <polygon points="110,63 90,98 130,98" fill="none" stroke={ACCENT} strokeWidth="0.6" opacity="0.6" />
      {/* Center hole = yin dot */}
      <circle cx="90" cy="80" r="12" fill={ACCENT} opacity="0.12" />
      <text x="90" y="84" textAnchor="middle" fontSize="7" fill={ACCENT} opacity="0.5">自相似空穴</text>
    </svg>
  );
}

function AttractorViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let phase = 0, id: number;
    function draw() {
      const w = c!.width, h = c!.height;
      ctx!.clearRect(0, 0, w, h);
      let x = 0.1, y = 0.1;
      ctx!.beginPath();
      for (let i = 0; i < 300; i++) {
        const nx = Math.sin(y * 2.5 + phase * 0.3) + Math.cos(x * 1.5 + phase * 0.2) * 0.5;
        const ny = Math.sin(x * 2 + phase * 0.3) + Math.cos(y * 1.8 + phase * 0.2) * 0.5;
        x = nx; y = ny;
        const sx = w * 0.15 + (x + 1) * w * 0.35;
        const sy = h * 0.15 + (y + 1) * h * 0.35;
        if (i === 0) ctx!.moveTo(sx, sy); else ctx!.lineTo(sx, sy);
      }
      ctx!.strokeStyle = `${ACCENT}30`; ctx!.lineWidth = 0.8; ctx!.stroke();
      phase += 0.012; id = requestAnimationFrame(draw);
    }
    function resize() { const r = c!.parentElement!.getBoundingClientRect(); c!.width = r.width; c!.height = 180; }
    resize(); const ro = new ResizeObserver(resize); ro.observe(c!.parentElement!);
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="w-full" style={{ height: 180 }} />;
}

export default function ChaosFractalComparison({ locale }: DomainVizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    if (typeof window === "undefined") return;
    import("gsap").then(({ default: gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".comp-card", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" });
      }, containerRef.current!);
      return () => ctx.revert();
    });
  }, []);

  const items = [
    {
      title: isZh ? "分形自相似 ↔ 太极眼点" : "Fractal Self-Similarity ↔ Taiji Eye-Dots",
      viz: <SierpinskiViz />,
      note: isZh ? "Sierpinski 三角每一层都包含与整体完全相同的子结构——正如太极图中的阴阳眼点：阴中含阳（小太极）、阳中含阴（小太极），部分包含整体的全部信息。" : "Each layer of the Sierpinski triangle contains substructures identical to the whole — just as the Taiji eye dots show yin containing yang and vice versa: the part contains the whole.",
    },
    {
      title: isZh ? "奇异吸引子 ↔ 混沌中有序" : "Strange Attractor ↔ Order in Chaos",
      viz: <AttractorViz />,
      note: isZh ? "Lorenz 吸引子轨迹看似随机，却勾勒出精致的蝶形结构——混沌行为背后隐藏着深层秩序。太极哲学说'乱中有序、序中有乱'，正是这个意思。" : "The Lorenz attractor trace appears random yet forms an elegant butterfly structure — deep order hides behind chaotic behavior. Taiji philosophy: order within chaos, chaos within order.",
    },
    {
      title: isZh ? "分形边界 ↔ S曲线的无限深度" : "Fractal Boundary ↔ Infinite Depth of S-Curve",
      viz: (
        <div className="flex items-center justify-center gap-2 py-4 flex-wrap">
          {[0.6, 0.7, 0.8, 0.9, 1].map((scale, i) => (
            <div key={i} className="flex items-center gap-1">
              <svg width="40" height="40" viewBox="0 0 40 40" style={{ transform: `scale(${scale})` }}>
                <circle cx="20" cy="20" r="18" fill="none" stroke={ACCENT} strokeWidth="0.5" opacity={0.2 + i * 0.15} />
                <path d="M20,2 A18,18 0 0,0 20,38 A9,9 0 0,1 20,20 A9,9 0 0,0 20,2" fill="#18181b" />
                <path d="M20,2 A18,18 0 0,1 20,38 A9,9 0 0,0 20,20 A9,9 0 0,1 20,2" fill={`${ACCENT}08`} />
              </svg>
              {i < 4 && <span className="text-zinc-600 text-xs">→</span>}
            </div>
          ))}
        </div>
      ),
      note: isZh ? "太极图的S曲线如果无限放大，可能呈现分形边界般的无限复杂性——阴阳在任何尺度上都互相渗透，不是一刀切开的。" : "If infinitely magnified, the S-curve may present fractal-boundary complexity — yin and yang interpenetrate at every scale, never cleanly split.",
    },
  ];

  return (
    <div ref={containerRef}>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">{isZh ? "可视化对照" : "Visual Comparison"}</h2>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="comp-card rounded-2xl p-[1px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500">
            <div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.03]">
              <h4 className="text-xs font-semibold text-zinc-300 mb-3 text-center">{item.title}</h4>
              {item.viz}
              <p className="text-center text-[11px] text-zinc-600 mt-3 leading-relaxed">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
