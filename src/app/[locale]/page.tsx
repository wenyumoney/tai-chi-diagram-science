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
      {/* Hero section with Taiji */}
      <section className="relative flex flex-col items-center pt-8 pb-4">
        <h1 className="text-2xl md:text-4xl tracking-tighter leading-none text-zinc-100 mb-2">
          {t("siteTitle")}
        </h1>
        <p className="text-sm md:text-base text-zinc-400 mb-2">
          {t("siteSubtitle")}
        </p>
        <TaijiDiagram
          domains={taijiDomainInfos}
          onSectorClick={(slug) => router.push(`/${locale}/domain/${slug}`)}
          locale={locale}
        />
      </section>

      {/* Card Gallery */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
        <h2 className="text-xl md:text-2xl tracking-tight text-zinc-200 mb-6 md:mb-8">
          {t("cardGallery")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 md:gap-6">
          {domainInfos.map((domain) => (
            <DomainCard
              key={domain.slug}
              domain={domain}
              locale={locale}
              href={`/${locale}/domain/${domain.slug}`}
            />
          ))}
        </div>

        {/* Panorama link */}
        <div className="mt-8 md:mt-12 text-center">
          <Link
            href={`/${locale}/panorama`}
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors text-sm"
          >
            {t("explorePanorama")}
          </Link>
        </div>
      </section>
    </main>
  );
}
