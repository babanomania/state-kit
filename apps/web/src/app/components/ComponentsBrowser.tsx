"use client";

import { useMemo, useState } from "react";
import { StateProvider } from "@babanomania/statekit";
import { CATALOG, CATEGORY_ORDER, type CatalogEntry } from "../../lib/componentCatalog";

export function ComponentsBrowser() {
  const [selectedId, setSelectedId] = useState(CATALOG[0].id);
  const [variant, setVariant] = useState(0);
  const [query, setQuery] = useState("");

  const selected = CATALOG.find((c) => c.id === selectedId) ?? CATALOG[0];
  const activeVariant = Math.min(variant, selected.variantLabels.length - 1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATALOG;
    return CATALOG.filter((c) => c.name.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q));
  }, [query]);

  const groups = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: filtered.filter((c) => c.cat === cat),
  })).filter((g) => g.items.length > 0);

  const idx = CATALOG.findIndex((c) => c.id === selected.id);
  const prev = CATALOG[(idx - 1 + CATALOG.length) % CATALOG.length];
  const next = CATALOG[(idx + 1) % CATALOG.length];

  function select(entry: CatalogEntry) {
    setSelectedId(entry.id);
    setVariant(0);
  }

  return (
    <div className="flex min-h-[calc(100vh-65px)]">
      {/* SIDEBAR */}
      <aside className="sticky top-[65px] h-[calc(100vh-65px)] w-[268px] flex-none overflow-y-auto border-r border-black/[0.07] dark:border-white/[0.07]">
        <div className="sticky top-0 z-[1] border-b border-black/[0.07] bg-[#f3f3f0] p-[18px] dark:border-white/[0.07] dark:bg-[#07070a]">
          <div className="flex items-center gap-2 rounded-[9px] border border-black/[0.11] bg-black/[0.03] px-3 py-[9px] dark:border-white/10 dark:bg-[#101016]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.4" opacity="0.5" />
              <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components…"
              className="w-full bg-transparent text-[13px] outline-none placeholder:text-[#9a9aa2] dark:placeholder:text-[#6f6f7e]"
            />
          </div>
        </div>

        <nav data-testid="component-nav" className="px-3.5 pb-10 pt-2">
          {groups.map((grp) => (
            <div key={grp.cat} className="mb-[18px]">
              <div className="flex items-center justify-between px-2 pb-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9a9aa2] dark:text-[#6f6f7e]">{grp.cat}</span>
                <span className="font-mono text-[10px] text-[#9a9aa2] opacity-60 dark:text-[#6f6f7e]">{grp.items.length}</span>
              </div>
              {grp.items.map((item) => {
                const active = item.id === selected.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => select(item)}
                    className={`flex w-full items-center gap-[9px] rounded-lg px-[9px] py-[7px] text-left text-[13.5px] transition-colors ${
                      active
                        ? "bg-[#8b7cff]/[0.14] text-[#8b7cff]"
                        : "text-[#5d5d66] hover:bg-black/[0.04] dark:text-[#9c9caa] dark:hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 flex-none rounded-full" style={{ background: item.dot }} />
                    {item.name}
                  </button>
                );
              })}
            </div>
          ))}
          {groups.length === 0 && (
            <div className="px-2.5 py-3.5 text-[13px] text-[#9a9aa2] dark:text-[#6f6f7e]">No components match &ldquo;{query}&rdquo;.</div>
          )}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-[920px] px-12 py-10 pb-24">
          <div className="mb-[22px] flex items-center gap-2 text-[13px] text-[#9a9aa2] dark:text-[#6f6f7e]">
            <span className="font-mono">Components</span>
            <span>/</span>
            <span className="font-mono text-[#8b7cff]">{selected.cat}</span>
            <span>/</span>
            <span className="font-mono text-[#1a1a1d] dark:text-[#e9e9ef]">{selected.name}</span>
          </div>

          <div className="mb-3.5 flex items-start justify-between gap-5">
            <h1 className="text-[38px] font-semibold leading-tight tracking-[-0.03em]">{selected.name}</h1>
            <div className="mt-2 flex flex-none items-center gap-2">
              <span className="rounded-md border border-[#5ec98a]/20 bg-[#5ec98a]/10 px-[9px] py-1 font-mono text-[11px] text-[#5ec98a]">stable</span>
              <span className="rounded-md border border-[#8b7cff]/20 bg-[#8b7cff]/10 px-[9px] py-1 font-mono text-[11px] text-[#8b7cff]">
                {selected.variantLabels.length} variants
              </span>
            </div>
          </div>
          <p className="mb-2 max-w-[640px] text-[17px] leading-relaxed text-[#5d5d66] dark:text-[#9c9caa]">{selected.desc}</p>
          <div className="mb-[30px] font-mono text-[13px] text-[#9a9aa2] dark:text-[#6f6f7e]">
            {"import { "}
            {selected.name}
            {" } from "}
            <span className="text-[#5ec98a]">&apos;@babanomania/statekit&apos;</span>
          </div>

          {/* PREVIEW STAGE */}
          <div className="mb-3.5 overflow-hidden rounded-2xl border border-black/[0.11] dark:border-white/10">
            <div className="flex items-center justify-between border-b border-black/[0.07] bg-white px-4 py-[11px] dark:border-white/[0.07] dark:bg-[#0c0c11]">
              <span className="font-mono text-[11px] text-[#9a9aa2] dark:text-[#6f6f7e]">preview</span>
              <div data-testid="variant-switcher" className="flex flex-wrap gap-1.5">
                {selected.variantLabels.map((label, i) => {
                  const active = i === activeVariant;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setVariant(i)}
                      className={`rounded-md border px-[11px] py-1 font-mono text-[11px] transition-colors ${
                        active
                          ? "border-[#8b7cff]/40 bg-[#8b7cff]/[0.16] text-[#cfcaff]"
                          : "border-black/[0.11] text-[#5d5d66] hover:border-[#8b7cff]/30 dark:border-white/10 dark:text-[#9c9caa]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div
              data-testid="preview-stage"
              className="flex min-h-[300px] items-center justify-center p-10"
              style={{ background: "radial-gradient(ellipse at 50% 35%, var(--stage1), var(--stage2))" }}
            >
              <div className="dark:[--stage1:#131319] dark:[--stage2:#0a0a0e] [--stage1:#ffffff] [--stage2:#f0f0ec]">
                <StateProvider theme="aurora">{selected.render(activeVariant)}</StateProvider>
              </div>
            </div>
          </div>
          <div className="mb-10 font-mono text-[12px] text-[#9a9aa2] dark:text-[#6f6f7e]">
            Active variant: <span className="text-[#8b7cff]">{selected.variantLabels[activeVariant]}</span>
          </div>

          <h3 className="mb-3.5 flex items-center gap-[9px] text-[15px] font-semibold">
            <span className="h-3.5 w-[3px] rounded-sm bg-[#8b7cff]" />
            Usage
          </h3>
          <div className="mb-10 rounded-2xl border border-black/[0.11] bg-white px-6 py-[22px] dark:border-white/10 dark:bg-[#0c0c11]">
            <pre className="whitespace-pre-wrap font-mono text-[13.5px] leading-[1.85] text-[#3c3c44] dark:text-[#c9c9d6]">{selected.code}</pre>
          </div>

          <h3 className="mb-3.5 flex items-center gap-[9px] text-[15px] font-semibold">
            <span className="h-3.5 w-[3px] rounded-sm bg-[#4fd6e0]" />
            Props
          </h3>
          <div className="mb-10 overflow-hidden rounded-2xl border border-black/[0.11] dark:border-white/10">
            <div className="grid grid-cols-[1.1fr_1.3fr_0.9fr_2fr] bg-white px-[18px] py-3 font-mono text-[11px] uppercase tracking-[0.04em] text-[#9a9aa2] dark:bg-[#0c0c11] dark:text-[#6f6f7e]">
              <span>Prop</span>
              <span>Type</span>
              <span>Default</span>
              <span>Description</span>
            </div>
            {selected.props.map((p) => (
              <div
                key={p.name}
                className="grid grid-cols-[1.1fr_1.3fr_0.9fr_2fr] items-center border-t border-black/[0.07] px-[18px] py-[13px] dark:border-white/[0.07]"
              >
                <span className="font-mono text-[12.5px] text-[#8b7cff]">{p.name}</span>
                <span className="font-mono text-[12px] text-[#4fd6e0]">{p.type}</span>
                <span className="font-mono text-[12px] text-[#9a9aa2] dark:text-[#6f6f7e]">{p.def}</span>
                <span className="text-[13px] leading-relaxed text-[#5d5d66] dark:text-[#9c9caa]">{p.desc}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between gap-3.5 border-t border-black/[0.07] pt-6 dark:border-white/[0.07]">
            <button
              type="button"
              onClick={() => select(prev)}
              className="flex-1 rounded-xl border border-black/[0.11] p-4 text-left transition-colors hover:border-[#8b7cff]/50 dark:border-white/10"
            >
              <div className="mb-1 font-mono text-[11px] text-[#9a9aa2] dark:text-[#6f6f7e]">&larr; Previous</div>
              <div className="text-[15px] font-semibold">{prev.name}</div>
            </button>
            <button
              type="button"
              onClick={() => select(next)}
              className="flex-1 rounded-xl border border-black/[0.11] p-4 text-right transition-colors hover:border-[#8b7cff]/50 dark:border-white/10"
            >
              <div className="mb-1 font-mono text-[11px] text-[#9a9aa2] dark:text-[#6f6f7e]">Next &rarr;</div>
              <div className="text-[15px] font-semibold">{next.name}</div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
