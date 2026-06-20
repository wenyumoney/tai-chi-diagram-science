"use client";

import { useEffect, useRef, useState } from "react";
import type { DomainVizProps } from "./registry";

const ACCENT = "#d4a853";

// ── Comparison 1: Yin-Yang lines ↔ 0/1 bits ──
function BinaryComparison({ isZh }: { isZh: boolean }) {
  const [hovered, setHovered] = useState<"yang" | "yin" | null>(null);

  return (
    <div className="rounded-2xl p-[1px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500">
      <div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.03]">
        <h4 className="text-xs font-semibold text-zinc-300 mb-5 text-center">
          {isZh ? "阴阳爻线 ↔ 二进制位" : "Yin-Yang Lines ↔ Binary Bits"}
        </h4>
        <div className="flex items-center justify-center gap-6 md:gap-10">
          {/* Yang side */}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onMouseEnter={() => setHovered("yang")}
            onMouseLeave={() => setHovered(null)}
          >
            <svg width="48" height="24" viewBox="0 0 48 24">
              <rect
                x="4"
                y="8"
                width="40"
                height="8"
                rx="2"
                fill={hovered === "yang" ? ACCENT : "#a1a1aa"}
                style={{
                  transition: "fill 0.3s cubic-bezier(0.32,0.72,0,1)",
                }}
              />
            </svg>
            <span
              className="text-[10px] font-medium transition-colors duration-300"
              style={{ color: hovered === "yang" ? ACCENT : "#71717a" }}
            >
              {isZh ? "阳爻 (—)" : "Yang"}
            </span>
          </div>

          {/* Arrow bridge */}
          <div className="flex flex-col items-center gap-1">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <line
                x1="4"
                y1="14"
                x2="20"
                y2="14"
                stroke={hovered ? ACCENT : "#3f3f46"}
                strokeWidth="1.5"
                style={{
                  transition: "stroke 0.3s cubic-bezier(0.32,0.72,0,1)",
                }}
              />
              <polyline
                points="15,9 21,14 15,19"
                fill="none"
                stroke={hovered ? ACCENT : "#3f3f46"}
                strokeWidth="1.5"
                style={{
                  transition: "stroke 0.3s cubic-bezier(0.32,0.72,0,1)",
                }}
              />
            </svg>
            <span className="text-[9px] text-zinc-600 font-mono">↔</span>
          </div>

          {/* Binary side */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-2xl font-mono font-bold transition-colors duration-300"
              style={{ color: hovered === "yang" ? ACCENT : "#a1a1aa" }}
            >
              1
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">
              {isZh ? "比特" : "Bit"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 md:gap-10 mt-6">
          {/* Yin side */}
          <div
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onMouseEnter={() => setHovered("yin")}
            onMouseLeave={() => setHovered(null)}
          >
            <svg width="48" height="24" viewBox="0 0 48 24">
              <rect
                x="4"
                y="8"
                width="17"
                height="8"
                rx="2"
                fill={hovered === "yin" ? ACCENT : "#52525b"}
                style={{
                  transition: "fill 0.3s cubic-bezier(0.32,0.72,0,1)",
                }}
              />
              <rect
                x="27"
                y="8"
                width="17"
                height="8"
                rx="2"
                fill={hovered === "yin" ? ACCENT : "#52525b"}
                style={{
                  transition: "fill 0.3s cubic-bezier(0.32,0.72,0,1)",
                }}
              />
            </svg>
            <span
              className="text-[10px] font-medium transition-colors duration-300"
              style={{ color: hovered === "yin" ? ACCENT : "#71717a" }}
            >
              {isZh ? "阴爻 (--)" : "Yin"}
            </span>
          </div>

          {/* Arrow bridge */}
          <div className="flex flex-col items-center gap-1 opacity-0">
            <svg width="28" height="28" viewBox="0 0 28 28">
              <line x1="4" y1="14" x2="20" y2="14" stroke="#3f3f46" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Binary side */}
          <div className="flex flex-col items-center gap-2">
            <span
              className="text-2xl font-mono font-bold transition-colors duration-300"
              style={{ color: hovered === "yin" ? ACCENT : "#a1a1aa" }}
            >
              0
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">
              {isZh ? "比特" : "Bit"}
            </span>
          </div>
        </div>
        <p className="text-center text-[11px] text-zinc-600 mt-5 leading-relaxed">
          {isZh
            ? "阳(—) → 1，阴(--) → 0。阴阳二元是一切信息编码的起点。"
            : "Yang(—) → 1, Yin(--) → 0. The yin-yang binary is the origin of all information encoding."}
        </p>
      </div>
    </div>
  );
}

// ── Comparison 2: 3-bit toggle → trigram ──
function TrigramBuilder({ isZh }: { isZh: boolean }) {
  const [bits, setBits] = useState([1, 1, 1]); // Default: 乾 ☰ (111)
  const binaryStr = bits.join("");
  const trigram = TRIGRAM_MAP[binaryStr];

  function toggleBit(idx: number) {
    setBits((prev) => {
      const next = [...prev];
      next[idx] = next[idx] === 1 ? 0 : 1;
      return next;
    });
  }

  return (
    <div className="rounded-2xl p-[1px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500">
      <div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.03]">
        <h4 className="text-xs font-semibold text-zinc-300 mb-5 text-center">
          {isZh ? "3位开关 → 卦象" : "3-Bit Toggle → Trigram"}
        </h4>
        <p className="text-center text-[10px] text-zinc-600 mb-5">
          {isZh ? "点击阳爻切换阴阳，探索全部 2³=8 种卦象" : "Click lines to toggle yin-yang; explore all 2³=8 trigrams"}
        </p>

        {/* 3 toggle-able lines + result */}
        <div className="flex items-center justify-center gap-8 md:gap-12">
          {/* 3 clickable lines */}
          <div className="flex flex-col gap-3 items-center">
            {bits.map((bit, idx) => (
              <button
                key={idx}
                onClick={() => toggleBit(idx)}
                className="transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-95"
                aria-label={
                  isZh
                    ? `${bit === 1 ? "阳爻" : "阴爻"} (第${idx + 1}位)`
                    : `${bit === 1 ? "Yang" : "Yin"} line (bit ${idx + 1})`
                }
              >
                <svg width="48" height="24" viewBox="0 0 48 24">
                  {bit === 1 ? (
                    <rect
                      x="4"
                      y="8"
                      width="40"
                      height="8"
                      rx="2"
                      fill={ACCENT}
                    />
                  ) : (
                    <>
                      <rect
                        x="4"
                        y="8"
                        width="17"
                        height="8"
                        rx="2"
                        fill="#52525b"
                      />
                      <rect
                        x="27"
                        y="8"
                        width="17"
                        height="8"
                        rx="2"
                        fill="#52525b"
                      />
                    </>
                  )}
                </svg>
              </button>
            ))}
            {/* Bit labels */}
            <div className="flex flex-col gap-3">
              {bits.map((bit, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono text-zinc-500 block h-6 leading-6 text-center"
                >
                  {bit}
                </span>
              ))}
            </div>
          </div>

          {/* Result arrow */}
          <svg width="32" height="32" viewBox="0 0 32 32" className="shrink-0">
            <line
              x1="4"
              y1="16"
              x2="24"
              y2="16"
              stroke={ACCENT}
              strokeWidth="1.5"
              opacity="0.6"
            />
            <polyline
              points="18,11 25,16 18,21"
              fill="none"
              stroke={ACCENT}
              strokeWidth="1.5"
              opacity="0.6"
            />
          </svg>

          {/* Result: trigram + binary */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-4xl">{trigram?.symbol}</span>
            <span className="text-xs font-medium text-zinc-400">
              {isZh ? trigram?.zh : trigram?.en}
            </span>
            <span
              className="text-xs font-mono font-bold px-2 py-0.5 rounded"
              style={{ backgroundColor: `${ACCENT}20`, color: ACCENT }}
            >
              {binaryStr}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const TRIGRAM_MAP: Record<string, { symbol: string; zh: string; en: string }> = {
  "111": { symbol: "☰", zh: "乾", en: "Qian" },
  "110": { symbol: "☱", zh: "兑", en: "Dui" },
  "101": { symbol: "☲", zh: "离", en: "Li" },
  "100": { symbol: "☳", zh: "震", en: "Zhen" },
  "011": { symbol: "☴", zh: "巽", en: "Xun" },
  "010": { symbol: "☵", zh: "坎", en: "Kan" },
  "001": { symbol: "☶", zh: "艮", en: "Gen" },
  "000": { symbol: "☷", zh: "坤", en: "Kun" },
};

// ── Comparison 3: Taiji S-curve ↔ Real number continuum ──
function SCurveComparison({ isZh }: { isZh: boolean }) {
  return (
    <div className="rounded-2xl p-[1px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500">
      <div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.03]">
        <h4 className="text-xs font-semibold text-zinc-300 mb-5 text-center">
          {isZh ? "太极 S 曲线 ↔ 实数连续统" : "Taiji S-Curve ↔ Real Number Continuum"}
        </h4>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Taiji S-curve */}
          <div className="flex flex-col items-center gap-3">
            <svg width="100" height="100" viewBox="0 0 100 100">
              {/* Outer circle */}
              <circle cx="50" cy="50" r="46" fill="none" stroke="#3f3f46" strokeWidth="0.5" />
              {/* Yang half */}
              <path
                d="M50,4 A46,46 0 0,1 50,96 A23,23 0 0,0 50,50 A23,23 0 0,1 50,4 Z"
                fill="rgba(244,244,245,0.08)"
              />
              {/* S-curve highlight */}
              <path
                d="M50,4 A46,46 0 0,1 50,96"
                fill="none"
                stroke={ACCENT}
                strokeWidth="1.5"
                opacity="0.6"
              />
              <circle cx="50" cy="27" r="2.5" fill={ACCENT} opacity="0.5" />
              <circle cx="50" cy="73" r="2.5" fill={ACCENT} opacity="0.5" />
            </svg>
            <span className="text-[10px] text-zinc-500">
              {isZh ? "太极 S 曲线 — 连续分割" : "Taiji S-Curve — Continuous division"}
            </span>
          </div>

          {/* Equivalence symbol */}
          <span className="text-zinc-600 text-lg">≈</span>

          {/* Real number continuum */}
          <div className="flex flex-col items-center gap-3">
            <svg width="200" height="100" viewBox="0 0 200 100">
              {/* Number line */}
              <line x1="20" y1="50" x2="180" y2="50" stroke="#52525b" strokeWidth="1" />
              {/* Gradient bar */}
              <defs>
                <linearGradient id="continuumGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#18181b" />
                  <stop offset="50%" stopColor={ACCENT} stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f4f4f5" stopOpacity="0.08" />
                </linearGradient>
              </defs>
              <rect x="20" y="38" width="160" height="4" rx="2" fill="url(#continuumGrad)" />
              {/* Tick marks */}
              {[0, 0.25, 0.5, 0.75, 1].map((val, i) => {
                const x = 20 + i * 40;
                return (
                  <g key={i}>
                    <line x1={x} y1={46} x2={x} y2={54} stroke="#71717a" strokeWidth="0.5" />
                    <text x={x} y={64} textAnchor="middle" fontSize="8" fill="#71717a" fontFamily="monospace">
                      {val}
                    </text>
                    {val === 0.5 && (
                      <text x={x} y={76} textAnchor="middle" fontSize="7" fill="#52525b">
                        ℝ
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
            <span className="text-[10px] text-zinc-500">
              {isZh ? "实数连续统 [0,1] — 无穷可分" : "Real continuum [0,1] — Infinitely divisible"}
            </span>
          </div>
        </div>
        <p className="text-center text-[11px] text-zinc-600 mt-5 leading-relaxed">
          {isZh
            ? "太极图的 S 曲线将圆连续分为阴阳两半，正如实数连续统在 0 与 1 之间存在无穷多个数——离散二元背后是连续统的光谱。"
            : "The S-curve continuously divides the circle into yin-yang halves, just as the real number continuum contains infinite values between 0 and 1 — behind discrete binary lies a continuous spectrum."}
        </p>
      </div>
    </div>
  );
}

// ── Main export ──
export default function TaijiMathComparison({ locale }: DomainVizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".comp-card",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: { each: 0.12, from: "start" },
            ease: "power2.out",
          }
        );
      }, container);
      return () => ctx.revert();
    });
  }, []);

  return (
    <div ref={containerRef}>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: ACCENT }}
        />
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
          {isZh ? "可视化对照" : "Visual Comparison"}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="comp-card">
          <BinaryComparison isZh={isZh} />
        </div>
        <div className="comp-card">
          <TrigramBuilder isZh={isZh} />
        </div>
        <div className="comp-card">
          <SCurveComparison isZh={isZh} />
        </div>
      </div>
    </div>
  );
}
