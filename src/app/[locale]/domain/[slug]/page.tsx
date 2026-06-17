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

  // Prev/next
  const prevDomain = domains.find((d) => d.order === domain.order - 1);
  const nextDomain = domains.find((d) => d.order === domain.order + 1);

  const l = locale as "zh" | "en";

  return (
    <main className="min-h-[100dvh] pt-14 pb-16">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
        <Link
          href={`/${locale}`}
          className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
        >
          ← {t.backToHome}
        </Link>
      </div>

      {/* Hero visualization */}
      <DomainHeroVisualization slug={slug} locale={locale} />

      {/* Title + tagline */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-6">
        <h1
          className="text-3xl md:text-5xl tracking-tighter leading-none mb-3"
          style={{ color: domain.color }}
        >
          {domain.title[l]}
        </h1>
        <p className="text-lg text-zinc-400">{domain.tagline[l]}</p>
      </div>

      {/* Content sections */}
      <article className="max-w-4xl mx-auto px-4 md:px-6 mt-10 space-y-12">
        {/* Overview */}
        <section>
          <h2
            className="text-lg font-semibold mb-4 pb-2 border-b border-zinc-800"
            style={{ borderColor: `${domain.color}40` }}
          >
            {t.overview}
          </h2>
          <div className="prose prose-invert prose-zinc max-w-none">
            {domain.overview[l].split("\n\n").map((p, i) => (
              <p key={i} className="text-zinc-300 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Taiji Connections */}
        <section>
          <h2
            className="text-lg font-semibold mb-4 pb-2 border-b border-zinc-800"
            style={{ borderColor: `${domain.color}40` }}
          >
            {t.taijiConnection}
          </h2>
          <div className="grid gap-3">
            {domain.taijiConnections.map((conn, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-zinc-800 bg-[#18181b]/30"
              >
                <p className="text-zinc-200 text-sm">{conn.point[l]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Key Examples */}
        <section>
          <h2
            className="text-lg font-semibold mb-4 pb-2 border-b border-zinc-800"
            style={{ borderColor: `${domain.color}40` }}
          >
            {t.keyExamples}
          </h2>
          <div className="grid gap-4">
            {domain.keyExamples.map((ex, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-zinc-800 bg-[#18181b]/50"
              >
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ color: domain.color }}
                >
                  {ex.title[l]}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {ex.description[l]}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Taiji Comparison */}
        <section>
          <h2
            className="text-lg font-semibold mb-4 pb-2 border-b border-zinc-800"
            style={{ borderColor: `${domain.color}40` }}
          >
            {t.visualComparison}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {domain.taijiComparison.map((comp, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-zinc-800 bg-[#18181b]/30"
              >
                <div
                  className="text-xs font-semibold mb-2 uppercase tracking-wider"
                  style={{ color: domain.color }}
                >
                  太极
                </div>
                <p className="text-sm text-zinc-200 mb-3">
                  {comp.taijiAspect[l]}
                </p>
                <div className="text-xs font-semibold mb-2 uppercase tracking-wider text-zinc-500">
                  {locale === "zh" ? "科学" : "Science"}
                </div>
                <p className="text-sm text-zinc-400">{comp.scienceAspect[l]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* References */}
        <section>
          <h2
            className="text-lg font-semibold mb-4 pb-2 border-b border-zinc-800"
            style={{ borderColor: `${domain.color}40` }}
          >
            {t.references}
          </h2>
          <ol className="space-y-2">
            {domain.references.map((ref, i) => (
              <li key={i} className="text-sm">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-zinc-200 transition-colors underline underline-offset-2"
                >
                  {ref.title}
                </a>
                <span className="text-zinc-600 ml-2 text-xs">
                  [{ref.type}]
                </span>
              </li>
            ))}
          </ol>
        </section>
      </article>

      {/* Bottom navigation */}
      <nav className="max-w-4xl mx-auto px-4 md:px-6 mt-16 flex justify-between">
        {prevDomain ? (
          <Link
            href={`/${locale}/domain/${prevDomain.slug}`}
            className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
          >
            {t.previousDomain}
          </Link>
        ) : (
          <span className="text-zinc-700 text-sm" aria-disabled="true">
            {t.previousDomain}
          </span>
        )}

        <Link
          href={`/${locale}/panorama`}
          className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
        >
          {t.viewPanorama}
        </Link>

        {nextDomain ? (
          <Link
            href={`/${locale}/domain/${nextDomain.slug}`}
            className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
          >
            {t.nextDomain}
          </Link>
        ) : (
          <span className="text-zinc-700 text-sm" aria-disabled="true">
            {t.nextDomain}
          </span>
        )}
      </nav>
    </main>
  );
}
