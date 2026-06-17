"use client";

import { useEffect, useRef } from "react";
import type { DomainVizProps } from "./registry";

const TRIGRAMS = [
  { name: "☰", zh: "乾", en: "Qian", binary: "111" },
  { name: "☱", zh: "兑", en: "Dui", binary: "110" },
  { name: "☲", zh: "离", en: "Li", binary: "101" },
  { name: "☳", zh: "震", en: "Zhen", binary: "100" },
  { name: "☴", zh: "巽", en: "Xun", binary: "011" },
  { name: "☵", zh: "坎", en: "Kan", binary: "010" },
  { name: "☶", zh: "艮", en: "Gen", binary: "001" },
  { name: "☷", zh: "坤", en: "Kun", binary: "000" },
];

export default function TaijiMathViz({ locale }: DomainVizProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".trigram-item",
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: { each: 0.08, from: "start" },
            ease: "back.out(1.7)",
          }
        );
      }, container);

      return () => ctx.revert();
    });
  }, []);

  const isZh = locale === "zh";

  return (
    <div ref={containerRef} className="w-full max-w-2xl mx-auto py-8">
      <div className="text-center mb-6">
        <p className="text-sm text-zinc-400">
          {isZh ? "八卦 = 3位二进制" : "Bagua = 3-bit Binary"}
        </p>
      </div>
      <div className="grid grid-cols-4 gap-3 md:gap-4">
        {TRIGRAMS.map((tri) => (
          <div
            key={tri.binary}
            className="trigram-item flex flex-col items-center p-3 rounded-xl border border-zinc-800 bg-[#18181b]/30"
          >
            <span className="text-2xl md:text-3xl mb-1">{tri.name}</span>
            <span className="text-xs text-zinc-400 mb-1">
              {isZh ? tri.zh : tri.en}
            </span>
            <span
              className="text-xs font-mono px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: "#d4a85320",
                color: "#d4a853",
              }}
            >
              {tri.binary}
            </span>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-zinc-500 mt-6">
        {isZh
          ? "阳爻(—) = 1, 阴爻(--) = 0，三爻排列组合产生 2³=8 种卦象"
          : "Yang line(—) = 1, Yin line(--) = 0; 3-line permutations yield 2³=8 trigrams"}
      </p>
    </div>
  );
}
