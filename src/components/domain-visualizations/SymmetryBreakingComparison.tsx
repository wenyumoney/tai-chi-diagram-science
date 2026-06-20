"use client";

import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

const ACCENT = "#a78bfa";

function MexicanHatViz() {
  return (
    <svg width="200" height="140" viewBox="0 0 200 140" className="mx-auto">
      <defs>
        <linearGradient id="hatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.15" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Mexican hat potential curve */}
      <path d="M10,110 Q30,40 100,30 Q170,40 190,110" fill="none" stroke={ACCENT} strokeWidth="1.5" opacity="0.5" />
      {/* Inner bump */}
      <path d="M75,55 Q100,30 125,55" fill="none" stroke={ACCENT} strokeWidth="1.2" opacity="0.4" strokeDasharray="4 3" />
      {/* Ball at broken state */}
      <circle cx="155" cy="92" r="7" fill={ACCENT} opacity="0.8" />
      <circle cx="155" cy="92" r="3" fill="#fff" opacity="0.6" />
      {/* Ball at center (unstable) */}
      <circle cx="100" cy="35" r="4" fill={ACCENT} opacity="0.15" />
      {/* Labels */}
      <text x="100" y="20" textAnchor="middle" fontSize="7" fill={ACCENT} opacity="0.4">不稳定的对称态</text>
      <text x="152" y="80" textAnchor="middle" fontSize="7" fill={ACCENT} opacity="0.7">稳定的破缺态</text>
    </svg>
  );
}

function SplitTaijiViz() {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" className="mx-auto">
      <circle cx="80" cy="80" r="75" fill="none" stroke="#3f3f46" strokeWidth="0.5" />
      {/* Asymmetric split — yin-yang not 50/50 but shifted */}
      <path d="M80,5 A75,75 0 0,1 120,80 Q100,80 95,80 A30,30 0 0,0 65,80 Q60,80 80,5 Z" fill="rgba(244,244,245,0.06)" />
      <path d="M80,5 A75,75 0 0,0 40,80 Q60,80 65,80 A30,30 0 0,1 95,80 Q100,80 80,5 Z" fill="#18181b" />
      {/* Uneven dots */}
      <circle cx="50" cy="120" r="5" fill="rgba(244,244,245,0.08)" />
      <circle cx="70" cy="45" r="6" fill="#18181b" />
      <text x="80" y="150" textAnchor="middle" fontSize="8" fill="#71717a">对称已破缺</text>
    </svg>
  );
}

export default function SymmetryBreakingComparison({ locale }: DomainVizProps) {
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
          {
            title: isZh ? "对称态 → 破缺态" : "Symmetric → Broken State",
            viz: <MexicanHatViz />,
            note: isZh ? "中心对称点不稳定，系统自发滑向一侧的稳定破缺态——正如阴阳从混沌平衡中走向具体显化。" : "The central symmetric point is unstable; the system slides to a stable broken state — as yin-yang moves from chaotic balance to concrete manifestation.",
          },
          {
            title: isZh ? "太极平衡 → 不对称现实" : "Taiji Balance → Asymmetric Reality",
            viz: <SplitTaijiViz />,
            note: isZh ? "真正的太极不是完美的50/50——阴阳总是不对称的。正是这种不对称驱动了运动、变化和万物的生成。" : "The real Taiji is never a perfect 50/50 — yin-yang is always asymmetric. This asymmetry drives motion, change, and the birth of all things.",
          },
          {
            title: isZh ? "不稳定 = 动态 = 生机" : "Instability = Dynamism = Life",
            viz: (
              <div className="flex items-center justify-center gap-3 py-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: ACCENT, opacity: 0.3 + i * 0.25, animationDelay: `${i * 0.2}s` }} />
                ))}
                <span className="text-[10px] text-zinc-500 ml-2">{isZh ? "持续的动态平衡" : "Continuous dynamic balance"}</span>
              </div>
            ),
            note: isZh ? "完美的对称意味着静止与死亡。太极的生命力恰恰来自不对称——阴阳不平衡驱动了永恒的流动与转化。" : "Perfect symmetry means stasis and death. The vitality of Taiji comes precisely from asymmetry — yin-yang imbalance drives eternal flow and transformation.",
          },
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
