"use client";

import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface StaleDataStateProps {
  lastUpdated: Date;
  isRefreshing?: boolean;
  theme?: ThemeInput;
}

export function StaleDataState({ lastUpdated, isRefreshing = false, theme }: StaleDataStateProps) {
  const formatted = lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <ThemeScope theme={theme}>
      <div
        role="status"
        aria-live="polite"
        className="inline-flex items-center gap-2 rounded-[8px] border px-3 py-[7px] font-mono text-[11px]"
        style={{ borderColor: "var(--sk-border)", background: "var(--sk-surface)", color: "var(--sk-muted)" }}
      >
        <span
          className={`h-2 w-2 rounded-full ${isRefreshing ? "animate-sk-pulse" : ""}`}
          style={{ background: isRefreshing ? "#8b7cff" : "var(--sk-muted)" }}
        />
        {isRefreshing ? "Refreshing…" : `Last updated ${formatted}`}
      </div>
    </ThemeScope>
  );
}
