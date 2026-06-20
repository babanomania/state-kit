"use client";

import { resolveThemeColor, type ThemeColor } from "../../colors";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface SpinnerProps {
  size?: number;
  variant?: "default" | "dashed" | "thin";
  color?: ThemeColor;
  speed?: number;
  label?: string;
  theme?: ThemeInput;
}

export function Spinner({
  size = 40,
  variant = "default",
  color = "accent",
  speed = 1,
  label = "Loading",
  theme,
}: SpinnerProps) {
  const strokeWidth = variant === "thin" ? 2 : 3.5;
  const dash = variant === "dashed" ? "5 6" : undefined;
  const accent = resolveThemeColor(color);
  const r = size / 2 - strokeWidth * 1.6;
  const c = size / 2;

  return (
    <ThemeScope theme={theme}>
      <span role="status" aria-live="polite" className="inline-flex">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          fill="none"
          className="animate-sk-spin"
          style={{ animationDuration: `${1 / speed}s` }}
          aria-hidden="true"
        >
          <circle cx={c} cy={c} r={r} stroke="var(--sk-border)" strokeWidth={strokeWidth} />
          <path
            d={`M${c} ${c - r} a${r} ${r} 0 0 1 ${r} ${r}`}
            stroke={accent}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={dash}
          />
        </svg>
        <span className="sr-only">{label}</span>
      </span>
    </ThemeScope>
  );
}
