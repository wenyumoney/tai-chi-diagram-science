"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

export default function NotFoundPage() {
  const locale = useLocale();

  return (
    <main className="min-h-[60dvh] flex flex-col items-center justify-center gap-4 pt-14">
      <div className="text-8xl md:text-9xl font-bold tracking-tighter bg-gradient-to-b from-zinc-500 to-zinc-800 bg-clip-text text-transparent">
        404
      </div>
      <h1 className="text-xl text-zinc-300">
        {locale === "zh" ? "页面未找到" : "Page Not Found"}
      </h1>
      <p className="text-sm text-zinc-500 max-w-xs text-center">
        {locale === "zh"
          ? "你探索的领域尚未被发现。"
          : "The domain you're exploring has not yet been discovered."}
      </p>
      <Link
        href={`/${locale}`}
        className="mt-4 px-4 py-2 rounded-lg border border-zinc-700 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors"
      >
        {locale === "zh" ? "返回首页" : "Back to Home"}
      </Link>
    </main>
  );
}
