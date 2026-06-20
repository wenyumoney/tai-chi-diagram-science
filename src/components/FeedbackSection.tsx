"use client";

import { useState, useRef, useEffect } from "react";

interface FeedbackSectionProps {
  locale: string;
}

export default function FeedbackSection({ locale }: FeedbackSectionProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const sectionRef = useRef<HTMLElement>(null);
  const isZh = locale === "zh";

  // GSAP entry
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = sectionRef.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;
    import("gsap").then(({ default: gsap }) => {
      const ctx = gsap.context(() => {
        gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      }, el);
      cleanup = () => ctx.revert();
    });

    return () => {
      cleanup?.();
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim().length < 2) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || undefined,
          contact: contact.trim() || undefined,
          message: message.trim(),
          page: typeof window !== "undefined" ? window.location.pathname : "/",
          locale,
        }),
      });
      if (res.ok) {
        setStatus("sent");
        setMessage("");
        setName("");
        setContact("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={sectionRef} className="feedback-card max-w-3xl mx-auto px-4 md:px-6 pb-20">
      <div className="rounded-[2rem] p-[1px] bg-white/[0.03]">
        <div className="rounded-[calc(2rem-1px)] p-6 md:p-8 bg-[#0c0c0f] border border-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
              {isZh ? "留言反馈" : "Feedback"}
            </h2>
          </div>
          <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
            {isZh
              ? "欢迎留下你的建议、批评或想法——每一条反馈都会让这个网站变得更好。"
              : "Ideas, critiques, suggestions — every piece of feedback makes this site better."}
          </p>

          {status === "sent" ? (
            /* Success state */
            <div className="text-center py-10">
              <div className="text-3xl mb-3">🙏</div>
              <p className="text-sm text-zinc-300 font-medium mb-1">
                {isZh ? "感谢你的反馈！" : "Thank you for your feedback!"}
              </p>
              <p className="text-xs text-zinc-500 mb-6">
                {isZh ? "每一条意见我都会认真阅读。" : "Every suggestion will be carefully read."}
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="px-5 py-2 rounded-full text-xs font-medium border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-all duration-300"
              >
                {isZh ? "再写一条" : "Leave another"}
              </button>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-medium text-zinc-500 mb-1.5">
                    {isZh ? "称呼（选填）" : "Name (optional)"}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={60}
                    placeholder={isZh ? "怎么称呼你？" : "What should we call you?"}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/30 focus:bg-white/[0.04] transition-all duration-300"
                  />
                </div>
                {/* Contact */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.15em] font-medium text-zinc-500 mb-1.5">
                    {isZh ? "联系方式（选填）" : "Contact (optional)"}
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    maxLength={120}
                    placeholder={isZh ? "邮箱 / 微信 / 其他" : "Email / WeChat / other"}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/30 focus:bg-white/[0.04] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-medium text-zinc-500 mb-1.5">
                  {isZh ? "你的建议 *" : "Your feedback *"}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={2000}
                  rows={4}
                  required
                  placeholder={
                    isZh
                      ? "说说你的想法：哪里做得好？哪里可以改进？还想要什么功能？..."
                      : "What works? What could be better? What features would you like?..."
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-400/30 focus:bg-white/[0.04] transition-all duration-300 resize-none"
                />
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-zinc-600">
                    {message.length}/2000
                  </span>
                  {status === "error" && (
                    <span className="text-[10px] text-red-400">
                      {isZh ? "发送失败，请重试" : "Failed to send, please retry"}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending" || message.trim().length < 2}
                className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "rgba(251,191,36,0.1)",
                  color: "#fbbf24",
                  border: "1px solid rgba(251,191,36,0.2)",
                }}
              >
                {status === "sending"
                  ? isZh ? "发送中..." : "Sending..."
                  : isZh ? "提交反馈" : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
