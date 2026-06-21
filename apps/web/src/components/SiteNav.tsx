"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/components", label: "Components" },
  { href: "/motion", label: "Motion" },
  { href: "/themes", label: "Themes" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.07] bg-[#f3f3f0]/90 backdrop-blur-md dark:border-white/[0.07] dark:bg-[#07070a]/90">
      <nav className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label="StateKit home">
          <span className="h-[18px] w-[18px] rotate-45 rounded-[4px] bg-gradient-to-br from-[#8b7cff] to-[#4fd6e0] shadow-[0_2px_10px_rgba(139,124,255,0.45)]" />
          <span className="bg-gradient-to-br from-[#8b7cff] to-[#4fd6e0] bg-clip-text text-[15px] font-semibold tracking-tight text-transparent">
            StateKit
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-[#8b7cff]/[0.14] text-[#8b7cff]"
                    : "text-[#5d5d66] hover:text-[#1a1a1d] dark:text-[#9c9caa] dark:hover:text-[#e9e9ef]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
