"use client";

import type { ReactNode } from "react";
import { ConversionFailIcon, ErrorGlyph } from "../../icons";
import { StateLayout } from "../../primitives/StateLayout";
import { shimmerStyle } from "../../primitives/shimmer";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export type DashboardWidgetStatusValue = "loading" | "error" | "ready";

export interface WidgetStatus {
  id: string;
  title: string;
  status: DashboardWidgetStatusValue;
  description?: string;
  onRetry?: () => void;
}

export interface DashboardStateProps {
  widgets: WidgetStatus[];
  isolateFailures?: boolean;
  children: (widget: WidgetStatus) => ReactNode;
  theme?: ThemeInput;
}

export function DashboardState({ widgets, isolateFailures = true, children, theme }: DashboardStateProps) {
  const hasFailure = widgets.some((w) => w.status === "error");

  if (hasFailure && !isolateFailures) {
    return (
      <ThemeScope theme={theme}>
        <div role="alert">
          <StateLayout
            icon={<ErrorGlyph />}
            title="Dashboard failed to load"
            description="One or more widgets failed and isolation is disabled."
            maxDescriptionWidth={300}
          />
        </div>
      </ThemeScope>
    );
  }

  return (
    <ThemeScope theme={theme}>
      <div className="grid w-80 max-w-full grid-cols-2 gap-3">
        {widgets.map((widget) => {
          if (widget.status === "error") {
            return (
              <div
                key={widget.id}
                role="alert"
                className="col-span-2 flex items-center gap-3 rounded-[11px] border p-4"
                style={{ borderColor: "rgba(247,118,142,0.3)", background: "var(--sk-surface)" }}
              >
                <ConversionFailIcon />
                <div className="flex-1">
                  <div className="text-[13px] font-semibold text-sk-text">{widget.title} failed</div>
                  <div className="text-[11px] text-sk-muted">
                    {widget.description ?? "Other widgets loaded normally."}
                  </div>
                </div>
                {widget.onRetry && (
                  <button
                    onClick={widget.onRetry}
                    className="cursor-pointer border-none bg-transparent p-0 font-mono text-[11px]"
                    style={{ color: "#8b7cff" }}
                  >
                    retry
                  </button>
                )}
              </div>
            );
          }
          if (widget.status === "loading") {
            return (
              <div
                key={widget.id}
                role="status"
                aria-live="polite"
                className="flex flex-col gap-2 rounded-[11px] border p-4"
                style={{ borderColor: "var(--sk-border)", background: "var(--sk-surface)" }}
              >
                <div className="text-[11px] text-sk-muted">{widget.title}</div>
                <div className="h-[9px] w-[70%] animate-sk-shimmer rounded" style={shimmerStyle} />
                <div className="h-[9px] w-[45%] animate-sk-shimmer rounded" style={shimmerStyle} />
              </div>
            );
          }
          return <div key={widget.id}>{children(widget)}</div>;
        })}
      </div>
    </ThemeScope>
  );
}
