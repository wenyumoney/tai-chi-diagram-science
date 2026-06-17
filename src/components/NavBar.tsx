"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function NavBar() {
  const t = useTranslations("nav");
  const th = useTranslations("home");
  const locale = useLocale();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-[#09090b]/80 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-zinc-200 font-semibold tracking-tight text-sm"
        >
          {th("siteTitle")}
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/panorama`}
            className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
          >
            {t("panorama")}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
