"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function NotFoundPage() {
  const locale = useLocale();

  return (
    <main className="min-h-[100dvh] flex items-center justify-center px-4">
      <div className="rounded-[2rem] p-[1px] bg-white/[0.03]">
        <div className="rounded-[calc(2rem-1px)] p-8 md:p-12 bg-[#0c0c0f] border border-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] flex flex-col items-center text-center max-w-md">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-[#d4a853]/30 text-[#d4a853] bg-[#d4a853]/[0.06] mb-6">
            404
          </div>

          {/* Flat text, no gradient */}
          <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-zinc-100 mb-4">
            404
          </h1>

          <p className="text-xl text-zinc-300 mb-2">
            {locale === "zh" ? "页面未找到" : "Page Not Found"}
          </p>

          <p className="text-sm text-zinc-500 max-w-xs mb-8">
            {locale === "zh"
              ? "你探索的领域尚未被发现。"
              : "The domain you're exploring has not yet been discovered."}
          </p>

          {/* Pill button with Button-in-Button trailing icon */}
          <Link
            href={`/${locale}`}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
          >
            <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              {locale === "zh" ? "返回首页" : "Back to Home"}
            </span>
            <span className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500 group-hover:text-zinc-300">
                <path d="M3 9l6-6M3 3h6v6" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
