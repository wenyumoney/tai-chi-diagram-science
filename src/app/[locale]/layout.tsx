import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import "@/app/globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "zh" ? "太极图 × 现代科学" : "Taiji Diagram × Modern Science";
  const description =
    locale === "zh"
      ? "探索阴阳原理在量子纠缠、对称性破缺、信息论等科学前沿的显现"
      : "Exploring how Yin-Yang principles manifest in quantum entanglement, symmetry breaking, information theory, and other scientific frontiers";

  return {
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      siteName: title,
    },
    alternates: {
      languages: {
        zh: "/zh",
        en: "/en",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "zh" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ParticleField />
      <NavBar />
      <main className="relative z-10 pt-14">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
