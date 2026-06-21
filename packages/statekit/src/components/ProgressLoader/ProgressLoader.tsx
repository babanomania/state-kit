"use client";

import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface ProgressLoaderProps {
  variant?: "indeterminate" | "linear";
  value?: number;
  label?: string;
  theme?: ThemeInput;
}

export function ProgressLoader({ variant = "indeterminate", value, label, theme }: ProgressLoaderProps) {
  const determinate = variant === "linear" && typeof value === "number";
  const width = determinate ? `${Math.min(100, Math.max(0, value as number))}%` : undefined;

  return (
    <ThemeScope theme={theme}>
      <div
        className="w-[300px] max-w-full text-center"
        role={determinate ? "progressbar" : "status"}
        aria-live={determinate ? undefined : "polite"}
        aria-valuenow={determinate ? value : undefined}
        aria-valuemin={determinate ? 0 : undefined}
        aria-valuemax={determinate ? 100 : undefined}
        aria-label={determinate ? (label ?? "Progress") : undefined}
      >
        <div className="relative h-2 overflow-hidden rounded-full" style={{ background: "var(--sk-border)" }}>
          <div
            className={`absolute inset-y-0 left-0 h-full rounded-full bg-gradient-to-r from-[#8b7cff] to-[#4fd6e0] ${
              determinate ? "" : "animate-sk-prog w-[30%]"
            }`}
            style={determinate ? { width } : undefined}
          />
        </div>
        {label ? (
          <div className="mt-3.5 font-mono text-xs text-sk-muted">{label}</div>
        ) : !determinate ? (
          <span className="sr-only">Loading</span>
        ) : null}
      </div>
    </ThemeScope>
  );
}
