import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.04] bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-10 md:gap-20 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              {/* Mini Taiji brand mark */}
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-zinc-500">
                <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <path d="M12 1a11 11 0 0 0 0 22 5.5 5.5 0 0 1 0-11 5.5 5.5 0 0 0 0-11" fill="currentColor" opacity="0.3" />
                <circle cx="12" cy="6.5" r="1.2" fill="currentColor" />
                <circle cx="12" cy="17.5" r="1.2" fill="currentColor" opacity="0.5" />
              </svg>
              <span className="text-sm font-semibold tracking-tight text-zinc-400">
                太极图 × 现代科学
              </span>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed max-w-[36ch]">
              探索阴阳哲学在量子物理、系统科学、信息论等前沿领域的科学映射。
              跨越古今的思想对话。
            </p>
          </div>

          {/* Links */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-600 mb-4 block">
              导航
            </span>
            <ul className="space-y-2">
              <li>
                <Link href="/zh" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300">
                  首页
                </Link>
              </li>
              <li>
                <Link href="/zh/panorama" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300">
                  全景地图
                </Link>
              </li>
              <li>
                <a href="https://github.com/wenyumoney/tai-chi-diagram-science" target="_blank" rel="noopener noreferrer"
                  className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-300 inline-flex items-center gap-1">
                  GitHub
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
                    <path d="M3 7l4-4M3 3h4v4" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Quote */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-zinc-600 mb-4 block">
              名言
            </span>
            <blockquote className="text-xs text-zinc-600 italic leading-relaxed max-w-[28ch]">
              &ldquo;一阴一阳之谓道，继之者善也，成之者性也。&rdquo;
              <cite className="block not-italic mt-1 text-zinc-700">— 《周易·系辞》</cite>
            </blockquote>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/[0.03] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[10px] text-zinc-700">
            &copy; 2026 太极图 × 现代科学 · Taiji Diagram &times; Modern Science
          </span>
          <span className="text-[10px] text-zinc-700">
            阴阳哲学，科学解读
          </span>
        </div>
      </div>
    </footer>
  );
}
