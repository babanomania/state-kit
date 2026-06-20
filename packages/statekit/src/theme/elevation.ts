import { resolveAccentColor, withAlpha } from "./color";
import type { Elevation } from "./types";

export interface ElevationShadows {
  shadow: string;
  iconGlow: string;
  btnGlow: string;
}

/** Recipe verbatim from the 5 built-in themes in design/StateKit Themes.dc.html. */
export function deriveElevation(elevation: Elevation, accent: string): ElevationShadows {
  const accentColor = resolveAccentColor(accent);

  switch (elevation) {
    case "flat":
      return { shadow: "none", iconGlow: "none", btnGlow: "none" };
    case "soft":
      return { shadow: "0 4px 16px rgba(0,0,0,0.3)", iconGlow: "none", btnGlow: "none" };
    case "glow":
      return {
        shadow: `0 20px 60px ${withAlpha(accentColor, 25)}`,
        iconGlow: `0 0 30px ${withAlpha(accentColor, 40)}`,
        btnGlow: `0 6px 24px ${withAlpha(accentColor, 50)}`,
      };
    case "neon":
      return {
        shadow: `0 0 0 1px ${withAlpha(accentColor, 40)}, 0 0 40px ${withAlpha(accentColor, 25)}`,
        iconGlow: `0 0 24px ${withAlpha(accentColor, 60)}`,
        btnGlow: `0 0 20px ${withAlpha(accentColor, 50)}, inset 0 0 0 1px ${accentColor}`,
      };
    case "frosted":
      return {
        shadow: "0 20px 60px rgba(0,0,0,0.4)",
        iconGlow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
        btnGlow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
      };
  }
}
