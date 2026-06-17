"use client";

import { getVisualization } from "./domain-visualizations/registry";

interface DomainHeroVisualizationProps {
  slug: string;
  locale: string;
}

export default function DomainHeroVisualization({
  slug,
  locale,
}: DomainHeroVisualizationProps) {
  const VizComponent = getVisualization(slug);

  if (VizComponent) {
    return (
      <section className="min-h-[50dvh] flex items-center justify-center">
        <VizComponent locale={locale} />
      </section>
    );
  }

  // Static fallback
  return (
    <section className="min-h-[30dvh] flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 opacity-50">
          <svg
            viewBox="0 0 100 100"
            className="w-20 h-20 mx-auto"
            style={{ opacity: 0.3 }}
          >
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" />
            <path
              d="M50,2 A48,48 0 0,0 50,98 A24,24 0 0,1 50,50 A24,24 0 0,0 50,2"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className="text-zinc-600 text-sm">
          {locale === "zh" ? "可视化开发中..." : "Visualization in development..."}
        </p>
      </div>
    </section>
  );
}
