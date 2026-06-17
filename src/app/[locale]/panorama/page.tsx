import Link from "next/link";
import { getMessages } from "next-intl/server";
import { panoramaNodes } from "@/data/panorama-domains";
import PanoramaMap from "@/components/PanoramaMap";

export default async function PanoramaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const t = (messages as Record<string, Record<string, string>>).panorama;

  return (
    <main className="min-h-[100dvh] pb-20">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors duration-300 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-300">←</span>
          {t.backToHome}
        </Link>
      </div>

      {/* Header — left-aligned per anti-center bias */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-[#d4a853]/30 text-[#d4a853] bg-[#d4a853]/[0.06] mb-5">
          {locale === "zh" ? "全景地图" : "Panorama Map"}
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-none text-zinc-100 mb-3">
          {t.title}
        </h1>
        <p className="text-sm md:text-base text-zinc-500 max-w-[52ch] leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Map container — Double-Bezel */}
      <div className="max-w-7xl mx-auto px-2 md:px-6">
        {/* Legend */}
        <div className="flex items-center gap-5 mb-4 px-2">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-[#d4a853]" />
            {t.coreDomains}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium text-zinc-600">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            {t.extendedDomains}
          </span>
        </div>

        <div className="rounded-[2rem] p-[1px] bg-white/[0.03]">
          <div className="rounded-[calc(2rem-1px)] overflow-hidden bg-[#0c0c0f] border border-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <PanoramaMap nodes={panoramaNodes} locale={locale} />
          </div>
        </div>

        <p className="text-center text-[10px] text-zinc-600 mt-4 tracking-wide">
          {t.tapToExplore}
        </p>
      </div>
    </main>
  );
}
