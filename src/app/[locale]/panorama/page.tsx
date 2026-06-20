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
  const isZh = locale === "zh";

  return (
    <main className="min-h-[100dvh] pb-20">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-sm transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]">
            ←
          </span>
          {t.backToHome}
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-sky-400/30 text-sky-400 bg-sky-400/[0.06] mb-5">
          {isZh ? "全景地图" : "Panorama Map"}
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-tighter leading-none text-zinc-100 mb-4">
          {t.title}
        </h1>
        <p className="text-sm md:text-base text-zinc-500 max-w-[60ch] leading-relaxed mb-6">
          {t.subtitle}
        </p>

        {/* Purpose card — explains the "why" */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_0.8fr] gap-3 max-w-3xl mt-6">
          <div className="rounded-2xl p-[1px] bg-white/[0.03]">
            <div className="h-full rounded-[calc(1.5rem-1px)] p-4 bg-[#0c0c0f] border border-white/[0.03]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-sky-400/10 flex items-center justify-center text-[10px] text-sky-400 font-bold">
                  1
                </span>
                <span className="text-xs font-semibold text-zinc-300">
                  {isZh ? "发现关联" : "Discover Links"}
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {isZh
                  ? "每个金色节点是太极原理与一门科学的深度对话。点击即可进入。"
                  : "Each golden node is a deep dialogue between Taiji principles and a science. Click to enter."}
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-[1px] bg-white/[0.03]">
            <div className="h-full rounded-[calc(1.5rem-1px)] p-4 bg-[#0c0c0f] border border-white/[0.03]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-sky-400/10 flex items-center justify-center text-[10px] text-sky-400 font-bold">
                  2
                </span>
                <span className="text-xs font-semibold text-zinc-300">
                  {isZh ? "追踪连线" : "Follow Connections"}
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {isZh
                  ? "连线表示两个学科共享同一个阴阳原理。悬停节点可高亮其关联。"
                  : "Lines show two disciplines share the same yin-yang principle. Hover to highlight links."}
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-[1px] bg-white/[0.03]">
            <div className="h-full rounded-[calc(1.5rem-1px)] p-4 bg-[#0c0c0f] border border-white/[0.03]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-full bg-sky-400/10 flex items-center justify-center text-[10px] text-sky-400 font-bold">
                  3
                </span>
                <span className="text-xs font-semibold text-zinc-300">
                  {isZh ? "自由探索" : "Explore Freely"}
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {isZh
                  ? "拖拽移动地图，滚轮缩放。15+个扩展领域等待发现。"
                  : "Drag to pan, scroll to zoom. 15+ extended domains await discovery."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map container */}
      <div className="max-w-7xl mx-auto px-2 md:px-6 mt-4">
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-5 mb-4 px-2">
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            {t.coreDomains}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-medium text-zinc-600">
            <span className="w-2 h-2 rounded-full bg-zinc-500" />
            {t.extendedDomains}
          </span>
          <span className="text-[10px] text-zinc-600">
            {isZh ? "共 21 个节点" : "21 nodes total"}
          </span>
        </div>

        <div className="rounded-[2rem] p-[1px] bg-white/[0.03]">
          <div className="rounded-[calc(2rem-1px)] overflow-hidden bg-[#0c0c0f] border border-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
            <PanoramaMap nodes={panoramaNodes} locale={locale} />
          </div>
        </div>

        {/* Bottom hint — contextual, minimal */}
        <div className="flex items-center justify-center gap-6 mt-4 text-[10px] text-zinc-600">
          <span className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M3 3l4 4M7 3v4H3" />
            </svg>
            {isZh ? "拖拽" : "Drag"}
          </span>
          <span className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="5" cy="5" r="4" />
              <circle cx="5" cy="5" r="1.5" fill="currentColor" />
            </svg>
            {isZh ? "缩放" : "Zoom"}
          </span>
          <span className="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="5" cy="5" r="4" />
              <line x1="5" y1="3" x2="5" y2="7" />
              <line x1="3" y1="5" x2="7" y2="5" />
            </svg>
            {isZh ? "点击" : "Click"}
          </span>
        </div>
      </div>
    </main>
  );
}
