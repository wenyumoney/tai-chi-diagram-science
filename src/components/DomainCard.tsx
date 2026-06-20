"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import type { DomainContent } from "@/data/types";

interface DomainCardProps {
  domain: Pick<
    DomainContent,
    "slug" | "order" | "icon" | "title" | "tagline" | "color"
  >;
  locale: string;
  href: string;
  index: number;
  visited?: boolean;
}

export default function DomainCard({ domain, locale, href, index, visited }: DomainCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [glowPos, setGlowPos] = useState<{ x: number; y: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!cardRef.current || isMobile) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;   // 0..1
      const y = (e.clientY - rect.top) / rect.height;    // 0..1
      // 3D tilt: offset from center, max ±8°
      setTilt({
        rx: (y - 0.5) * -16,
        ry: (x - 0.5) * 16,
      });
      setGlowPos({ x: x * 100, y: y * 100 });
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setGlowPos(null);
  }, []);

  const t = domain.title[locale as "zh" | "en"];
  const tagline = domain.tagline[locale as "zh" | "en"];

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="domain-card group block rounded-[2rem] p-[1.5px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.99] relative overflow-visible"
      style={{
        transform: isMobile
          ? undefined
          : `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: "transform 0.5s cubic-bezier(0.32,0.72,0,1)",
        animation: `domain-float 5s ease-in-out infinite`,
        animationDelay: `${index * 0.6}s`,
        background: glowPos
          ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${domain.color}35, ${domain.color}10 40%, transparent 70%)`
          : `${domain.color}10`,
      }}
    >
      {/* Visited indicator */}
      {visited && (
        <span className="absolute -top-1 -right-1 z-30 w-3 h-3 rounded-full bg-amber-400 ring-2 ring-[#09090b]" title={locale === "zh" ? "已读" : "Visited"} />
      )}
      {/* Gloss sweep overlay */}
      {!isMobile && (
        <span className="absolute inset-0 rounded-[2rem] pointer-events-none z-20 opacity-0 group-hover:opacity-100 overflow-hidden"
          style={{ transition: "opacity 0.5s ease" }}>
          <span
            className="card-gloss absolute top-0 left-0 w-[60%] h-full rounded-[2rem]"
            style={{
              background: `linear-gradient(105deg, transparent 30%, ${domain.color}12 50%, transparent 70%)`,
            }}
          />
        </span>
      )}

      {/* Inner core */}
      <div className="h-full rounded-[calc(2rem-1.5px)] p-6 bg-[#0c0c0f] border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
        {/* Ambient inner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${glowPos?.x ?? 50}% ${glowPos?.y ?? 50}%, ${domain.color}08 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10">
          {/* Order number + icon */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[10px] font-mono font-medium w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_12px]"
              style={{
                borderColor: `${domain.color}30`,
                color: domain.color,
                backgroundColor: `${domain.color}08`,
              }}
            >
              {String(domain.order).padStart(2, "0")}
            </span>
            <span
              className="text-lg transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
              dangerouslySetInnerHTML={{ __html: domain.icon }}
            />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-zinc-100 mb-2 tracking-tight leading-tight group-hover:translate-x-1 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
            {t}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
            {tagline}
          </p>

          {/* Explore CTA */}
          <div className="mt-5 flex items-center gap-2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-2 group-hover:translate-y-0">
            <span style={{ color: domain.color }}>
              {locale === "zh" ? "探索" : "Explore"}
            </span>
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{ backgroundColor: `${domain.color}15`, color: domain.color }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7l6-6M1 1h6v6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
