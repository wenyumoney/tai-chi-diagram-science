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

// SVG icons for each domain — clean geometric primitives, no emojis
function DomainIcon({ slug }: { slug: string }) {
  switch (slug) {
    case "taiji-math":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      );
    case "quantum-entanglement":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="7" cy="12" r="3" />
          <circle cx="17" cy="12" r="3" />
          <path d="M10 12h4" strokeDasharray="1 2" />
          <line x1="12" y1="10" x2="12" y2="14" strokeWidth="1" />
        </svg>
      );
    case "symmetry-breaking":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M12 2l8 10-8 10-8-10z" />
          <line x1="12" y1="7" x2="12" y2="17" strokeDasharray="1 1.5" />
        </svg>
      );
    case "information-theory":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="6" y1="7" x2="6" y2="17" />
          <line x1="10" y1="5" x2="10" y2="19" />
          <line x1="14" y1="4" x2="14" y2="20" />
          <line x1="18" y1="7" x2="18" y2="17" />
          <circle cx="6" cy="7" r="1" fill="currentColor" stroke="none" />
          <circle cx="14" cy="4" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "chaos-fractal":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v18M3 12h18" opacity="0.3" />
          <path d="M12 3C9 12 3 15 12 21C21 15 15 12 12 3Z" />
        </svg>
      );
    case "systems-science":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="5" cy="19" r="2.5" />
          <circle cx="19" cy="19" r="2.5" />
          <line x1="10.5" y1="7" x2="6.5" y2="17" />
          <line x1="13.5" y1="7" x2="17.5" y2="17" />
          <line x1="7.5" y1="19" x2="16.5" y2="19" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
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
    if (isMobile) return;

    let cleanup: (() => void) | undefined;

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
      <div className="relative w-[min(80vw,500px)] h-[min(80vw,500px)]">
        {/* Taiji SVG — now with refined visual */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 200 200"
            className="w-[min(50vw,280px)] h-[min(50vw,280px)] drop-shadow-[0_0_60px_rgba(255,255,255,0.04)]"
            style={
              isMobile
                ? { animation: "spin 120s linear infinite" }
                : undefined
            }
          >
            {/* Outer glow ring */}
            <circle cx="100" cy="100" r="99" fill="none" stroke="currentColor"
              className="text-zinc-700/30" strokeWidth="0.5" />
            {/* Yin (dark) half */}
            <path
              d="M100,0 A100,100 0 0,0 100,200 A50,50 0 0,1 100,100 A50,50 0 0,0 100,0"
              fill="#18181b"
            />
            {/* Yang (light) half */}
            <path
              d="M100,0 A100,100 0 0,1 100,200 A50,50 0 0,0 100,100 A50,50 0 0,1 100,0"
              fill="#f4f4f5"
            />
            {/* Yin dot */}
            <circle cx="100" cy="150" r="8" fill="#f4f4f5" />
            {/* Yang dot */}
            <circle cx="100" cy="50" r="8" fill="#18181b" />
          </svg>
        </div>

        {/* Orbit domain icons */}
        {domains.map((domain, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const radius = isMobile ? 38 : 44;

          return (
            <button
              key={domain.slug}
              data-slug={domain.slug}
              onClick={() => onSectorClick(domain.slug)}
              className="absolute transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-125 group"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}%)`,
                top: `calc(50% + ${Math.sin(angle) * radius}%)`,
                transform: "translate(-50%, -50%)",
              }}
              aria-label={domain.title[locale as "zh" | "en"]}
            >
              {/* Outer shell — Double-Bezel */}
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-2xl border flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  borderColor: `${domain.color}40`,
                  backgroundColor: `${domain.color}08`,
                  boxShadow: `0 0 20px ${domain.color}15, inset 0 1px 0 ${domain.color}20`,
                }}
              >
                {/* Inner icon */}
                <div
                  className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-500"
                  style={{ color: domain.color }}
                >
                  <DomainIcon slug={domain.slug} />
                </div>
              </div>
              {/* Tooltip — refined pill */}
              <div className="absolute left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] whitespace-nowrap bg-zinc-900/90 backdrop-blur-md text-xs px-3 py-1.5 rounded-full border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] pointer-events-none">
                {domain.title[locale as "zh" | "en"]}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
