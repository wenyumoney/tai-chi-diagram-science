"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import type { DomainContent } from "@/data/types";

interface DomainCardProps {
  domain: Pick<
    DomainContent,
    "slug" | "order" | "icon" | "title" | "tagline" | "color"
  >;
  locale: string;
  href: string;
}

export default function DomainCard({ domain, locale, href }: DomainCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [glowPos, setGlowPos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setGlowPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
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
      className="group block rounded-[2rem] p-[1.5px] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.01] active:scale-[0.99]"
      style={{
        background: glowPos
          ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${domain.color}30, ${domain.color}10 40%, transparent 70%)`
          : `${domain.color}10`,
      }}
    >
      {/* Inner core — Double-Bezel */}
      <div className="h-full rounded-[calc(2rem-1.5px)] p-6 bg-[#0c0c0f] border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] relative overflow-hidden transition-all duration-500">
        {/* Ambient inner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at ${glowPos?.x ?? 50}% ${glowPos?.y ?? 50}%, ${domain.color}06 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10">
          {/* Order number + icon */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[10px] font-mono font-medium w-6 h-6 rounded-full flex items-center justify-center border"
              style={{
                borderColor: `${domain.color}30`,
                color: domain.color,
                backgroundColor: `${domain.color}08`,
              }}
            >
              {String(domain.order).padStart(2, "0")}
            </span>
            <span
              className="text-lg"
              dangerouslySetInnerHTML={{ __html: domain.icon }}
            />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-zinc-100 mb-2 tracking-tight leading-tight">
            {t}
          </h3>

          {/* Tagline */}
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">
            {tagline}
          </p>

          {/* Explore CTA — Button-in-Button */}
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
