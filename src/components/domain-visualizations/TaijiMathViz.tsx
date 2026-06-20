"use client";

import { useEffect, useRef, useState } from "react";
import type { DomainVizProps } from "./registry";

const TRIGRAMS = [
  { symbol: "☰", zh: "乾", en: "Qian", binary: "111", angle: -90 },
  { symbol: "☱", zh: "兑", en: "Dui", binary: "110", angle: -45 },
  { symbol: "☲", zh: "离", en: "Li", binary: "101", angle: 0 },
  { symbol: "☳", zh: "震", en: "Zhen", binary: "100", angle: 45 },
  { symbol: "☴", zh: "巽", en: "Xun", binary: "011", angle: 135 },
  { symbol: "☵", zh: "坎", en: "Kan", binary: "010", angle: 180 },
  { symbol: "☶", zh: "艮", en: "Gen", binary: "001", angle: -135 },
  { symbol: "☷", zh: "坤", en: "Kun", binary: "000", angle: 90 },
];

const CX = 250;
const CY = 250;
const ORBIT = 142;
const ACCENT = "#d4a853";
const BG = "#18181b";

export default function TaijiMathViz({ locale }: DomainVizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const isZh = locale === "zh";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".trigram-node",
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: { each: 0.08, from: "start" },
            ease: "back.out(2)",
          }
        );
        gsap.fromTo(
          ".radial-line",
          { opacity: 0, attr: { "stroke-opacity": 0 } },
          {
            opacity: 1,
            duration: 0.4,
            stagger: { each: 0.08, from: "start" },
          }
        );
      }, container);
      return () => ctx.revert();
    });
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto py-8 md:py-12">
      {/* Title */}
      <p className="text-center text-sm text-zinc-400 mb-2">
        {isZh ? "八卦 = 3位二进制" : "Bagua = 3-bit Binary"}
      </p>

      <svg
        viewBox="0 0 500 500"
        className="w-full max-w-[500px] mx-auto block"
        role="img"
        aria-label={isZh ? "八卦圆盘图" : "Bagua wheel diagram"}
      >
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle background circle */}
        <circle cx={CX} cy={CY} r={ORBIT + 20} fill="url(#bgGrad)" />

        {/* Radial lines from center */}
        {TRIGRAMS.map((tri, i) => {
          const rad = (tri.angle * Math.PI) / 180;
          const x = CX + Math.cos(rad) * ORBIT;
          const y = CY + Math.sin(rad) * ORBIT;
          const active = hoveredIdx === i;
          return (
            <line
              key={`line-${i}`}
              className="radial-line"
              x1={CX}
              y1={CY}
              x2={x}
              y2={y}
              stroke={active ? ACCENT : "#3f3f46"}
              strokeWidth={active ? 1.5 : 0.5}
              strokeDasharray={active ? "none" : "5 5"}
              strokeOpacity={active ? 0.8 : 0.3}
              style={{
                transition:
                  "stroke 0.35s cubic-bezier(0.32,0.72,0,1), stroke-width 0.35s cubic-bezier(0.32,0.72,0,1)",
              }}
            />
          );
        })}

        {/* Center Taiji diagram with SVG native rotation */}
        <g aria-label={isZh ? "太极图" : "Taiji diagram"}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${CX} ${CY}`}
            to={`360 ${CX} ${CY}`}
            dur="24s"
            repeatCount="indefinite"
          />
          {/* Outer ring */}
          <circle
            cx={CX}
            cy={CY}
            r={36}
            fill="none"
            stroke="#52525b"
            strokeWidth="0.5"
            opacity="0.35"
          />
          {/* Yang (light) half */}
          <path
            d={`M${CX},${CY - 36} A36,36 0 0,1 ${CX},${CY + 36} A18,18 0 0,0 ${CX},${CY} A18,18 0 0,1 ${CX},${CY - 36} Z`}
            fill="#f4f4f5"
            opacity="0.12"
          />
          {/* Yin (dark) half */}
          <path
            d={`M${CX},${CY - 36} A36,36 0 0,0 ${CX},${CY + 36} A18,18 0 0,1 ${CX},${CY} A18,18 0 0,0 ${CX},${CY - 36} Z`}
            fill={BG}
          />
          {/* White dot (yang in yin) */}
          <circle cx={CX} cy={CY + 18} r="4" fill="#f4f4f5" opacity="0.12" />
          {/* Dark dot (yin in yang) */}
          <circle cx={CX} cy={CY - 18} r="4" fill={BG} />
        </g>

        {/* Orbit guide ring (subtle) */}
        <circle
          cx={CX}
          cy={CY}
          r={ORBIT}
          fill="none"
          stroke="#3f3f46"
          strokeWidth="0.5"
          strokeDasharray="2 6"
          opacity="0.25"
        />

        {/* 8 Trigram nodes */}
        {TRIGRAMS.map((tri, i) => {
          const rad = (tri.angle * Math.PI) / 180;
          const nx = CX + Math.cos(rad) * ORBIT;
          const ny = CY + Math.sin(rad) * ORBIT;
          const active = hoveredIdx === i;

          return (
            <g
              key={tri.binary}
              className="trigram-node"
              style={{
                cursor: "pointer",
                transformOrigin: `${nx}px ${ny}px`,
                transition:
                  "transform 0.35s cubic-bezier(0.32,0.72,0,1)",
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Hover glow */}
              {active && (
                <circle
                  cx={nx}
                  cy={ny}
                  r={38}
                  fill={ACCENT}
                  opacity="0.06"
                  style={{
                    transition: "opacity 0.35s cubic-bezier(0.32,0.72,0,1)",
                  }}
                />
              )}

              {/* Card background */}
              <rect
                x={nx - 34}
                y={ny - 30}
                width={68}
                height={60}
                rx={14}
                fill={active ? `${ACCENT}10` : BG}
                stroke={active ? `${ACCENT}40` : "#27272a"}
                strokeWidth="1"
                style={{
                  transition:
                    "fill 0.35s cubic-bezier(0.32,0.72,0,1), stroke 0.35s cubic-bezier(0.32,0.72,0,1)",
                }}
              />

              {/* Trigram symbol */}
              <text
                x={nx}
                y={ny - 5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="24"
                fill={active ? ACCENT : "#a1a1aa"}
                style={{
                  fontFamily:
                    "var(--font-geist-sans), PingFang SC, Microsoft YaHei, sans-serif",
                  transition: "fill 0.35s cubic-bezier(0.32,0.72,0,1)",
                }}
              >
                {tri.symbol}
              </text>

              {/* Name label */}
              <text
                x={nx}
                y={ny + 17}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="10"
                fontWeight="500"
                fill={active ? ACCENT : "#71717a"}
                style={{
                  fontFamily:
                    "var(--font-geist-sans), PingFang SC, Microsoft YaHei, sans-serif",
                  transition: "fill 0.35s cubic-bezier(0.32,0.72,0,1)",
                }}
              >
                {isZh ? tri.zh : tri.en}
              </text>

              {/* Binary tooltip on hover */}
              {active && (
                <g>
                  <rect
                    x={nx - 20}
                    y={ny - 54}
                    width={40}
                    height={20}
                    rx={7}
                    fill={ACCENT}
                    opacity="0.9"
                  />
                  <text
                    x={nx}
                    y={ny - 44}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill={BG}
                  >
                    {tri.binary}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Center label */}
        <text
          x={CX}
          y={CY + 62}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="#52525b"
          style={{
            fontFamily:
              "var(--font-geist-sans), PingFang SC, Microsoft YaHei, sans-serif",
          }}
        >
          {isZh ? "太 极" : "Taiji"}
        </text>
      </svg>

      {/* Bottom explanation */}
      <p className="text-center text-xs text-zinc-500 mt-3 max-w-md mx-auto leading-relaxed">
        {isZh
          ? "阳爻(—) = 1，阴爻(--) = 0。三爻排列组合产生 2³ = 8 种卦象，恰好对应 3 位二进制 000–111。悬停卦象查看二进制值。"
          : "Yang line(—) = 1, Yin line(--) = 0. Three-line permutations yield 2³ = 8 trigrams, matching 3-bit binary 000–111. Hover to see binary values."}
      </p>
    </div>
  );
}
