"use client";

import { useRef, useEffect } from "react";

interface DomainInfo {
  slug: string;
  title: { zh: string; en: string };
  color: string;
}

interface TaijiDiagramProps {
  domains: DomainInfo[];
  onSectorClick: (slug: string) => void;
  locale: string;
}

export default function TaijiDiagram({
  domains,
  onSectorClick,
  locale,
}: TaijiDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMobile) return; // Mobile uses CSS animation

    let cleanup: (() => void) | undefined;

    // Dynamic import GSAP to avoid SSR issues
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      if (!svgRef.current) return;

      const ctx = gsap.context(() => {
        gsap.to(svgRef.current, {
          rotation: 360,
          duration: 120,
          repeat: -1,
          ease: "none",
        });
      });

      cleanup = () => ctx.revert();
    });

    return () => {
      cleanup?.();
    };
  }, [isMobile]);

  return (
    <div className="relative flex items-center justify-center w-full py-12 select-none">
      {/* Orbit container */}
      <div className="relative w-[min(80vw,500px)] h-[min(80vw,500px)]">
        {/* Taiji SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 200 200"
            className="w-[min(50vw,280px)] h-[min(50vw,280px)]"
            style={
              isMobile
                ? {
                    animation: isMobile ? "spin 120s linear infinite" : "none",
                  }
                : undefined
            }
          >
            {/* Yin (black) half */}
            <path
              d="M100,0 A100,100 0 0,0 100,200 A50,50 0 0,1 100,100 A50,50 0 0,0 100,0"
              fill="#18181b"
            />
            {/* Yang (white) half */}
            <path
              d="M100,0 A100,100 0 0,1 100,200 A50,50 0 0,0 100,100 A50,50 0 0,1 100,0"
              fill="#f4f4f5"
            />
            {/* Yin dot (yang in yin) */}
            <circle cx="100" cy="150" r="8" fill="#f4f4f5" />
            {/* Yang dot (yin in yang) */}
            <circle cx="100" cy="50" r="8" fill="#18181b" />
          </svg>
        </div>

        {/* Orbit icons */}
        {domains.map((domain, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180); // Start from top, 60° apart
          const radius = isMobile ? 38 : 44;

          return (
            <button
              key={domain.slug}
              data-slug={domain.slug}
              onClick={() => onSectorClick(domain.slug)}
              className="absolute transition-transform duration-200 hover:scale-125 group"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}%)`,
                top: `calc(50% + ${Math.sin(angle) * radius}%)`,
                transform: "translate(-50%, -50%)",
              }}
              aria-label={domain.title[locale as "zh" | "en"]}
            >
              {/* Icon circle */}
              <div
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center text-xs md:text-sm font-bold transition-shadow duration-300 hover:shadow-lg"
                style={{
                  borderColor: domain.color,
                  color: domain.color,
                  backgroundColor: `${domain.color}10`,
                  boxShadow: `0 0 12px ${domain.color}30`,
                }}
              >
                {domain.slug === "taiji-math"
                  ? "☰"
                  : domain.slug === "quantum-entanglement"
                    ? "⚛"
                    : domain.slug === "symmetry-breaking"
                      ? "◇"
                      : domain.slug === "information-theory"
                        ? "𝕀"
                        : domain.slug === "chaos-fractal"
                          ? "∞"
                          : "◉"}
              </div>
              {/* Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[#18181b] text-xs px-2 py-1 rounded border border-zinc-700 pointer-events-none">
                {domain.title[locale as "zh" | "en"]}
              </div>
            </button>
          );
        })}
      </div>

      {/* CSS keyframes for mobile spin */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
