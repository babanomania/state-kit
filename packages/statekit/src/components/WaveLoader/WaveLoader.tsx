"use client";

import { resolveThemeColor, type ThemeColor } from "../../colors";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface WaveLoaderProps {
  bars?: number;
  color?: ThemeColor;
  speed?: number;
  label?: string;
  theme?: ThemeInput;
}

export function WaveLoader({ bars = 5, color = "accent", speed = 1, label = "Loading", theme }: WaveLoaderProps) {
  const accent = resolveThemeColor(color);

  return (
    <ThemeScope theme={theme}>
      <div role="status" aria-live="polite" className="flex items-center" style={{ gap: 7, height: 54 }}>
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className="w-2 animate-sk-bar rounded-full"
            style={{ height: "100%", background: accent, animationDelay: `${i * 0.12}s`, animationDuration: `${1.1 / speed}s` }}
          />
        ))}
        <span className="sr-only">{label}</span>
      </div>
    </ThemeScope>
  );
}
