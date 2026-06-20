"use client";

import { useTranslations } from "next-intl";

export default function TaijiIntro() {
  const t = useTranslations("intro");

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">
      <div className="rounded-[2rem] p-[1px] bg-white/[0.03]">
        <div className="rounded-[calc(2rem-1px)] p-8 md:p-12 bg-[#0c0c0f] border border-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
          {/* Section eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4a853]" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
              {t("sectionTitle")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Column 1: What it looks like */}
            <div className="space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4">
                {/* Mini Taiji SVG */}
                <svg viewBox="0 0 32 32" className="w-6 h-6 text-[#d4a853]">
                  <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  <path d="M16 1a15 15 0 0 0 0 30 7.5 7.5 0 0 1 0-15 7.5 7.5 0 0 0 0-15" fill="currentColor" opacity="0.4" />
                  <circle cx="16" cy="8" r="1.5" fill="currentColor" />
                  <circle cx="16" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-zinc-200 tracking-tight">
                {t("col1Title")}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t("col1Body")}
              </p>
            </div>

            {/* Column 2: What it means */}
            <div className="space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4">
                <span className="text-xl">☯</span>
              </div>
              <h3 className="text-base font-semibold text-zinc-200 tracking-tight">
                {t("col2Title")}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t("col2Body")}
              </p>
            </div>

            {/* Column 3: Why science */}
            <div className="space-y-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.03] border border-white/[0.06] mb-4">
                <span className="text-xl">⚛</span>
              </div>
              <h3 className="text-base font-semibold text-zinc-200 tracking-tight">
                {t("col3Title")}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t("col3Body")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
