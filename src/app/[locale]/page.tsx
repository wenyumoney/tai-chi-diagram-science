"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import TaijiDiagram from "@/components/TaijiDiagram";
import DomainCard from "@/components/DomainCard";
import { domains } from "@/data/domains";
import Link from "next/link";

export default function HomePage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("home");

  const domainInfos = domains.map((d) => ({
    slug: d.slug,
    order: d.order,
    icon: d.icon,
    title: d.title,
    tagline: d.tagline,
    color: d.color,
  }));

  const taijiDomainInfos = domains.map((d) => ({
    slug: d.slug,
    title: d.title,
    color: d.color,
  }));

  return (
    <main className="min-h-[100dvh]">
      {/* Hero — Asymmetric Split: left text + right Taiji */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-40 pb-8 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 items-center">
          {/* Left: Text block — left-aligned per ANTI-CENTER BIAS */}
          <div className="order-2 md:order-1">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-white/[0.06] bg-white/[0.02] text-zinc-400 mb-6">
              {locale === "zh" ? "阴阳哲学" : "Yin-Yang Philosophy"}
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-none text-zinc-100 mb-4">
              {t("siteTitle")}
            </h1>
            <p className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-[48ch] mb-8">
              {t("siteSubtitle")}
            </p>

            {/* Quick nav pills */}
            <div className="flex flex-wrap gap-2">
              {domains.slice(0, 3).map((d) => (
                <button
                  key={d.slug}
                  onClick={() => router.push(`/${locale}/domain/${d.slug}`)}
                  className="px-4 py-2 rounded-full text-xs font-medium border border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                >
                  {d.title[locale as "zh" | "en"]}
                </button>
              ))}
              <span className="px-4 py-2 text-xs text-zinc-600 flex items-center">
                +3 {locale === "zh" ? "更多" : "more"}
              </span>
            </div>
          </div>

          {/* Right: Taiji Diagram */}
          <div className="order-1 md:order-2 flex items-center justify-center">
            <TaijiDiagram
              domains={taijiDomainInfos}
              onSectorClick={(slug) => router.push(`/${locale}/domain/${slug}`)}
              locale={locale}
            />
          </div>
        </div>
      </section>

      {/* Card Gallery — with stagger animation */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Section eyebrow */}
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <span className="h-px flex-1 bg-white/[0.04]" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500">
            {t("cardGallery")}
          </span>
          <span className="h-px flex-1 bg-white/[0.04]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 md:gap-6 animate-fade-up-stagger">
          {domainInfos.map((domain) => (
            <DomainCard
              key={domain.slug}
              domain={domain}
              locale={locale}
              href={`/${locale}/domain/${domain.slug}`}
            />
          ))}
        </div>

        {/* Panorama link — refined pill */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            href={`/${locale}/panorama`}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors duration-500">
              {t("explorePanorama")}
            </span>
            {/* Button-in-Button trailing icon */}
            <span className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500 group-hover:text-zinc-300">
                <path d="M3 9l6-6M3 3h6v6" />
              </svg>
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}
