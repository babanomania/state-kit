"use client";

import type { ReactNode } from "react";
import { ConversionFailIcon } from "../../icons";
import { shimmerStyle } from "../../primitives/shimmer";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export type WidgetStatusValue = "loading" | "error" | "empty" | "ready";

export interface WidgetStateProps {
  status?: WidgetStatusValue;
  onRetry?: () => void;
  compact?: boolean;
  children?: ReactNode;
  theme?: ThemeInput;
}

export function WidgetState({ status = "loading", onRetry, compact = false, children, theme }: WidgetStateProps) {
  if (status === "ready") {
    return <ThemeScope theme={theme}>{children}</ThemeScope>;
  }

  return (
    <ThemeScope theme={theme}>
      <div
        role={status === "error" ? "alert" : status === "loading" ? "status" : undefined}
        aria-live={status === "loading" ? "polite" : undefined}
        className={`flex flex-col gap-2 rounded-[11px] border ${compact ? "p-3" : "p-4"}`}
        style={{
          borderColor: status === "error" ? "rgba(247,118,142,0.3)" : "var(--sk-border)",
          background: "var(--sk-surface)",
        }}
      >
        {status === "loading" && (
          <>
            <div className="h-[9px] w-[70%] animate-sk-shimmer rounded" style={shimmerStyle} />
            <div className="h-[9px] w-[45%] animate-sk-shimmer rounded" style={shimmerStyle} />
          </>
        )}
        {status === "error" && (
          <div className="flex items-center gap-3">
            <ConversionFailIcon />
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-sk-text">Widget failed</div>
              <div className="text-[11px] text-sk-muted">{"Couldn't load this widget."}</div>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px]"
                style={{ color: "#8b7cff" }}
              >
                retry
              </button>
            )}
          </div>
        )}
        {status === "empty" && <div className="text-[12px] text-sk-muted">No data yet.</div>}
      </div>
    </ThemeScope>
  );
}
