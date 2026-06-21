"use client";

import { useState } from "react";
import { EmptyState, ErrorState, Spinner, StateProvider, SuccessState, themes, type ThemeName } from "@babanomania/statekit";
import { THEME_META } from "../../lib/themeMeta";

const noop = () => {};

function ThemeCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[210px] flex-col items-center justify-center gap-3.5 rounded-sk-radius border border-sk-border bg-sk-surface p-6 text-center shadow-sk backdrop-blur-sk-blur">
      {children}
    </div>
  );
}

export function ThemesShowcase() {
  const [selected, setSelected] = useState<ThemeName>("aurora");
  const meta = THEME_META.find((t) => t.id === selected) ?? THEME_META[1];
  const tokens = themes[selected];

  const tokenRows: { label: string; value: string; swatch?: React.ReactNode }[] = [
    {
      label: "Accent",
      value: tokens.accent,
      swatch: <span className="h-[18px] w-8 rounded-md border border-sk-border" style={{ background: tokens.accent }} />,
    },
    {
      label: "Surface",
      value: tokens.surface,
      swatch: <span className="h-[18px] w-8 rounded-md border border-sk-border" style={{ background: tokens.surface }} />,
    },
    {
      label: "Border",
      value: tokens.border,
      swatch: <span className="h-[18px] w-8 rounded-md bg-sk-surface" style={{ border: `1px solid ${tokens.border}` }} />,
    },
    { label: "Radius", value: `${tokens.radius}px` },
    { label: "Blur", value: tokens.blur > 0 ? `${tokens.blur}px` : "0" },
    { label: "Elevation", value: tokens.elevation },
  ];

  const providerSnippet = `import { StateProvider } from '@babanomania/statekit'\n\n<StateProvider theme="${selected}">\n  <App />\n</StateProvider>`;
  const overrideSnippet = `<ErrorState theme="${selected}" />`;
  const createSnippet = `import { createTheme } from '@babanomania/statekit'\n\nexport const ${selected} = createTheme({\n  accent: '${tokens.accent}',\n  surface: '${tokens.surface}',\n  border: '${tokens.border}',\n  radius: ${tokens.radius},\n  blur: ${tokens.blur},\n  elevation: '${tokens.elevation}',\n})`;

  return (
    <main className="px-10 py-16">
      {/* HERO */}
      <section className="mx-auto max-w-[760px] pb-8 text-center">
        <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.12em] text-[#4fd6e0]">Themes</p>
        <h1 className="mb-5 bg-gradient-to-b from-[#18181b] to-[#3c3c44] bg-clip-text text-[52px] font-semibold leading-[1.05] tracking-[-0.035em] text-transparent dark:from-white dark:to-[#b8b8c6]">
          One component.
          <br />
          Every aesthetic.
        </h1>
        <p className="mx-auto max-w-[560px] text-[18px] leading-relaxed text-[#5d5d66] dark:text-[#9c9caa]">
          Every StateKit component reads from a single theme token set. Switch the theme — and all 50+ states restyle in
          real time.
        </p>
      </section>

      {/* SWITCHER + STAGE */}
      <section className="mx-auto max-w-[1100px] pb-10">
        <div data-testid="theme-switcher" className="mb-7 flex flex-wrap justify-center gap-2">
          {THEME_META.map((t) => {
            const active = t.id === selected;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelected(t.id)}
                className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-[14px] transition-colors ${
                  active
                    ? "border-black/20 bg-black/[0.04] text-[#1a1a1d] dark:border-white/20 dark:bg-white/[0.06] dark:text-[#e9e9ef]"
                    : "border-black/[0.11] text-[#5d5d66] dark:border-white/10 dark:text-[#9c9caa]"
                }`}
              >
                <span className="h-2.5 w-2.5 flex-none rounded-full" style={{ background: t.dot }} />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-black/[0.08] bg-[#fafaf8] p-8 dark:border-white/[0.07] dark:bg-[#0a0a0e]">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
            <div>
              <div className="text-[22px] font-semibold tracking-[-0.02em]">{meta.label} theme</div>
              <div className="mt-1 max-w-[420px] text-[14px] text-[#5d5d66] dark:text-[#9c9caa]">{meta.desc}</div>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[#5d5d66] dark:text-[#9c9caa]">
              <span className="h-4 w-[26px] rounded-[5px] border border-black/10 dark:border-white/15" style={{ background: tokens.accent }} />
              {`theme="${selected}"`}
            </div>
          </div>

          <StateProvider theme={selected}>
            <div data-testid="theme-stage" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ThemeCard>
                <Spinner size={44} />
                <div>
                  <div className="text-[15px] font-semibold text-sk-text">Loading…</div>
                  <div className="mt-1 text-[12.5px] text-sk-muted">Fetching your data</div>
                </div>
              </ThemeCard>
              <ThemeCard>
                <EmptyState
                  title="No items yet"
                  description="Add your first record"
                  action={
                    <button className="rounded-[8px] px-4 py-2 text-[12.5px] font-medium text-sk-btn-text shadow-sk-btn" style={{ background: "var(--sk-btn-bg)" }}>
                      Add item
                    </button>
                  }
                />
              </ThemeCard>
              <ThemeCard>
                <ErrorState variant="friendly" title="Failed to load" retry={noop} />
              </ThemeCard>
              <ThemeCard>
                <SuccessState title="All done" description="Your changes were saved" />
              </ThemeCard>
            </div>
          </StateProvider>
        </div>
      </section>

      {/* TOKENS + CODE */}
      <section className="mx-auto grid max-w-[1100px] grid-cols-1 gap-4 pb-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-black/[0.08] bg-[#f7f7f4] p-6 dark:border-white/10 dark:bg-[#0a0a0e]">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-[#9a9aa2] dark:text-[#6f6f7e]">
            {selected} · tokens
          </div>
          {tokenRows.map((row) => (
            <div key={row.label} className="flex items-center justify-between border-b border-black/[0.07] py-3 last:border-0 dark:border-white/[0.07]">
              <span className="text-[14px] text-[#5d5d66] dark:text-[#9c9caa]">{row.label}</span>
              <span className="flex items-center gap-2.5">
                <span className="font-mono text-[12px] text-[#3c3c44] dark:text-[#c9c9d6]">{row.value}</span>
                {row.swatch}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-black/[0.08] bg-[#f7f7f4] p-6 dark:border-white/10 dark:bg-[#0a0a0e]">
          <div className="mb-4 flex gap-[7px]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f7768e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e0c060]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#5ec98a]" />
            <span className="ml-1.5 font-mono text-[11px] text-[#9a9aa2] dark:text-[#6f6f7e]">App.tsx</span>
          </div>
          <pre className="mb-4 whitespace-pre-wrap font-mono text-[13.5px] leading-[1.85] text-[#3c3c44] dark:text-[#c9c9d6]">{providerSnippet}</pre>
          <div className="border-t border-black/[0.07] pt-4 text-[13px] leading-relaxed text-[#5d5d66] dark:border-white/[0.07] dark:text-[#9c9caa]">
            Need one component off-theme? Every state accepts a local <span className="font-mono text-[#1a1a1d] dark:text-[#e9e9ef]">theme</span> prop
            that overrides the provider:
          </div>
          <pre className="mt-3 whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#3c3c44] dark:text-[#c9c9d6]">{overrideSnippet}</pre>
        </div>
      </section>

      {/* COMPARE GALLERY */}
      <section className="mx-auto max-w-[1100px] pb-10">
        <div className="mb-7 text-center">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.1em] text-[#8b7cff]">Side by side</p>
          <h2 className="mb-2.5 text-[30px] font-semibold tracking-[-0.03em]">The same error, five ways.</h2>
          <p className="text-[15px] text-[#5d5d66] dark:text-[#9c9caa]">
            One <span className="font-mono text-[#1a1a1d] dark:text-[#e9e9ef]">&lt;ErrorState /&gt;</span> — rendered under each built-in theme. Tap
            one to preview it above.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {THEME_META.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelected(t.id)}
              className="rounded-2xl p-[3px] transition-colors"
              style={{ background: t.id === selected ? t.dot : "transparent" }}
            >
              <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-[15px] border border-black/[0.08] bg-[#fafaf8] px-3 py-5 dark:border-white/10 dark:bg-[#0a0a0e]">
                <StateProvider theme={t.id}>
                  <ThemeCard>
                    <ErrorState variant="friendly" title="Failed to load" />
                  </ThemeCard>
                </StateProvider>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#5d5d66] dark:text-[#9c9caa]">
                  <span className="h-2 w-2 rounded-full" style={{ background: t.dot }} />
                  {t.label}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* BUILD YOUR OWN */}
      <section className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 pb-10 lg:grid-cols-2">
        <div>
          <p className="mb-3.5 font-mono text-[12px] uppercase tracking-[0.1em] text-[#4fd6e0]">Bring your own</p>
          <h2 className="mb-4 text-[30px] font-semibold leading-tight tracking-[-0.03em]">A theme is just six tokens.</h2>
          <p className="mb-5 text-[15px] leading-relaxed text-[#5d5d66] dark:text-[#9c9caa]">
            No theme files, no CSS overrides. Define accent, surface, border, radius, blur and elevation —{" "}
            <span className="font-mono text-[#1a1a1d] dark:text-[#e9e9ef]">createTheme</span> propagates them to every
            state automatically.
          </p>
          <div className="flex flex-col gap-2.5 text-[14px] text-[#3c3c44] dark:text-[#c9c9d6]">
            <div className="flex items-center gap-2.5">
              <span className="text-[#5ec98a]">✓</span> Match your existing design system in minutes
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[#5ec98a]">✓</span> Fully type-safe token contract
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[#5ec98a]">✓</span> Light &amp; dark variants from one definition
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-black/[0.08] bg-[#f7f7f4] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-[#0a0a0e] dark:shadow-[0_30px_70px_rgba(0,0,0,0.4)]">
          <div className="mb-4 flex gap-[7px]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f7768e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e0c060]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#5ec98a]" />
            <span className="ml-1.5 font-mono text-[11px] text-[#9a9aa2] dark:text-[#6f6f7e]">{selected}.theme.ts</span>
          </div>
          <pre className="whitespace-pre-wrap font-mono text-[13.5px] leading-[1.9] text-[#3c3c44] dark:text-[#c9c9d6]">{createSnippet}</pre>
        </div>
      </section>
    </main>
  );
}
