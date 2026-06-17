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

  return (
    <button
      onClick={switchLocale}
      className="relative inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.96]"
    >
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          locale === "zh" ? "opacity-100" : "opacity-0"
        } bg-white/[0.04]`}
      />
      <span className="relative z-10">{locale === "zh" ? "EN" : "中文"}</span>
    </button>
  );
}
