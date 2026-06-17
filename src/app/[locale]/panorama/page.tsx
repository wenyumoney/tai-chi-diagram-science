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
    <main className="min-h-[100dvh] pt-14">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <Link
          href={`/${locale}`}
          className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
        >
          ← {t.backToHome}
        </Link>
      </div>

      <div className="text-center py-4 md:py-6">
        <h1 className="text-2xl md:text-4xl tracking-tighter leading-none text-zinc-100 mb-2">
          {t.title}
        </h1>
        <p className="text-sm md:text-base text-zinc-400">{t.subtitle}</p>
      </div>

      <div className="max-w-7xl mx-auto px-2 md:px-6">
        <div className="flex gap-4 mb-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d4a853]" />
            {t.coreDomains}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            {t.extendedDomains}
          </span>
        </div>
        <div className="border border-zinc-800 rounded-2xl overflow-hidden bg-[#09090b]">
          <PanoramaMap nodes={panoramaNodes} locale={locale} />
        </div>
        <p className="text-center text-xs text-zinc-600 mt-4">
          {t.tapToExplore}
        </p>
      </div>
    </main>
  );
}
