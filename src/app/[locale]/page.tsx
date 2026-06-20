"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import TaijiDiagram from "@/components/TaijiDiagram";
import DomainCard from "@/components/DomainCard";
import FeedbackSection from "@/components/FeedbackSection";
import TaijiIntro from "@/components/TaijiIntro";
import { domains } from "@/data/domains";
import { getVisitedDomains, getLastVisitedDomain, getProgress } from "@/lib/progress-store";
import Link from "next/link";

export default function HomePage() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("home");
  const tReading = useTranslations("readingPath");
  const tQuiz = useTranslations("quiz");
  const mainRef = useRef<HTMLDivElement>(null);
  const isZh = locale === "zh";
  const [visitedSlugs, setVisitedSlugs] = useState<string[]>([]);
  const [lastVisited, setLastVisited] = useState<string | null>(null);
  const [progress, setProgress] = useState({ visited: 0, total: 11 });

  // Read progress from localStorage on mount
  useEffect(() => {
    setVisitedSlugs(getVisitedDomains());
    setLastVisited(getLastVisitedDomain());
    setProgress(getProgress());
  }, []);

  // Refresh progress on visibility change (user may visit domains in other tabs)
  useEffect(() => {
    const handler = () => {
      setVisitedSlugs(getVisitedDomains());
      setLastVisited(getLastVisitedDomain());
      setProgress(getProgress());
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

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

  // Split title text for character/word animation
  const titleFragments = useMemo(() => {
    const raw = t("siteTitle");
    if (isZh) {
      // Chinese: split by character, keep spaces as-is
      return [...raw].map((ch) => (ch === " " ? " " : ch));
    }
    // English: split by word
    return raw.split(/(\s+)/).filter(Boolean);
  }, [t, isZh]);

  // GSAP entrance animation
  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = mainRef.current;
    if (!container) return;

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // 1. Decorative line extends
        tl.fromTo(
          ".hero-line",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.3, duration: 0.5, transformOrigin: "left center" },
          0
        );

        // 2. Eyebrow badge fades in + slides up
        tl.fromTo(
          ".hero-badge",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.45 },
          0.15
        );

        // 3. Title characters stagger up
        tl.fromTo(
          ".hero-char",
          { opacity: 0, y: 28, rotateX: -8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.55,
            stagger: { each: 0.04, from: "start" },
            ease: "back.out(1.4)",
          },
          0.35
        );

        // 4. Subtitle fades in
        tl.fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
          0.85
        );

        // 5. Nav pills pop in
        tl.fromTo(
          ".hero-pill",
          { opacity: 0, scale: 0.7, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.45,
            stagger: { each: 0.1, from: "start" },
            ease: "back.out(2)",
          },
          1.05
        );

        // 6. Gallery cards stagger in
        tl.fromTo(
          ".domain-card",
          { opacity: 0, y: 40, rotateX: 4 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: { each: 0.12, from: "start" },
            ease: "back.out(1.4)",
          },
          1.4
        );
      }, container);
      return () => ctx.revert();
    });
  }, []);

  return (
    <main ref={mainRef} className="min-h-[100dvh]">
      {/* Hero — Asymmetric Split: left text + right Taiji */}
      <section className="relative max-w-7xl mx-auto px-4 md:px-6 pt-28 md:pt-40 pb-8 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 items-center">
          {/* Left: Text block */}
          <div className="order-2 md:order-1">
            {/* Decorative accent line */}
            <div className="flex items-center gap-3 mb-6">
              <span className="hero-line h-px w-12 bg-gradient-to-r from-transparent via-[#d4a853]/40 to-[#d4a853]/20 rounded-full" />
              {/* Eyebrow badge */}
              <span className="hero-badge inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-[#d4a853]/20 bg-[#d4a853]/[0.04] text-[#d4a853]">
                {isZh ? "阴阳哲学" : "Yin-Yang Philosophy"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.05] text-zinc-100 mb-5">
              {titleFragments.map((frag, i) => (
                <span
                  key={i}
                  className="hero-char inline-block"
                  style={{ whiteSpace: frag === " " ? "pre" : undefined }}
                >
                  {frag}
                </span>
              ))}
            </h1>
            <p className="hero-subtitle text-sm md:text-base text-zinc-500 leading-relaxed max-w-[48ch] mb-8">
              {t("siteSubtitle")}
            </p>

            {/* Quick nav pills */}
            <div className="flex flex-wrap gap-2">
              {domains.slice(0, 3).map((d) => (
                <button
                  key={d.slug}
                  onClick={() => router.push(`/${locale}/domain/${d.slug}`)}
                  className="hero-pill px-4 py-2 rounded-full text-xs font-medium border border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97]"
                >
                  {d.title[locale as "zh" | "en"]}
                </button>
              ))}
              <span className="hero-pill px-4 py-2 text-xs text-zinc-600 flex items-center">
                +{domains.length - 3} {isZh ? "更多" : "more"}
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

      {/* Taiji Intro — What is the Taiji Diagram? */}
      <TaijiIntro />

      {/* Card Gallery — with stagger animation */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        {/* Section eyebrow */}
        <div className="flex items-center gap-4 mb-4 md:mb-6">
          <span className="h-px flex-1 bg-white/[0.04]" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-500">
            {t("cardGallery")}
          </span>
          <span className="h-px flex-1 bg-white/[0.04]" />
        </div>

        {/* Suggested reading path */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 md:mb-8">
          <div className="flex items-center gap-2 text-[10px] text-zinc-600">
            <span className="uppercase tracking-[0.15em] font-medium">{tReading("suggestedPath")}</span>
            <span className="flex items-center gap-1">
              {domainInfos.slice(0, 6).map((d) => (
                <span
                  key={d.slug}
                  className={`w-5 h-5 rounded-full border text-[9px] flex items-center justify-center transition-colors duration-300 ${
                    visitedSlugs.includes(d.slug)
                      ? "border-amber-400/40 bg-amber-400/[0.08] text-amber-400"
                      : "border-zinc-800 text-zinc-600"
                  }`}
                  title={`${d.title[locale as "zh" | "en"]}${visitedSlugs.includes(d.slug) ? ` (${tReading("visited")})` : ""}`}
                >
                  {String(d.order).padStart(2, "0")}
                </span>
              ))}
            </span>
            <span className="text-zinc-700 ml-1 hidden sm:inline">···</span>
            <span className="sm:flex items-center gap-1 hidden">
              {domainInfos.slice(6).map((d) => (
                <span
                  key={d.slug}
                  className={`w-5 h-5 rounded-full border text-[9px] flex items-center justify-center transition-colors duration-300 ${
                    visitedSlugs.includes(d.slug)
                      ? "border-amber-400/40 bg-amber-400/[0.08] text-amber-400"
                      : "border-zinc-800 text-zinc-600"
                  }`}
                  title={`${d.title[locale as "zh" | "en"]}${visitedSlugs.includes(d.slug) ? ` (${tReading("visited")})` : ""}`}
                >
                  {String(d.order).padStart(2, "0")}
                </span>
              ))}
            </span>
          </div>

          {/* Continue reading / Cumulative quiz links */}
          {lastVisited && (
            <Link
              href={`/${locale}/domain/${lastVisited}`}
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors duration-300"
            >
              <span className="w-1 h-1 rounded-full bg-amber-400" />
              {tReading("continueReading")}
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4 md:gap-6 gallery-grid">
          {domainInfos.map((domain, index) => (
            <DomainCard
              key={domain.slug}
              domain={domain}
              locale={locale}
              href={`/${locale}/domain/${domain.slug}`}
              index={index}
              visited={visitedSlugs.includes(domain.slug)}
            />
          ))}
        </div>

        {/* Panorama + Cumulative Quiz links */}
        <div className="mt-12 md:mt-16 text-center flex flex-col items-center gap-4">
          <Link
            href={`/${locale}/panorama`}
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              {t("explorePanorama")}
            </span>
            <span className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-500 group-hover:text-zinc-300">
                <path d="M3 9l6-6M3 3h6v6" />
              </svg>
            </span>
          </Link>
          {progress.visited > 0 && (
            <Link
              href={`/${locale}/quiz`}
              className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-amber-400 transition-colors duration-500"
            >
              <span className="w-1 h-1 rounded-full bg-amber-400/50" />
              {tQuiz("takeCumulative")}
            </Link>
          )}
        </div>
      </section>

      {/* Feedback section */}
      <section className="py-16 md:py-20">
        <FeedbackSection locale={locale} />
      </section>
    </main>
  );
}
