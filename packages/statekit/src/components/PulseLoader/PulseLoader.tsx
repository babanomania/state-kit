"use client";

import type { ReactNode } from "react";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface PulseLoaderProps {
  variant?: "dots" | "ring" | "grid";
  count?: number;
  gap?: number;
  label?: string;
  theme?: ThemeInput;
}

function buildBody(variant: PulseLoaderProps["variant"], count: number, gap: number): ReactNode {
  if (variant === "ring") {
    return (
      <div className="relative h-16 w-16">
        <div
          className="absolute inset-0 animate-sk-pulse rounded-full border-2"
          style={{ borderColor: "var(--sk-accent-solid)" }}
        />
        <div
          className="absolute inset-0 animate-sk-pulse rounded-full border-2"
          style={{ borderColor: "var(--sk-accent-solid)", animationDelay: ".8s" }}
        />
        <div className="absolute rounded-full" style={{ inset: 24, background: "var(--sk-accent-solid)" }} />
      </div>
    );
  }
  if (variant === "grid") {
    return (
      <div className="grid grid-cols-2" style={{ gap }}>
        {Array.from({ length: Math.max(count, 4) }).map((_, i) => (
          <div
            key={i}
            className="h-4 w-4 animate-sk-pulse rounded"
            style={{ background: "var(--sk-accent-solid)", animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="flex" style={{ gap }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-4 w-4 animate-sk-pulse rounded-full"
          style={{ background: "var(--sk-accent-solid)", animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}

export function PulseLoader({ variant = "dots", count = 3, gap = 12, label = "Loading", theme }: PulseLoaderProps) {
  return (
    <ThemeScope theme={theme}>
      <div role="status" aria-live="polite">
        {buildBody(variant, count, gap)}
        <span className="sr-only">{label}</span>
      </div>
    </ThemeScope>
  );
}
