import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  weight: ["400", "700", "900"],
  variable: "--font-song",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taiji Diagram × Modern Science",
  description:
    "Explore how the ancient Yin-Yang principle manifests across 11 scientific domains — from quantum physics to chaos theory. An interactive 3D bilingual educational experience.",
  keywords: [
    "Taiji",
    "Yin-Yang",
    "science",
    "philosophy",
    "quantum physics",
    "information theory",
    "chaos theory",
    "systems science",
    "3D visualization",
    "popular science",
  ],
  authors: [{ name: "wenyumoney" }],
  metadataBase: new URL("https://tai-chi-diagram-science.vercel.app"),
  openGraph: {
    type: "website",
    url: "https://tai-chi-diagram-science.vercel.app",
    title: "Taiji Diagram × Modern Science — An Interactive 3D Exploration",
    description:
      "11 scientific disciplines. 21 interactive 3D nodes. One ancient diagram. Discover how Yin-Yang principles map onto the frontiers of modern science.",
    siteName: "Taiji Diagram × Modern Science",
    locale: "en",
    alternateLocale: "zh",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Taiji Diagram × Modern Science — 3D Universe Map Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taiji Diagram × Modern Science",
    description:
      "An interactive 3D map connecting the ancient Yin-Yang diagram to 11 modern scientific fields. Bilingual, open-source, and built with Next.js + Three.js.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable} ${notoSerifSC.variable}`}>
      <body className="font-sans bg-[#09090b] text-zinc-200">{children}</body>
    </html>
  );
}
