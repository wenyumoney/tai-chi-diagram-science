"use client";
import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";
const ACCENT = "#c084fc";

function GANViz({ isZh }: { isZh: boolean }) {
  return (
    <svg width="220" height="120" viewBox="0 0 220 120" className="mx-auto">
      <circle cx="50" cy="60" r="32" fill="none" stroke={ACCENT} strokeWidth="0.8" opacity="0.3" strokeDasharray="4 3" />
      <text x="50" y="56" textAnchor="middle" fontSize="9" fill={ACCENT}>{isZh ? "生成器" : "Generator"}</text>
      <text x="50" y="68" textAnchor="middle" fontSize="7" fill={ACCENT} opacity="0.5">{isZh ? "(阴·创造)" : "(Yin)"}</text>
      <circle cx="170" cy="60" r="32" fill="none" stroke={ACCENT} strokeWidth="0.8" opacity="0.5" />
      <text x="170" y="56" textAnchor="middle" fontSize="9" fill={ACCENT}>{isZh ? "判别器" : "Discrim"}</text>
      <text x="170" y="68" textAnchor="middle" fontSize="7" fill={ACCENT} opacity="0.5">{isZh ? "(阳·判断)" : "(Yang)"}</text>
      <line x1="82" y1="50" x2="138" y2="50" stroke={ACCENT} strokeWidth="0.8" opacity="0.5"><animate attributeName="x2" values="138;82" dur="2s" repeatCount="indefinite" /></line>
      <line x1="82" y1="70" x2="138" y2="70" stroke={ACCENT} strokeWidth="0.6" opacity="0.3"><animate attributeName="x2" values="82;138" dur="2s" repeatCount="indefinite" /></line>
      <text x="110" y="46" textAnchor="middle" fontSize="7" fill={ACCENT} opacity="0.4">{isZh ? "假数据 →" : "Fake →"}</text>
      <text x="110" y="86" textAnchor="middle" fontSize="7" fill={ACCENT} opacity="0.3">{isZh ? "← 反馈" : "← Feedback"}</text>
      <text x="110" y="105" textAnchor="middle" fontSize="8" fill="#71717a">{isZh ? "阴阳相推而生变化" : "Push → Change"}</text>
    </svg>
  );
}

function ExploreExploitViz({ isZh }: { isZh: boolean }) {
  return (
    <svg width="200" height="100" viewBox="0 0 200 100" className="mx-auto">
      <rect x="10" y="10" width="180" height="80" rx="12" fill="none" stroke="#3f3f46" strokeWidth="0.5" />
      <line x1="100" y1="15" x2="100" y2="85" stroke="#3f3f46" strokeWidth="0.3" strokeDasharray="2 4" />
      <circle cx="50" cy="50" r="18" fill={`${ACCENT}10`} stroke={ACCENT} strokeWidth="0.8" opacity="0.5" />
      <text x="50" y="53" textAnchor="middle" fontSize="8" fill={ACCENT}>{isZh ? "探索" : "Explore"}</text>
      <text x="50" y="80" textAnchor="middle" fontSize="7" fill="#71717a">{isZh ? "(阴·开放)" : "(Yin)"}</text>
      <circle cx="150" cy="50" r="18" fill={`${ACCENT}15`} stroke={ACCENT} strokeWidth="1" opacity="0.7" />
      <text x="150" y="53" textAnchor="middle" fontSize="8" fill={ACCENT}>{isZh ? "利用" : "Exploit"}</text>
      <text x="150" y="80" textAnchor="middle" fontSize="7" fill="#71717a">{isZh ? "(阳·收敛)" : "(Yang)"}</text>
      <path d="M68,45 Q100,20 132,45" fill="none" stroke={ACCENT} strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
      <path d="M68,55 Q100,80 132,55" fill="none" stroke={ACCENT} strokeWidth="0.5" opacity="0.3" strokeDasharray="3 3" />
    </svg>
  );
}

export default function AIComparison({ locale }: DomainVizProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isZh = locale === "zh";
  useEffect(() => { if (typeof window === "undefined") return; import("gsap").then(({ default: g }) => { const ctx = g.context(() => { g.fromTo(".cc", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" }); }, ref.current!); return () => ctx.revert(); }); }, []);
  const items = [
    { title: isZh ? "生成对抗网络(GAN) ↔ 阴阳博弈" : "GAN ↔ Yin-Yang Game", viz: <GANViz isZh={isZh} />, note: isZh ? "生成器（阴——创造隐藏）与判别器（阳——判断揭示）互相博弈训练，在对抗中共同进化。" : "Generator (yin) and discriminator (yang) compete and co-evolve through adversarial training." },
    { title: isZh ? "探索vs利用 ↔ 阴阳动态平衡" : "Explore vs Exploit ↔ Dynamic Balance", viz: <ExploreExploitViz isZh={isZh} />, note: isZh ? "探索未知（阴）与利用已知（阳）之间需要持续调节——AlphaGo正是通过这种平衡超越了人类。" : "Continuously balancing exploration (yin) and exploitation (yang) — AlphaGo surpassed humans through this equilibrium." },
    { title: isZh ? "注意力机制 ↔ 关注与忽略的互补" : "Attention ↔ Focus & Ignore", viz: <div className="flex justify-center gap-2 py-3 flex-wrap">{[1,0.3,0.6,0.2,0.9,0.1,0.4].map((w,i)=><span key={i} className="px-2 py-1 rounded text-[10px] font-mono" style={{backgroundColor:`${ACCENT}${Math.round(w*20)+10}`,color:w>0.5?ACCENT:'#71717a'}}>{w.toFixed(1)}</span>)}</div>, note: isZh ? "Transformer的注意力机制对每个输入token分配不同权重——阳（关注重要信息）与阴（忽略无关信息）精妙平衡。" : "Transformer attention assigns different weights to each input — yang (focus on important) and yin (ignore irrelevant) in exquisite balance." },
  ];
  return (<div ref={ref}><div className="flex items-center gap-3 mb-6"><span className="w-1.5 h-1.5 rounded-full" style={{backgroundColor:ACCENT}}/><h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">{isZh?"可视化对照":"Visual Comparison"}</h2></div><div className="space-y-4">{items.map((item,i)=>(<div key={i} className="cc rounded-2xl p-[1px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500"><div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.03]"><h4 className="text-xs font-semibold text-zinc-300 mb-3 text-center">{item.title}</h4>{item.viz}<p className="text-center text-[11px] text-zinc-600 mt-3 leading-relaxed">{item.note}</p></div></div>))}</div></div>);
}
