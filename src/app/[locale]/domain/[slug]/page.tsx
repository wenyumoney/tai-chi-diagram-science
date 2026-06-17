import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { domains } from "@/data/domains";
import { getDomainBySlug } from "@/data/types";
import DomainHeroVisualization from "@/components/DomainHeroVisualization";

interface DetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ["zh", "en"]) {
    for (const domain of domains) {
      params.push({ locale, slug: domain.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: DetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const domain = getDomainBySlug(domains, slug);
  if (!domain) return { title: "Not Found" };
  return {
    title: domain.title[locale as "zh" | "en"],
    description: domain.tagline[locale as "zh" | "en"],
  };
}

export default async function DomainDetailPage({ params }: DetailPageProps) {
  const { locale, slug } = await params;
  const domain = getDomainBySlug(domains, slug);
  if (!domain) notFound();

  const messages = await getMessages();
  const t = (messages as Record<string, Record<string, string>>).domain;

  const prevDomain = domains.find((d) => d.order === domain.order - 1);
  const nextDomain = domains.find((d) => d.order === domain.order + 1);

  const l = locale as "zh" | "en";

  return (
    <main className="min-h-[100dvh] pb-24">
      {/* Back link — floating above hero */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-6">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors duration-300 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-300">←</span>
          {t.backToHome}
        </Link>
      </div>

      {/* Hero visualization */}
      <DomainHeroVisualization slug={slug} locale={locale} />

      {/* Title + tagline — with double-bezel pill accent */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-6 pb-2">
        {/* Eyebrow */}
        <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border mb-4"
          style={{ borderColor: `${domain.color}30`, color: domain.color, backgroundColor: `${domain.color}08` }}>
          {locale === "zh" ? `领域 0${domain.order}` : `Domain 0${domain.order}`}
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-none mb-4 text-zinc-100">
          {domain.title[l]}
        </h1>
        <p className="text-base md:text-lg text-zinc-500 max-w-[60ch] leading-relaxed">
          {domain.tagline[l]}
        </p>
      </div>

      {/* Content sections — Double-Bezel containers */}
      <article className="max-w-5xl mx-auto px-4 md:px-6 mt-12 space-y-10">
        {/* Overview */}
        <section className="rounded-[2rem] p-[1px] bg-white/[0.03]">
          <div className="rounded-[calc(2rem-1px)] p-6 md:p-8 bg-[#0c0c0f] border border-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: domain.color }} />
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
                {t.overview}
              </h2>
            </div>
            <div className="space-y-4">
              {domain.overview[l].split("\n\n").map((p, i) => (
                <p key={i} className="text-zinc-300 leading-relaxed text-[15px]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Taiji Connections — grid with individual Double-Bezel cards */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: domain.color }} />
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
              {t.taijiConnection}
            </h2>
          </div>
          <div className="grid gap-3">
            {domain.taijiConnections.map((conn, i) => (
              <div
                key={i}
                className="rounded-2xl p-[1px] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-500"
              >
                <div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.03]">
                  <span
                    className="text-[10px] font-mono font-medium mr-3 opacity-40"
                    style={{ color: domain.color }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-zinc-200 text-sm inline leading-relaxed">
                    {conn.point[l]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Examples */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: domain.color }} />
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
              {t.keyExamples}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {domain.keyExamples.map((ex, i) => (
              <div
                key={i}
                className="rounded-2xl p-[1px] bg-white/[0.02] hover:bg-white/[0.05] transition-colors duration-500"
              >
                <div className="h-full rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.03]">
                  <h3 className="text-sm font-semibold mb-2 text-zinc-100">
                    {ex.title[l]}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {ex.description[l]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Taiji Comparison — side by side with superior visual */}
        <section className="rounded-[2rem] p-[1px] bg-white/[0.03]">
          <div className="rounded-[calc(2rem-1px)] p-6 md:p-8 bg-[#0c0c0f] border border-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: domain.color }} />
              <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
                {t.visualComparison}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {domain.taijiComparison.map((comp, i) => (
                <div key={i} className="rounded-xl bg-[#0a0a0d] border border-white/[0.04] p-5">
                  <div className="flex items-center gap-3 mb-3">
                    {/* Mini Taiji icon */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" style={{ color: domain.color }}>
                      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                      <path d="M12 1a11 11 0 0 0 0 22 5.5 5.5 0 0 1 0-11 5.5 5.5 0 0 0 0-11" fill="currentColor" opacity="0.15" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: domain.color }}>
                      {locale === "zh" ? "太极" : "Taiji"}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed mb-4 pl-8">
                    {comp.taijiAspect[l]}
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" style={{ color: domain.color }}>
                      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="12" y1="1" x2="12" y2="9" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                      <line x1="12" y1="15" x2="12" y2="23" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                      <line x1="1" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                      <line x1="15" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {locale === "zh" ? "科学" : "Science"}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed pl-8">
                    {comp.scienceAspect[l]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* References */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: domain.color }} />
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
              {t.references}
            </h2>
          </div>
          <ol className="space-y-2">
            {domain.references.map((ref, i) => (
              <li key={i} className="group flex items-start gap-3">
                <span className="text-[10px] font-mono text-zinc-600 mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300 underline underline-offset-2 decoration-zinc-700 hover:decoration-zinc-500"
                >
                  {ref.title}
                </a>
                <span className="text-[10px] text-zinc-600 font-mono shrink-0 mt-0.5">
                  [{ref.type}]
                </span>
              </li>
            ))}
          </ol>
        </section>
      </article>

      {/* Bottom navigation — floating pill style */}
      <nav className="max-w-5xl mx-auto px-4 md:px-6 mt-20">
        <div className="flex items-center justify-between rounded-full p-[1px] bg-white/[0.03]">
          <div className="flex items-center justify-between w-full rounded-full px-6 py-4 bg-[#0c0c0f] border border-white/[0.03]">
            {prevDomain ? (
              <Link
                href={`/${locale}/domain/${prevDomain.slug}`}
                className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-sm transition-colors duration-300"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                <span className="hidden sm:inline">{prevDomain.title[l]}</span>
                <span className="sm:hidden">{t.previousDomain}</span>
              </Link>
            ) : (
              <span className="text-zinc-700 text-sm" aria-disabled="true">
                {t.previousDomain}
              </span>
            )}

            <Link
              href={`/${locale}/panorama`}
              className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors duration-300"
            >
              {t.viewPanorama}
            </Link>

            {nextDomain ? (
              <Link
                href={`/${locale}/domain/${nextDomain.slug}`}
                className="group flex items-center gap-2 text-zinc-500 hover:text-zinc-200 text-sm transition-colors duration-300"
              >
                <span className="hidden sm:inline">{nextDomain.title[l]}</span>
                <span className="sm:hidden">{t.nextDomain}</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            ) : (
              <span className="text-zinc-700 text-sm" aria-disabled="true">
                {t.nextDomain}
              </span>
            )}
          </div>
        </div>
      </nav>
    </main>
  );
}
