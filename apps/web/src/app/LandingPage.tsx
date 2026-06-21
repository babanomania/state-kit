"use client";

import Link from "next/link";
import { useState } from "react";
import { EmptyState, ErrorState, OfflineState, PartialFailureState, Spinner, StateProvider, WidgetState, themes, type ThemeName } from "@babanomania/statekit";
import { THEME_META } from "../lib/themeMeta";
import { StateWall } from "./StateWall";

const noop = () => {};

type Tab = "loading" | "empty" | "error" | "offline" | "success";

const TABS: { id: Tab; label: string }[] = [
  { id: "loading", label: "Loading" },
  { id: "empty", label: "Empty" },
  { id: "error", label: "Error" },
  { id: "offline", label: "Offline" },
  { id: "success", label: "Success" },
];

const CODES: Record<Tab, string> = {
  loading:
    "function Users() {\n  const { data, loading } = useUsers()\n\n  return (\n    <StateBoundary loading={loading}>\n      <UsersTable data={data} />\n    </StateBoundary>\n  )\n}",
  empty: '<EmptyState\n  title="No users yet"\n  description="Invite your team to get started."\n  action={<InviteButton />}\n/>',
  error: '<ErrorState\n  variant="friendly"\n  title="Something went wrong"\n  retry={refetch}\n/>',
  offline: "<OfflineState\n  onReconnect={refetch}\n  showSignal\n  autoDetect\n/>",
  success: "<StateBoundary data={users}>\n  {users.map(u => (\n    <UserRow key={u.id} user={u} />\n  ))}\n</StateBoundary>",
};

const ROWS = [{ w: "70%" }, { w: "55%" }, { w: "80%" }];

const GALLERY = [
  { tag: "dashboard/empty", dot: "#8b7cff", title: "Empty dashboard", desc: "No data to show yet. Guide the user to their first action." },
  { tag: "api/error", dot: "#f7768e", title: "Failed API request", desc: "A 500 from upstream. Friendly copy + automatic retry countdown." },
  { tag: "notifications/empty", dot: "#8b7cff", title: "No notifications", desc: "All caught up." },
  { tag: "search/empty", dot: "#4fd6e0", title: "No search results", desc: 'No matches for "quarterly revenue". Suggest adjusting filters.' },
  { tag: "system/maintenance", dot: "#e0c060", title: "Maintenance window", desc: "Scheduled downtime with a live ETA and status link." },
  { tag: "security/denied", dot: "#f7768e", title: "Access denied", desc: "Insufficient permissions, with a spring-loaded lock animation." },
  { tag: "auth/expired", dot: "#e0c060", title: "Session expired", desc: "Re-authenticate without losing the page you were on." },
  { tag: "network/offline", dot: "#4fd6e0", title: "Offline mode", desc: "Signal degradation animation with auto-reconnect pulse." },
  { tag: "table/partial", dot: "#f7768e", title: "Partial table failure", desc: "Some rows loaded, some failed. Retry just the broken ones." },
];

function PlaygroundPreview({ tab }: { tab: Tab }) {
  if (tab === "loading") {
    return (
      <div className="flex flex-col items-center gap-5">
        <Spinner size={54} />
        <span className="text-[14px] text-[#5d5d66] dark:text-[#9c9caa]">Loading users…</span>
      </div>
    );
  }
  if (tab === "empty") {
    return <EmptyState title="No users yet" description="Invite your team to get started." />;
  }
  if (tab === "error") {
    return <ErrorState variant="friendly" retry={noop} />;
  }
  if (tab === "offline") {
    return <OfflineState autoDetect={false} showSignal />;
  }
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-2.5">
      {ROWS.map((r) => (
        <div
          key={r.w}
          className="flex items-center gap-3 rounded-[10px] border border-black/[0.07] bg-[#f3f3ef] px-3.5 py-[11px] dark:border-white/[0.07] dark:bg-[#15151d]"
        >
          <div className="h-[30px] w-[30px] flex-none rounded-full bg-gradient-to-br from-[#8b7cff] to-[#4fd6e0]" />
          <div className="flex-1">
            <div className="mb-1.5 h-2 rounded-sm bg-[#e4e4df] dark:bg-[#26262f]" style={{ width: r.w }} />
            <div className="h-[7px] w-[46%] rounded-sm bg-[#e4e4df] dark:bg-[#26262f]" />
          </div>
          <div className="h-[7px] w-[7px] flex-none rounded-full bg-[#5ec98a] shadow-[0_0_8px_#5ec98a]" />
        </div>
      ))}
    </div>
  );
}

export function LandingPage() {
  const [tab, setTab] = useState<Tab>("loading");
  const [theme, setTheme] = useState<ThemeName>("aurora");
  const themeMeta = THEME_META.find((t) => t.id === theme) ?? THEME_META[1];
  const tokens = themes[theme];

  return (
    <main>
      {/* HERO */}
      <section className="relative z-[1] mx-auto max-w-[1240px] px-10 py-10 pb-16">
        <div className="relative h-[600px] overflow-hidden rounded-3xl border border-black/[0.08] shadow-[0_24px_70px_rgba(0,0,0,0.16)] dark:border-white/[0.07]">
          <StateWall />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse 56% 64% at center, var(--sw-vignette), transparent 76%)" }}
          />
          <div className="relative flex h-full flex-col items-center justify-center px-10 text-center [--sw-vignette:rgba(243,243,240,0.55)] dark:[--sw-vignette:rgba(7,7,10,0.5)]">
            <div className="relative rounded-[30px] border border-white/80 bg-white/[0.55] px-[58px] py-[46px] shadow-[0_30px_80px_rgba(0,0,0,0.12)] backdrop-blur-md dark:border-white/[0.22] dark:bg-white/[0.06] dark:shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <div className="mb-[22px] inline-flex items-center gap-2 rounded-full border border-[#8b7cff]/25 bg-[#8b7cff]/10 px-[13px] py-[5px] font-mono text-[12px] text-[#8b7cff]">
                <span className="h-1.5 w-1.5 animate-sk-pulse rounded-full bg-[#8b7cff] shadow-[0_0_8px_#8b7cff]" />
                50+ states, one package
              </div>
              <h1 className="mb-[18px] bg-gradient-to-b from-[#18181b] to-[#3c3c44] bg-clip-text text-[64px] font-semibold leading-[1.0] tracking-[-0.035em] text-transparent dark:from-white dark:to-[#b8b8c6]">
                Build Better States.
              </h1>
              <p className="mx-auto mb-[30px] max-w-[480px] text-[18px] leading-relaxed text-[#5d5d66] dark:text-[#9c9caa]">
                Every state your app can hit — loading, empty, error, offline — animated, themeable, production-ready.
              </p>
              <div className="flex justify-center gap-3.5">
                <Link
                  href="/components"
                  className="rounded-[10px] bg-[#1a1a1d] px-[26px] py-[13px] text-[15px] font-medium text-white shadow-[0_4px_30px_rgba(139,124,255,0.25)] transition-transform hover:-translate-y-px dark:bg-white dark:text-[#07070a]"
                >
                  Explore Components →
                </Link>
                <div className="flex items-center gap-2.5 rounded-[10px] border border-black/[0.13] bg-black/[0.04] px-[22px] py-[13px] font-mono text-[15px] dark:border-white/10 dark:bg-white/[0.04]">
                  npm i @babanomania/statekit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PLAYGROUND */}
      <section className="mx-auto max-w-[1120px] px-10 py-[50px]">
        <div className="mb-10 text-center">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.1em] text-[#8b7cff]">Playground</p>
          <h2 className="mb-3 text-[42px] font-semibold tracking-[-0.03em]">Edit. See it instantly.</h2>
          <p className="text-[17px] text-[#5d5d66] dark:text-[#9c9caa]">Drop a state into any boundary. It just works.</p>
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`rounded-lg border px-[18px] py-2 font-mono text-[14px] transition-colors ${
                  active
                    ? "border-[#8b7cff]/40 bg-[#8b7cff]/[0.14] text-[#8b7cff]"
                    : "border-black/[0.11] text-[#5d5d66] dark:border-white/10 dark:text-[#9c9caa]"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-black/[0.11] shadow-[0_30px_80px_rgba(0,0,0,0.12)] dark:border-white/10 dark:shadow-[0_30px_80px_rgba(0,0,0,0.5)] lg:grid-cols-2">
          <div className="min-h-[340px] bg-[#f7f7f4] px-7 py-6 dark:bg-[#0a0a0e]">
            <div className="mb-5 flex gap-[7px]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4df] dark:bg-[#26262f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4df] dark:bg-[#26262f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4df] dark:bg-[#26262f]" />
            </div>
            <pre className="whitespace-pre-wrap font-mono text-[13.5px] leading-[1.85] text-[#3c3c44] dark:text-[#c9c9d6]">{CODES[tab]}</pre>
          </div>
          <div className="relative flex min-h-[340px] items-center justify-center bg-[radial-gradient(ellipse_at_50%_40%,#eceae6,#f7f7f4)] p-8 dark:bg-[radial-gradient(ellipse_at_50%_40%,#15151d,#0a0a0e)]">
            <span className="absolute right-[18px] top-4 font-mono text-[11px] text-[#9a9aa2] dark:text-[#6f6f7e]">live preview</span>
            <StateProvider theme="aurora">
              <PlaygroundPreview tab={tab} />
            </StateProvider>
          </div>
        </div>
      </section>

      {/* THEME SHOWCASE */}
      <section className="mx-auto max-w-[1120px] px-10 py-20">
        <div className="mb-9 text-center">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.1em] text-[#4fd6e0]">Themes</p>
          <h2 className="mb-3 text-[42px] font-semibold tracking-[-0.03em]">One component. Every aesthetic.</h2>
          <p className="text-[17px] text-[#5d5d66] dark:text-[#9c9caa]">Switch the theme — every state restyles in real time.</p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {THEME_META.map((t) => {
            const active = t.id === theme;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTheme(t.id)}
                className={`flex items-center gap-2 rounded-full border px-5 py-[9px] text-[14px] transition-colors ${
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

        <div className="flex min-h-[360px] items-center justify-center rounded-[22px] border border-black/[0.08] bg-[#fafaf8] p-10 dark:border-white/[0.07] dark:bg-[#0a0a0e]">
          <StateProvider theme={theme}>
            <div className="flex w-[380px] max-w-full flex-col items-center gap-5 rounded-sk-radius border border-sk-border bg-sk-surface p-8 text-center shadow-sk backdrop-blur-sk-blur">
              <ErrorState variant="friendly" title="Failed to load dashboard" />
              <span className="font-mono text-[11px] text-sk-muted">{`theme="${theme}" · ${themeMeta.desc}`}</span>
            </div>
          </StateProvider>
        </div>
        <p className="mt-3 text-center font-mono text-[12px] text-[#9a9aa2] dark:text-[#6f6f7e]">
          accent {tokens.accent} · radius {tokens.radius}px · elevation {tokens.elevation}
        </p>
      </section>

      {/* STATE GALLERY */}
      <section className="mx-auto max-w-[1180px] px-10 py-16">
        <div className="mb-11 text-center">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.1em] text-[#8b7cff]">Gallery</p>
          <h2 className="mb-3 text-[42px] font-semibold tracking-[-0.03em]">50+ states for real scenarios.</h2>
          <p className="text-[17px] text-[#5d5d66] dark:text-[#9c9caa]">Every one animated, themeable, and production-ready.</p>
        </div>
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {GALLERY.map((g) => (
            <div
              key={g.title}
              className="mb-4 break-inside-avoid rounded-2xl border border-black/[0.07] bg-white p-6 transition-colors hover:border-[#8b7cff]/40 dark:border-white/[0.07] dark:bg-[#0d0d12]"
            >
              <div className="mb-3.5 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full" style={{ background: g.dot }} />
                <span className="font-mono text-[11px] text-[#9a9aa2] dark:text-[#6f6f7e]">{g.tag}</span>
              </div>
              <div className="mb-1.5 text-[16px] font-semibold">{g.title}</div>
              <div className="text-[13px] leading-relaxed text-[#5d5d66] dark:text-[#9c9caa]">{g.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ENTERPRISE SHOWCASE */}
      <section className="mx-auto max-w-[1120px] px-10 py-16">
        <div className="mb-11 text-center">
          <p className="mb-3 font-mono text-[12px] uppercase tracking-[0.1em] text-[#4fd6e0]">Enterprise</p>
          <h2 className="mb-3 text-[42px] font-semibold tracking-[-0.03em]">States most libraries forget.</h2>
          <p className="text-[17px] text-[#5d5d66] dark:text-[#9c9caa]">Tables, dashboards and widgets that fail gracefully.</p>
        </div>
        <StateProvider theme="aurora">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
            <PartialFailureState succeeded={2} failed={2} onRetryFailed={noop} />
            <div className="flex flex-col gap-4">
              <div className="flex flex-1 flex-col justify-center gap-1.5 rounded-2xl border border-black/[0.08] bg-[#f7f7f4] p-[22px] dark:border-white/[0.07] dark:bg-[#0a0a0e]">
                <span className="text-[13px] text-[#5d5d66] dark:text-[#9c9caa]">Revenue</span>
                <div className="flex h-[54px] items-end gap-[5px]">
                  {[40, 70, 55, 85].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 animate-sk-bar rounded-sm bg-[#e4e4df] dark:bg-[#26262f]"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              <WidgetState status="error" onRetry={noop} />
            </div>
          </div>
        </StateProvider>
      </section>

      {/* DOCS PREVIEW — DataStateBoundary flagship */}
      <section className="mx-auto max-w-[1000px] px-10 py-20">
        <div className="grid grid-cols-1 items-center gap-[50px] lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="mb-3.5 font-mono text-[12px] uppercase tracking-[0.1em] text-[#8b7cff]">The flagship</p>
            <h2 className="mb-4 text-[40px] font-semibold leading-tight tracking-[-0.03em]">One boundary. Every state handled.</h2>
            <p className="mb-5 text-[16px] leading-relaxed text-[#5d5d66] dark:text-[#9c9caa]">
              Wrap your data fetch once. <span className="font-mono text-[#1a1a1d] dark:text-[#e9e9ef]">DataStateBoundary</span> renders the right
              state automatically — loading, error, empty, offline — so you never wire it by hand again.
            </p>
            <div className="flex flex-col gap-3 text-[15px] text-[#3c3c44] dark:text-[#c9c9d6]">
              <div className="flex items-center gap-2.5">
                <span className="text-[#5ec98a]">✓</span> Automatic loading &amp; error fallbacks
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#5ec98a]">✓</span> Built-in retry &amp; offline detection
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-[#5ec98a]">✓</span> Fully theme-aware
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-black/[0.08] bg-[#f7f7f4] p-[26px] shadow-[0_30px_70px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-[#0a0a0e] dark:shadow-[0_30px_70px_rgba(0,0,0,0.5)]">
            <div className="mb-5 flex gap-[7px]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4df] dark:bg-[#26262f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4df] dark:bg-[#26262f]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#e4e4df] dark:bg-[#26262f]" />
            </div>
            <pre className="whitespace-pre-wrap font-mono text-[14px] leading-[1.9] text-[#3c3c44] dark:text-[#c9c9d6]">
              <span className="text-[#8b7cff]">{"<DataStateBoundary"}</span>
              {"\n  "}
              <span className="text-[#4fd6e0]">loading</span>={"{loading}"}
              {"\n  "}
              <span className="text-[#4fd6e0]">error</span>={"{error}"}
              {"\n  "}
              <span className="text-[#4fd6e0]">data</span>={"{users}"}
              {"\n  "}
              <span className="text-[#4fd6e0]">theme</span>=<span className="text-[#5ec98a]">&quot;aurora&quot;</span>
              {"\n"}
              <span className="text-[#8b7cff]">{">"}</span>
              {"\n  "}
              {"<UsersTable />"}
              {"\n"}
              <span className="text-[#8b7cff]">{"</DataStateBoundary>"}</span>
            </pre>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[900px] px-10 py-[70px] pb-[100px] text-center">
        <div className="relative overflow-hidden rounded-3xl border border-[#8b7cff]/20 bg-gradient-to-b from-[#8b7cff]/[0.06] to-transparent px-10 py-16">
          <h2 className="relative mb-4 text-[48px] font-semibold tracking-[-0.03em]">Ship states worth shipping.</h2>
          <p className="relative mb-8 text-[18px] text-[#5d5d66] dark:text-[#9c9caa]">
            Install StateKit and never build a loading spinner from scratch again.
          </p>
          <div className="relative flex justify-center gap-3.5">
            <Link
              href="/components"
              className="rounded-[10px] bg-[#1a1a1d] px-7 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-[#07070a]"
            >
              Get Started Free
            </Link>
            <Link
              href="/components"
              className="flex items-center gap-2.5 rounded-[10px] border border-black/[0.13] bg-black/[0.04] px-6 py-3.5 font-mono text-[15px] dark:border-white/10 dark:bg-white/[0.04]"
            >
              Read the docs →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 border-t border-black/[0.08] px-10 py-10 dark:border-white/[0.07]">
        <div className="flex items-center gap-2.5">
          <div className="h-[18px] w-[18px] rotate-45 rounded-[4px] bg-gradient-to-br from-[#8b7cff] to-[#4fd6e0]" />
          <span className="font-semibold">StateKit</span>
          <span className="ml-2 text-[13px] text-[#9a9aa2] dark:text-[#6f6f7e]">© 2026 — Motion for application states</span>
        </div>
        <div className="flex gap-6 text-[14px] text-[#5d5d66] dark:text-[#9c9caa]">
          <Link href="/components" className="hover:text-[#1a1a1d] dark:hover:text-[#e9e9ef]">
            Docs
          </Link>
          <span>GitHub</span>
          <span>Changelog</span>
          <span>Discord</span>
        </div>
      </footer>
    </main>
  );
}
