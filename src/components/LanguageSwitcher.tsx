"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === "zh" ? "en" : "zh";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  const isZh = locale === "zh";

  return (
    <button
      onClick={switchLocale}
      aria-label={isZh ? "Switch to English" : "切换到中文"}
      className="relative inline-flex items-center gap-1.5 rounded-full p-0.5 text-xs font-medium tracking-wide text-zinc-400 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
    >
      {/* Active: ZH label */}
      <span
        className={`relative px-2.5 py-1 rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isZh ? "bg-white/[0.06] text-amber-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" : "hover:text-zinc-300"
        }`}
      >
        中文
      </span>
      {/* Active: EN label */}
      <span
        className={`relative px-2.5 py-1 rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          !isZh ? "bg-white/[0.06] text-amber-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]" : "hover:text-zinc-300"
        }`}
      >
        EN
      </span>
    </button>
  );
}
