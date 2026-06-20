import Link from "next/link";
import { getMessages } from "next-intl/server";
import CumulativeQuiz from "@/components/CumulativeQuiz";
import { domains } from "@/data/domains";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const title =
    locale === "zh" ? "综合测验 — 太极图 × 现代科学" : "Cumulative Quiz — Taiji Diagram × Modern Science";
  return { title };
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const isZh = locale === "zh";

  return (
    <main className="min-h-[100dvh] pb-24">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 pt-32 md:pt-40 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href={`/${locale}`}
            className="text-[10px] uppercase tracking-[0.15em] font-medium text-zinc-500 hover:text-zinc-300 transition-colors duration-300"
          >
            {isZh ? "← 返回首页" : "← Back to Home"}
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl tracking-tighter leading-[1.1] text-zinc-100 mb-3">
          {isZh ? "综合测验" : "Cumulative Quiz"}
        </h1>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-[56ch]">
          {isZh
            ? `从${domains.length}个科学领域中各出一题，考验你对太极原理在跨学科应用中的整体理解。`
            : `One question from each of the ${domains.length} scientific domains — test your comprehensive understanding of Taiji principles across disciplines.`}
        </p>
      </section>

      {/* Quiz content */}
      <section className="py-8">
        <CumulativeQuiz locale={locale} />
      </section>
    </main>
  );
}
