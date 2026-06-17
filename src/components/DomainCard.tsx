import Link from "next/link";
import type { DomainContent } from "@/data/types";

interface DomainCardProps {
  domain: Pick<DomainContent, "slug" | "order" | "icon" | "title" | "tagline" | "color">;
  locale: string;
  href: string;
}

export default function DomainCard({ domain, locale, href }: DomainCardProps) {
  const t = domain.title[locale as "zh" | "en"];
  const tagline = domain.tagline[locale as "zh" | "en"];

  return (
    <Link
      href={href}
      className="group block rounded-2xl p-6 border border-zinc-800 bg-[#18181b]/50 hover:scale-[1.02] transition-all duration-300 overflow-hidden relative"
      style={{
        borderColor: `${domain.color}30`,
      }}
    >
      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl pointer-events-none"
        style={{ backgroundColor: domain.color }}
      />

      <div className="relative z-10">
        {/* Order number + icon */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-mono w-6 h-6 rounded-full flex items-center justify-center border"
            style={{
              borderColor: domain.color,
              color: domain.color,
            }}
          >
            {domain.order}
          </span>
          <span
            className="text-lg"
            dangerouslySetInnerHTML={{ __html: domain.icon }}
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-zinc-100 mb-2 tracking-tight">
          {t}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
          {tagline}
        </p>

        {/* Arrow indicator */}
        <div
          className="mt-4 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1"
          style={{ color: domain.color }}
        >
          {locale === "zh" ? "探索 →" : "Explore →"}
        </div>
      </div>
    </Link>
  );
}
