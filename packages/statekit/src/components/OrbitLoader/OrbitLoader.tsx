"use client";

import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface OrbitLoaderProps {
  variant?: "single" | "dual" | "trio";
  size?: number;
  glow?: boolean;
  label?: string;
  theme?: ThemeInput;
}

function Satellite({ color, size, top, glow }: { color: string; size: number; top: number; glow: boolean }) {
  return (
    <span
      className="absolute left-1/2 -translate-x-1/2 rounded-full"
      style={{ top, width: size, height: size, background: color, boxShadow: glow ? `0 0 12px ${color}` : undefined }}
      aria-hidden="true"
    />
  );
}

export function OrbitLoader({ variant = "dual", size = 84, glow = true, label = "Loading", theme }: OrbitLoaderProps) {
  const showR2 = variant !== "single";
  const showR3 = variant === "trio";

  return (
    <ThemeScope theme={theme}>
      <span role="status" aria-live="polite" className="relative inline-block" style={{ width: size, height: size }}>
        <span className="absolute inset-0 animate-sk-orbit-a">
          <Satellite color="#8b7cff" size={11} top={-3} glow={glow} />
        </span>
        {showR2 && (
          <span className="absolute animate-sk-orbit-a-rev" style={{ inset: 15 }}>
            <Satellite color="#4fd6e0" size={9} top={-3} glow={glow} />
          </span>
        )}
        {showR3 && (
          <span className="absolute animate-[sk-orbit-a_0.9s_linear_infinite]" style={{ inset: 30 }}>
            <Satellite color="#f7768e" size={7} top={-2} glow={glow} />
          </span>
        )}
        <span className="absolute rounded-full bg-sk-border" style={{ inset: 39 }} aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </span>
    </ThemeScope>
  );
}
