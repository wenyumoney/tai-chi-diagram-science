"use client";

import { useEffect, useRef, useState } from "react";
import type { DomainVizProps } from "./registry";

const ACCENT = "#34d399";

function BitYinYangViz({ isZh }: { isZh: boolean }) {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100" className="mx-auto">
      {/* Left: Yin-yang lines */}
      <g transform="translate(30,20)">
        <rect x="0" y="0" width="50" height="10" rx="2" fill={ACCENT} opacity="0.7" />
        <text x="25" y="28" textAnchor="middle" fontSize="9" fill={ACCENT}>{isZh ? "阳 (—)" : "Yang (—)"}</text>
        <text x="60" y="8" fontSize="16" fill={ACCENT} opacity="0.6" fontWeight="bold">→</text>
        <text x="85" y="8" fontSize="16" fill="#a1a1aa" fontWeight="bold">1</text>
      </g>
      <g transform="translate(30,55)">
        <rect x="0" y="0" width="22" height="10" rx="2" fill="#52525b" />
        <rect x="28" y="0" width="22" height="10" rx="2" fill="#52525b" />
        <text x="25" y="28" textAnchor="middle" fontSize="9" fill="#71717a">{isZh ? "阴 (--)" : "Yin (--)"}</text>
        <text x="60" y="8" fontSize="16" fill="#52525b" opacity="0.5">→</text>
        <text x="85" y="8" fontSize="16" fill="#52525b" fontWeight="bold">0</text>
      </g>
    </svg>
  );
}

function BitGridViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let phase = 0; let id: number;
    const cols = 10, rows = 7;
    function draw() {
      const w = c!.width, h = c!.height; const cw = w / cols, ch = h / rows;
      ctx!.clearRect(0, 0, w, h);
      for (let r = 0; r < rows; r++) {
        for (let cl = 0; cl < cols; cl++) {
          const target = ((r + cl) % 2 === 0 || (r > 1 && r < 5 && cl > 2 && cl < 7)) ? 1 : 0;
          const bits = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1];
          const actual = phase > 0.5 ? target : bits[(r * 3 + cl) % bits.length];
          ctx!.fillStyle = actual ? ACCENT : "#27272a";
          ctx!.fillRect(cl * cw + 1, r * ch + 1, cw - 2, ch - 2);
        }
      }
      phase += 0.008; if (phase > 2) phase = 0;
      id = requestAnimationFrame(draw);
    }
    function resize() { const r = c!.parentElement!.getBoundingClientRect(); c!.width = r.width; c!.height = 160; }
    resize(); const ro = new ResizeObserver(resize); ro.observe(c!.parentElement!);
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="w-full" style={{ height: 160 }} />;
}

function DaoSourceViz({ isZh }: { isZh: boolean }) {
  return (
    <svg width="180" height="120" viewBox="0 0 180 120" className="mx-auto">
      {/* Undivided circle (Dao) */}
      <circle cx="50" cy="60" r="28" fill="none" stroke="#52525b" strokeWidth="0.5" />
      <circle cx="50" cy="60" r="28" fill="rgba(52,211,153,0.04)" />
      <text x="50" y="64" textAnchor="middle" fontSize="10" fill="#71717a">{isZh ? "道" : "Dao"}</text>
      {/* Arrow to split */}
      <line x1="80" y1="60" x2="110" y2="60" stroke={ACCENT} strokeWidth="1" opacity="0.5" />
      <polygon points="105,55 115,60 105,65" fill={ACCENT} opacity="0.5" />
      {/* Split: yin-yang */}
      <circle cx="145" cy="50" r="12" fill="none" stroke={ACCENT} strokeWidth="0.8" opacity="0.5" />
      <text x="145" y="47" textAnchor="middle" fontSize="10" fill={ACCENT}>1</text>
      <circle cx="145" cy="80" r="12" fill="none" stroke="#52525b" strokeWidth="0.8" opacity="0.5" />
      <text x="145" y="77" textAnchor="middle" fontSize="10" fill="#71717a">0</text>
      {/* Label */}
      <text x="85" y="105" textAnchor="middle" fontSize="8" fill="#52525b">{isZh ? "一生二" : "One → Two"}</text>
    </svg>
  );
}

export default function InformationTheoryComparison({ locale }: DomainVizProps) {
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

  return (
    <div ref={containerRef}>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">{isZh ? "可视化对照" : "Visual Comparison"}</h2>
      </div>
      <div className="space-y-4">
        {[
          { title: isZh ? "阴阳爻线 ↔ 比特 0/1" : "Yin-Yang Lines ↔ 0/1 Bits", viz: <BitYinYangViz isZh={isZh} />, note: isZh ? "阳爻(—) = 1，阴爻(--) = 0。阴阳二元是一切信息编码的原子。" : "Yang(—) = 1, Yin(--) = 0. The yin-yang binary is the atom of all information encoding." },
          { title: isZh ? "信息 = 消除不确定性（熵减）" : "Information = Entropy Reduction", viz: <BitGridViz />, note: isZh ? "随机比特逐渐组织为有序图案——每获得1 bit信息，不确定性就减少一半。阴阳之分是最原始的信息提取。" : "Random bits organize into ordered patterns — each bit halves uncertainty. The yin-yang distinction is the most primitive act of information extraction." },
          { title: isZh ? "道 → 信息源" : "Dao → Source of Information", viz: <DaoSourceViz isZh={isZh} />, note: isZh ? "'道生一，一生二'——道是阴阳未分的整体，1 bit是第一次信息提取，从混沌中建立了第一个区别。" : "'Dao gives birth to One, One gives birth to Two' — Dao is the undivided whole; 1 bit is the first act of distinction from chaos." },
        ].map((item, i) => (
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
