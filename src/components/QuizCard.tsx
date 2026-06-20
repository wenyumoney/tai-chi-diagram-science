"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/data/quiz-questions";

interface QuizCardProps {
  question: QuizQuestion;
  index: number;
  isZh: boolean;
  onAnswer?: (correct: boolean) => void;
}

export default function QuizCard({ question, index, isZh, onAnswer }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const isCorrect = selected === question.correctIndex;
  const answered = selected !== null;
  const labels = ["A", "B", "C", "D"];

  function handleSelect(i: number) {
    if (answered) return;
    setSelected(i);
    onAnswer?.(i === question.correctIndex);
  }

  return (
    <div className="quiz-card rounded-2xl p-[1px] bg-white/[0.02]">
      <div className="rounded-[calc(1.5rem-1px)] p-5 bg-[#0c0c0f] border border-white/[0.03]">
        {/* Question number + text */}
        <div className="flex items-start gap-3 mb-4">
          <span className="text-[10px] font-mono font-medium text-zinc-500 mt-0.5 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="text-sm font-medium text-zinc-200 leading-relaxed">
            {question.question[isZh ? "zh" : "en"]}
          </p>
        </div>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((opt, i) => {
            let optionStyle = "";
            if (!answered) {
              optionStyle =
                "border-zinc-800 hover:border-zinc-600 hover:bg-white/[0.03] text-zinc-400 hover:text-zinc-200";
            } else if (i === question.correctIndex) {
              optionStyle =
                "border-emerald-500/50 bg-emerald-500/[0.08] text-emerald-400";
            } else if (i === selected && !isCorrect) {
              optionStyle =
                "border-red-500/50 bg-red-500/[0.06] text-red-400";
            } else {
              optionStyle =
                "border-zinc-800/50 text-zinc-600";
            }

            return (
              <button
                key={i}
                disabled={answered}
                onClick={() => handleSelect(i)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${optionStyle} ${
                  !answered ? "cursor-pointer active:scale-[0.98]" : "cursor-default"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-mono font-bold shrink-0 transition-colors duration-300 ${
                    answered && i === question.correctIndex
                      ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
                      : answered && i === selected && !isCorrect
                        ? "border-red-500/50 bg-red-500/20 text-red-400"
                        : "border-zinc-700 text-zinc-500"
                  }`}
                >
                  {labels[i]}
                </span>
                <span>{opt[isZh ? "zh" : "en"]}</span>
                {/* Check / cross icon for answered state */}
                {answered && i === question.correctIndex && (
                  <svg className="w-4 h-4 ml-auto text-emerald-400 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,8 6.5,12 13,5" />
                  </svg>
                )}
                {answered && i === selected && !isCorrect && (
                  <svg className="w-4 h-4 ml-auto text-red-400 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="4" y1="4" x2="12" y2="12" /><line x1="12" y1="4" x2="4" y2="12" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation — revealed after answering */}
        {answered && (
          <div className="mt-4 pt-4 border-t border-white/[0.04]">
            <div className="flex items-start gap-2">
              <span className="text-[10px] shrink-0 mt-0.5">
                {isCorrect ? "✅" : "💡"}
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {question.explanation[isZh ? "zh" : "en"]}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
