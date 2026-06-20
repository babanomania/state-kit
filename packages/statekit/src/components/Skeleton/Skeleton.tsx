"use client";

import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface SkeletonProps {
  variant?: "text" | "card" | "avatar" | "table";
  lines?: number;
  shimmer?: boolean;
  label?: string;
  children?: ReactNode;
  theme?: ThemeInput;
}

const ShimmerContext = createContext(true);

const shimmerStyle: CSSProperties = {
  background: "linear-gradient(90deg,var(--sk-border),var(--sk-surface),var(--sk-border))",
  backgroundSize: "200% 100%",
};

function Line({ width = "100%", height = 11, delay = 0 }: { width?: string | number; height?: number; delay?: number }) {
  const shimmer = useContext(ShimmerContext);
  return (
    <div
      className={`rounded ${shimmer ? "animate-sk-shimmer" : ""}`}
      style={{ width, height, animationDelay: `${delay}s`, ...shimmerStyle }}
    />
  );
}

function Avatar({ size = 46, radius = "50%" as number | string }: { size?: number; radius?: number | string }) {
  const shimmer = useContext(ShimmerContext);
  return (
    <div
      className={`flex-none ${shimmer ? "animate-sk-shimmer" : ""}`}
      style={{ width: size, height: size, borderRadius: radius, ...shimmerStyle }}
    />
  );
}

function buildBody(variant: SkeletonProps["variant"], lines: number) {
  if (variant === "table") {
    return (
      <div className="flex w-80 max-w-full flex-col gap-2.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <Line key={i} height={12} delay={i * 0.1} />
        ))}
      </div>
    );
  }
  const widths = ["75%", "100%", "55%"];
  const hasAvatar = variant !== "text";
  return (
    <div className="flex w-72 max-w-full items-start gap-3.5">
      {hasAvatar && <Avatar radius={variant === "avatar" ? "50%" : 10} />}
      <div className="flex flex-1 flex-col gap-2 pt-1">
        {Array.from({ length: lines }).map((_, i) => (
          <Line key={i} height={11} width={widths[i % widths.length]} delay={i * 0.15} />
        ))}
      </div>
    </div>
  );
}

export function Skeleton({ variant = "text", lines = 3, shimmer = true, label = "Loading content", children, theme }: SkeletonProps) {
  return (
    <ThemeScope theme={theme}>
      <div role="status" aria-live="polite">
        <ShimmerContext.Provider value={shimmer}>{children ?? buildBody(variant, lines)}</ShimmerContext.Provider>
        <span className="sr-only">{label}</span>
      </div>
    </ThemeScope>
  );
}

Skeleton.Avatar = Avatar;
Skeleton.Line = Line;
