"use client";

import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

const ACCENT = "#fb923c";

function FeedbackLoopViz({ isZh }: { isZh: boolean }) {
  return (
    <svg width="240" height="120" viewBox="0 0 240 120" className="mx-auto">
      {/* Outer loop (yang → yin → yang) */}
      <ellipse cx="120" cy="60" rx="90" ry="40" fill="none" stroke={ACCENT} strokeWidth="0.8" opacity="0.3" strokeDasharray="6 4" />
      {/* Inner loop (yin → yang → yin) */}
      <ellipse cx="120" cy="60" rx="50" ry="22" fill="none" stroke={ACCENT} strokeWidth="0.8" opacity="0.5" />
      {/* Yang node */}
      <circle cx="120" cy="25" r="10" fill={`${ACCENT}15`} stroke={ACCENT} strokeWidth="0.8" />
      <text x="120" y="28" textAnchor="middle" fontSize="8" fill={ACCENT}>{isZh ? "阳" : "Yang"}</text>
      {/* Yin node */}
      <circle cx="120" cy="95" r="10" fill={`${ACCENT}08`} stroke={ACCENT} strokeWidth="0.8" opacity="0.6" />
      <text x="120" y="98" textAnchor="middle" fontSize="8" fill={ACCENT} opacity="0.6">{isZh ? "阴" : "Yin"}</text>
      {/* Arrows */}
      <text x="155" y="55" fontSize="10" fill={ACCENT} opacity="0.5">↗</text>
      <text x="85" y="55" fontSize="10" fill={ACCENT} opacity="0.3">↖</text>
      <text x="85" y="70" fontSize="10" fill={ACCENT} opacity="0.4">↙</text>
      <text x="155" y="70" fontSize="10" fill={ACCENT} opacity="0.5">↘</text>
      {/* Label */}
      <text x="120" y="116" textAnchor="middle" fontSize="8" fill="#71717a">{isZh ? "正负反馈嵌套" : "Nested ± feedback"}</text>
    </svg>
  );
}

function EmergenceViz({ isZh }: { isZh: boolean }) {
  return (
    <svg width="200" height="130" viewBox="0 0 200 130" className="mx-auto">
      {/* Scattered dots → pattern */}
      <g opacity="0.3">
        {Array.from({ length: 30 }).map((_, i) => {
          const x = 20 + Math.random() * 60;
          const y = 20 + Math.random() * 90;
          return <circle key={`c-${i}`} cx={x} cy={y} r="1.5" fill="#52525b" />;
        })}
      </g>
      <text x="50" y="120" textAnchor="middle" fontSize="7" fill="#52525b">{isZh ? "独立个体" : "Independent"}</text>
      {/* Arrow */}
      <text x="100" y="65" fontSize="18" fill={ACCENT} opacity="0.5">→</text>
      {/* Organized pattern */}
      <g opacity="0.8">
        {Array.from({ length: 30 }).map((_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const r = 30 + (i % 3) * 10;
          const x = 150 + Math.cos(angle) * r;
          const y = 65 + Math.sin(angle) * r;
          return <circle key={`p-${i}`} cx={x} cy={y} r="2" fill={ACCENT} opacity="0.5" />;
        })}
      </g>
      <text x="150" y="120" textAnchor="middle" fontSize="7" fill={ACCENT}>{isZh ? "涌现模式" : "Emergent"}</text>
    </svg>
  );
}

function OscillationViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let phase = 0, id: number;
    function draw() {
      const w = c!.width, h = c!.height;
      ctx!.clearRect(0, 0, w, h);
      // Yang curve
      ctx!.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin(x * 0.03 + phase) * h * 0.3;
        if (x === 0) ctx!.moveTo(x, y); else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = ACCENT; ctx!.lineWidth = 1.8; ctx!.stroke();
      // Yin curve (offset by π)
      ctx!.beginPath();
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin(x * 0.03 + phase + Math.PI) * h * 0.25;
        if (x === 0) ctx!.moveTo(x, y); else ctx!.lineTo(x, y);
      }
      ctx!.strokeStyle = `${ACCENT}50`; ctx!.lineWidth = 1; ctx!.setLineDash([4, 3]); ctx!.stroke(); ctx!.setLineDash([]);
      // Center line
      ctx!.beginPath(); ctx!.moveTo(0, h / 2); ctx!.lineTo(w, h / 2);
      ctx!.strokeStyle = "#3f3f46"; ctx!.lineWidth = 0.5; ctx!.stroke();
      phase += 0.02; id = requestAnimationFrame(draw);
    }
    function resize() { const r = c!.parentElement!.getBoundingClientRect(); c!.width = r.width; c!.height = 120; }
    resize(); const ro = new ResizeObserver(resize); ro.observe(c!.parentElement!);
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="w-full" style={{ height: 120 }} />;
}

export default function SystemsScienceComparison({ locale }: DomainVizProps) {
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
      title: isZh ? "反馈回路 ↔ 阴阳互含" : "Feedback Loop ↔ Yin-Yang Mutual Containment",
      viz: <FeedbackLoopViz isZh={isZh} />,
      note: isZh ? "正反馈（阳推动增长）和负反馈（阴推动调节）互相嵌套——任何系统都同时含有加速器和刹车。太极图眼点正是这个道理：阴中含阳、阳中含阴。" : "Positive feedback (yang drives growth) and negative feedback (yin drives regulation) are nested — every system contains both accelerator and brake. The Taiji eye dots: yin contains yang, yang contains yin.",
    },
    {
      title: isZh ? "涌现 ↔ 整体大于部分之和" : "Emergence ↔ Whole > Sum of Parts",
      viz: <EmergenceViz isZh={isZh} />,
      note: isZh ? "独立散乱的个体通过简单互动规则，自发形成有序的宏观模式——这就是涌现。太极图不是一个黑半圆加一个白半圆，而是一个全新的、不可还原的整体。" : "Scattered individuals spontaneously form ordered macro-patterns through simple interactions — this is emergence. The Taiji is not half-black plus half-white but a new, irreducible whole.",
    },
    {
      title: isZh ? "阴阳消长 ↔ 动态平衡" : "Waxing-Waning ↔ Dynamic Equilibrium",
      viz: <OscillationViz />,
      note: isZh ? "阴阳消长不是无规律的随机波动，而是持续的动态平衡——正如捕食者-猎物循环、经济周期中的繁荣与衰退。系统通过振荡维持生命力。" : "Yin-yang waxing-waning is not random but continuous dynamic equilibrium — like predator-prey cycles or economic booms and busts. Systems sustain vitality through oscillation.",
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
