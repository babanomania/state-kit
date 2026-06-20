import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { SiteNav } from "../components/SiteNav";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "StateKit — Build Better States",
  description: "50+ states, one package. Animated, themeable, production-ready React state components.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="bg-[#f3f3f0] font-sans text-[#1a1a1d] dark:bg-[#07070a] dark:text-[#e9e9ef]">
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
