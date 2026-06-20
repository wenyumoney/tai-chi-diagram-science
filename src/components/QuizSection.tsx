"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { quizQuestions } from "@/data/quiz-questions";
import QuizCard from "@/components/QuizCard";

interface QuizSectionProps {
  slug: string;
  locale: string;
}

export default function QuizSection({ slug, locale }: QuizSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isZh = locale === "zh";
  const questions = quizQuestions[slug];
  const t = useTranslations("quiz");

  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [quizKey, setQuizKey] = useState(0); // increment to force re-render for retry

  const handleAnswer = useCallback((correct: boolean) => {
    if (correct) setCorrectCount((c) => c + 1);
    setAnsweredCount((c) => c + 1);
  }, []);

  const handleRetry = () => {
    setCorrectCount(0);
    setAnsweredCount(0);
    setQuizKey((k) => k + 1);
  };

  const allAnswered = questions && answeredCount >= questions.length;

  // GSAP stagger entry
  useEffect(() => {
    if (typeof window === "undefined" || !questions) return;
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
            stagger: { each: 0.1, from: "start" },
            ease: "power2.out",
          }
        );
      }, container);
      return () => ctx.revert();
    });
  }, [questions, quizKey]);

  if (!questions || questions.length === 0) return null;

  return (
    <section ref={containerRef} className="quiz-section max-w-5xl mx-auto px-4 md:px-6">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
          {t("sectionTitle")}
        </h2>
        <span className="text-[10px] text-zinc-600">
          {questions.length} {t("questions")}
        </span>
      </div>

      <div className="space-y-3" key={quizKey}>
        {questions.map((q, i) => (
          <QuizCard key={q.id} question={q} index={i} isZh={isZh} onAnswer={handleAnswer} />
        ))}
      </div>

      {/* Score summary + retry (shown after all answered) */}
      {allAnswered && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
          <p className="text-sm text-zinc-300">
            {t("scoreSummary", { correct: correctCount, total: questions.length })}
            {" · "}
            <span className="text-zinc-500">
              {Math.round((correctCount / questions.length) * 100)}%
            </span>
          </p>
          <button
            onClick={handleRetry}
            className="px-4 py-2 rounded-full text-xs font-medium border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            {t("retry")}
          </button>
        </div>
      )}
    </section>
  );
}
