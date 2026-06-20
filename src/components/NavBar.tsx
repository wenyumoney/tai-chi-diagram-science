"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function NavBar() {
  const t = useTranslations("nav");
  const th = useTranslations("home");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating glass pill — detached from edges */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-max">
        <div className="flex items-center gap-1 px-2 py-2 rounded-full bg-zinc-950/70 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="px-4 py-1.5 text-zinc-200 font-semibold tracking-tight text-sm hover:text-white transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            {th("siteTitle")}
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href={`/${locale}/panorama`}
              className="px-4 py-1.5 text-zinc-400 hover:text-zinc-200 text-sm transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] rounded-full hover:bg-white/[0.04]"
            >
              {t("panorama")}
            </Link>
            <div className="h-4 w-px bg-white/[0.08] mx-2" />
            <LanguageSwitcher />
          </div>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/[0.06] transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <div className="w-4 h-3 flex flex-col justify-between relative">
              <span
                className={`block h-px w-full bg-zinc-400 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "rotate-45 translate-y-[5px]" : ""
                }`}
              />
              <span
                className={`block h-px w-full bg-zinc-400 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "-rotate-45 translate-y-[-5px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-3xl flex flex-col items-center justify-center md:hidden"
          onClick={() => setOpen(false)}
        >
          <nav
            className="flex flex-col items-center gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            {[
              { href: `/${locale}`, label: th("siteTitle"), delay: "delay-0" },
              { href: `/${locale}/panorama`, label: t("panorama"), delay: "delay-100" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`text-2xl font-semibold text-zinc-200 hover:text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] translate-y-8 opacity-0 ${
                  open ? "!translate-y-0 !opacity-100" : ""
                } ${item.delay}`}
              >
                {item.label}
              </Link>
            ))}
            <div
              className={`translate-y-8 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] delay-200 ${
                open ? "!translate-y-0 !opacity-100" : ""
              }`}
            >
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
