"use client";

import { DashedBoxIcon } from "../../icons";
import { shimmerStyle } from "../../primitives/shimmer";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export type TableStateStatus = "loading" | "empty" | "error";

export interface TableStateProps {
  rows?: number;
  columns?: number;
  status?: TableStateStatus;
  theme?: ThemeInput;
}

const badgeCopy: Record<TableStateStatus, { label: string; color: string; bg: string }> = {
  loading: { label: "loading", color: "#8b7cff", bg: "rgba(139,124,255,0.12)" },
  empty: { label: "empty", color: "var(--sk-muted)", bg: "var(--sk-surface)" },
  error: { label: "error", color: "#f7768e", bg: "rgba(247,118,142,0.1)" },
};

export function TableState({ rows = 8, columns = 4, status = "loading", theme }: TableStateProps) {
  const badge = badgeCopy[status];
  return (
    <ThemeScope theme={theme}>
      <div
        role={status === "error" ? "alert" : status === "loading" ? "status" : undefined}
        aria-live={status === "loading" ? "polite" : undefined}
        className="w-80 max-w-full overflow-hidden rounded-xl border"
        style={{ borderColor: "var(--sk-border)", background: "var(--sk-surface)" }}
      >
        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--sk-border)" }}>
          <span className="text-[13px] font-semibold text-sk-text">Table</span>
          <span
            className="rounded-[5px] px-2 py-[3px] font-mono text-[10px]"
            style={{ color: badge.color, background: badge.bg }}
          >
            {badge.label}
          </span>
        </div>
        <div className="flex flex-col gap-[7px] p-4">
          {status === "loading" &&
            Array.from({ length: rows }).map((_, r) => (
              <div key={r} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {Array.from({ length: columns }).map((_, c) => (
                  <div
                    key={c}
                    className="h-[11px] animate-sk-shimmer rounded"
                    style={{ ...shimmerStyle, animationDelay: `${(r * columns + c) * 0.05}s` }}
                  />
                ))}
              </div>
            ))}
          {status === "empty" && (
            <div className="flex flex-col items-center gap-2 py-[18px]">
              <DashedBoxIcon />
              <span className="text-[12.5px] text-sk-muted">No records yet</span>
            </div>
          )}
          {status === "error" && (
            <div className="flex flex-col items-center gap-2 py-[18px] text-center">
              <span className="text-[12.5px] text-sk-muted">{"Couldn't load this table."}</span>
            </div>
          )}
        </div>
      </div>
    </ThemeScope>
  );
}
