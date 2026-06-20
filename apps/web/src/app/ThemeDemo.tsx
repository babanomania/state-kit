"use client";

import { useState } from "react";
import { StateProvider, type ThemeName } from "statekit";

const THEME_NAMES: ThemeName[] = ["minimal", "aurora", "neon", "glass", "enterprise"];

export function ThemeDemo() {
  const [theme, setTheme] = useState<ThemeName>("aurora");
  const [pageDark, setPageDark] = useState(true);

  return (
    <div className={pageDark ? "dark" : ""}>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white p-10 font-sans dark:bg-[#07070a]">
        <h1 className="text-2xl font-semibold text-[#1a1a1d] dark:text-[#e9e9ef]">
          StateKit — Build Better States
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {THEME_NAMES.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setTheme(name)}
              className={`rounded-full border px-4 py-2 text-sm capitalize transition-colors ${
                theme === name
                  ? "border-[#8b7cff] text-[#8b7cff]"
                  : "border-black/10 text-[#5d5d66] dark:border-white/10 dark:text-[#9c9caa]"
              }`}
            >
              {name}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPageDark((d) => !d)}
            className="rounded-full border border-black/10 px-4 py-2 text-sm text-[#5d5d66] dark:border-white/10 dark:text-[#9c9caa]"
          >
            Toggle page {pageDark ? "light" : "dark"}
          </button>
        </div>

        <StateProvider theme={theme}>
          <div className="flex w-72 flex-col items-center gap-3 rounded-sk-radius border border-sk-border bg-sk-surface p-8 text-center shadow-sk backdrop-blur-sk-blur">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-sk-icon-bg shadow-sk-icon"
              aria-hidden="true"
            >
              <svg width="28" height="28" viewBox="0 0 46 46" fill="none">
                <circle cx="23" cy="23" r="18" stroke="rgba(255,255,255,0.12)" strokeWidth="3.4" />
                <path d="M23 5 a18 18 0 0 1 18 18" stroke="var(--sk-accent)" strokeWidth="3.4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-sk-text">
              <div className="text-base font-semibold">Loading…</div>
              <div className="mt-1 text-xs text-sk-muted">Fetching your data</div>
            </div>
            <div
              className="px-4 py-2 text-xs font-medium text-sk-btn-text shadow-sk-btn"
              style={{ background: "var(--sk-btn-bg)", borderRadius: "calc(var(--sk-radius) * 0.55)" }}
            >
              Retry
            </div>
          </div>
        </StateProvider>
      </main>
    </div>
  );
}
