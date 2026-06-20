"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { quizQuestions } from "@/data/quiz-questions";
import { domains } from "@/data/domains";
import QuizCard from "@/components/QuizCard";

interface CumulativeQuizProps {
  locale: string;
}

// Mulberry32 seeded PRNG — deterministic across SSR/CSR, prevents hydration mismatch
function seededRandom(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Deterministic daily question selection — same questions for everyone on a given day
function getDailySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// Pick one random question per domain that has quiz questions
function pickQuestions(): { slug: string; question: (typeof quizQuestions[string])[0] }[] {
  const random = seededRandom(getDailySeed());
  const picked: { slug: string; question: (typeof quizQuestions[string])[0] }[] = [];
  for (const domain of domains) {
    const qs = quizQuestions[domain.slug];
    if (qs && qs.length > 0) {
      const randomIndex = Math.floor(random() * qs.length);
      picked.push({ slug: domain.slug, question: qs[randomIndex] });
    }
  }
  return picked;
}

export default function CumulativeQuiz({ locale }: CumulativeQuizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("quiz");
  const isZh = locale === "zh";

  const [questions] = useState(() => pickQuestions());
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [quizKey, setQuizKey] = useState(0);

  const handleAnswer = useCallback((correct: boolean) => {
    if (correct) setCorrectCount((c) => c + 1);
    setAnsweredCount((c) => c + 1);
  }, []);

  const handleStartOver = () => {
    setCorrectCount(0);
    setAnsweredCount(0);
    setQuizKey((k) => k + 1);
  };

  const allAnswered = answeredCount >= questions.length;

  // GSAP stagger entry
  useEffect(() => {
    if (typeof window === "undefined") return;
    const container = containerRef.current;
    if (!container) return;

    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".quiz-card",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: { each: 0.08, from: "start" },
            ease: "power2.out",
          }
        );
      }, container);
      return () => ctx.revert();
    });
  }, [quizKey]);

  return (
    <section ref={containerRef} className="max-w-5xl mx-auto px-4 md:px-6">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
          {t("cumulativeTitle")}
        </h2>
      </div>
      <p className="text-xs text-zinc-600 mb-8 leading-relaxed max-w-[56ch]">
        {t("cumulativeDescription")}
      </p>

      <div className="space-y-4" key={quizKey}>
        {questions.map((item, i) => {
          const domain = domains.find((d) => d.slug === item.slug);
          return (
            <div key={`${item.slug}-${item.question.id}`}>
              {/* Domain label */}
              <div className="flex items-center gap-2 mb-2 ml-1">
                <span
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: domain?.color ?? "#d4a853" }}
                />
                <span className="text-[10px] uppercase tracking-[0.12em] font-medium text-zinc-500">
                  {domain?.title[isZh ? "zh" : "en"] ?? item.slug}
                </span>
              </div>
              <QuizCard question={item.question} index={i} isZh={isZh} onAnswer={handleAnswer} />
            </div>
          );
        })}
      </div>

      {/* Score summary (shown after all answered) */}
      {allAnswered && (
        <div className="mt-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] text-center">
          <p className="text-lg font-semibold text-zinc-200 mb-1">
            {t("scoreSummary", { correct: correctCount, total: questions.length })}
          </p>
          <p className="text-sm text-zinc-500 mb-2">
            {Math.round((correctCount / questions.length) * 100)}% {t("correctOutOf")}
          </p>
          {/* Per-domain breakdown */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6">
            {questions.map((item, i) => {
              const domain = domains.find((d) => d.slug === item.slug);
              return (
                <span
                  key={item.slug}
                  className="text-[10px] px-2 py-0.5 rounded-full border border-white/[0.06] text-zinc-500"
                  style={{ borderColor: `${domain?.color ?? "#d4a853"}30` }}
                >
                  {domain?.title[isZh ? "zh" : "en"] ?? item.slug}
                </span>
              );
            })}
          </div>
          <button
            onClick={handleStartOver}
            className="px-5 py-2.5 rounded-full text-sm font-medium border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            {t("startOver")}
          </button>
        </div>
      )}
    </section>
  );
}
