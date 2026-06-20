"use client";

import { getComparisonVisualization } from "./domain-visualizations/registry";

interface DomainComparisonVisualsProps {
  slug: string;
  locale: string;
}

export default function DomainComparisonVisuals({
  slug,
  locale,
}: DomainComparisonVisualsProps) {
  const Comp = getComparisonVisualization(slug);

  if (!Comp) {
    return (
      <div className="text-center py-8">
        <p className="text-zinc-600 text-xs">
          {locale === "zh"
            ? "更多可视化正在开发中..."
            : "More visualizations coming soon..."}
        </p>
      </div>
    );
  }

  return <Comp locale={locale} />;
}
