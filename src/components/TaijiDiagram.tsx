"use client";

import { useRef, useEffect, useState, useMemo, useCallback } from "react";

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
  const orbitRef = useRef<HTMLDivElement>(null);
  const cycleStartRef = useRef<number>(0);
  const prevRpmRef = useRef<number>(0);
  const [rpm, setRpm] = useState(0);
  const [rpmPulse, setRpmPulse] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [narrationKey, setNarrationKey] = useState(0);

  const THRESHOLDS = [500, 1500, 3000, 5000, 7000, 9000];

  // Narration: changes based on RPM thresholds
  const narrationZh = useMemo(() => {
    if (rpm < 500) return "静极生动，阴阳初分";
    if (rpm < 1500) return "阴消阳长，太极始转";
    if (rpm < 3000) return "阴阳相推，万物生化";
    if (rpm < 5000) return "刚柔相摩，八卦相荡";
    if (rpm < 7000) return "动极而静，静极复动";
    if (rpm < 9000) return "无往不复，天地际也";
    return "阴阳合一，道法自然";
  }, [rpm]);

  const narrationEn = useMemo(() => {
    if (rpm < 500) return "Stillness breaks — yin and yang emerge";
    if (rpm < 1500) return "Yang rises, yin recedes — the Taiji turns";
    if (rpm < 3000) return "Yin and yang entwine — all things arise";
    if (rpm < 5000) return "Hard and soft grind — the eight trigrams stir";
    if (rpm < 7000) return "Motion peaks — stillness already begins";
    if (rpm < 9000) return "No departure without return — the cosmic pulse";
    return "Yin and yang unite — the Dao unfolds";
  }, [rpm]);

  const narration = locale === "zh" ? narrationZh : narrationEn;

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cleanup: (() => void) | undefined;
    const DURATION = 360; // 6 minutes
    const MAX_RPM = 10000;

    cycleStartRef.current = Date.now();

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      if (!svgRef.current) return;

      const ctx = gsap.context(() => {
        const tween = gsap.to(svgRef.current, {
          rotation: 10_800_000, // total degrees for 0→10000 RPM over 360s
          duration: DURATION,
          repeat: -1,
          ease: "power1.in",
          onUpdate: () => {
            const now = Date.now();
            const elapsed = (now - cycleStartRef.current) / 1000;
            const t = Math.min(elapsed, DURATION);
            const currentRpm = Math.round((t / DURATION) * MAX_RPM);
            setRpm(currentRpm);

            // Detect threshold crossing for pulse
            const prev = prevRpmRef.current;
            for (const th of THRESHOLDS) {
              if (prev < th && currentRpm >= th) {
                setRpmPulse(true);
                setNarrationKey((k) => k + 1);
                setTimeout(() => setRpmPulse(false), 600);
                break;
              }
            }
            prevRpmRef.current = currentRpm;

            // Update orbit rotation (proportional to RPM)
            if (orbitRef.current) {
              const orbitDeg = (currentRpm / MAX_RPM) * 360 * 10; // Max 10 full rotations
              orbitRef.current.style.setProperty("--orbit-angle", `${orbitDeg}deg`);
            }

            // Show particles above 5000 RPM
            setShowParticles(currentRpm >= 5000);
          },
          onRepeat: () => {
            cycleStartRef.current = Date.now();
            setRpm(0);
            prevRpmRef.current = 0;
            setShowParticles(false);
          },
        });
      });

      cleanup = () => ctx.revert();
    });

    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full py-8 select-none">
      {/* RPM Display — above the Taiji, gold Song typeface */}
      <div className="text-center mb-2 pointer-events-none">
        <span
          className={`block text-4xl md:text-6xl leading-none font-black text-[#d4a853] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            rpmPulse ? "scale-125" : "scale-100"
          }`}
          style={{
            fontFamily: "var(--font-song), serif",
            textShadow: rpmPulse
              ? "0 0 80px rgba(212,168,83,0.7), 0 0 20px rgba(212,168,83,0.5), 0 2px 4px rgba(0,0,0,0.6)"
              : "0 0 40px rgba(212,168,83,0.35), 0 2px 4px rgba(0,0,0,0.6)",
            letterSpacing: "0.05em",
            transition: "text-shadow 0.3s ease, transform 0.3s ease",
          }}
        >
          {rpm.toLocaleString()}
        </span>
        <span
          className="block text-[10px] md:text-xs tracking-[0.5em] text-[#d4a853]/50 mt-1"
          style={{ fontFamily: "var(--font-song), serif" }}
        >
          RPM
        </span>
        {/* Narration — fades on threshold change */}
        <p
          key={narrationKey}
          className="text-xs md:text-sm text-[#d4a853]/60 mt-3 tracking-wider italic max-w-[320px] leading-relaxed animate-rpm-fade"
          style={{
            fontFamily: "var(--font-song), serif",
            textShadow: "0 0 20px rgba(212,168,83,0.2)",
          }}
        >
          {narration}
        </p>
      </div>

      <div className="relative w-[min(80vw,500px)] h-[min(80vw,500px)]">
        {/* Energy ring (visible at higher RPM) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: Math.min(1, rpm / 3000) * 0.3,
            transform: `rotate(var(--orbit-angle, 0deg))`,
            transition: "opacity 0.5s ease",
          }}>
          <div className="rounded-full border border-[#d4a853]/10"
            style={{ width: "min(55vw,340px)", height: "min(55vw,340px)" }} />
        </div>

        {/* Taiji SVG */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 200 200"
            className="w-[min(50vw,280px)] h-[min(50vw,280px)] drop-shadow-[0_0_60px_rgba(255,255,255,0.04)]"
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

          {/* Particle sparks — appear at high RPM */}
          {showParticles &&
            Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * 360;
              const delay = (i * 0.15) % 1.2;
              return (
                <span
                  key={i}
                  className="absolute w-1 h-1 rounded-full animate-particle-drift pointer-events-none"
                  style={{
                    top: "50%",
                    left: "50%",
                    backgroundColor: i % 2 === 0 ? "#d4a853" : "#fbbf24",
                    boxShadow:
                      i % 2 === 0
                        ? "0 0 6px #d4a853, 0 0 12px rgba(212,168,83,0.5)"
                        : "0 0 6px #fbbf24, 0 0 12px rgba(251,191,36,0.4)",
                    animationDelay: `${delay}s`,
                    animationDuration: `${1.2 + (i % 3) * 0.4}s`,
                    // Position around the taiji edge
                    transform: `rotate(${angle}deg) translateY(-140px)`,
                    transformOrigin: "0 140px",
                  }}
                />
              );
            })}
        </div>

        {/* Orbit domain icons — rotating container */}
        <div
          ref={orbitRef}
          className="absolute inset-0"
          style={{ transform: "rotate(var(--orbit-angle, 0deg))", transition: "none" }}
        >
        {domains.map((domain, i) => {
          const angle = (i * 60 - 90) * (Math.PI / 180);
          const radius = 42;

          return (
            <button
              key={domain.slug}
              data-slug={domain.slug}
              onClick={() => onSectorClick(domain.slug)}
              className="absolute transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-125 group"
              style={{
                left: `calc(50% + ${Math.cos(angle) * radius}%)`,
                top: `calc(50% + ${Math.sin(angle) * radius}%)`,
                transform: "translate(-50%, -50%) rotate(calc(-1 * var(--orbit-angle, 0deg)))",
              }}
              aria-label={domain.title[locale as "zh" | "en"]}
            >
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-2xl border flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-opacity-100 group-hover:scale-110"
                style={{
                  borderColor: `${domain.color}40`,
                  backgroundColor: `${domain.color}08`,
                  boxShadow: `0 0 20px ${domain.color}15, inset 0 1px 0 ${domain.color}20`,
                }}
              >
                <div
                  className="w-5 h-5 md:w-6 md:h-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
                  style={{ color: domain.color,
                    filter: "drop-shadow(0 0 3px transparent)",
                  }}
                >
                  <DomainIcon slug={domain.slug} />
                </div>
              </div>
              {/* Hover glow ring */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none"
                style={{
                  boxShadow: `0 0 30px ${domain.color}40, 0 0 60px ${domain.color}20`,
                }}
              />
              <div className="absolute left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] whitespace-nowrap bg-zinc-950/95 text-xs px-3 py-1.5 rounded-full border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)] pointer-events-none">
                {domain.title[locale as "zh" | "en"]}
              </div>
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
}
