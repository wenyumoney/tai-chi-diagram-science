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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={`${geistSans.variable} ${geistMono.variable} ${notoSerifSC.variable}`}>
      <body className="font-sans bg-[#09090b] text-zinc-200">{children}</body>
    </html>
  );
}
