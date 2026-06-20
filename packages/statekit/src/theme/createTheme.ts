import { relativeLuminance, resolveAccentColor, withAlpha } from "./color";
import { deriveElevation } from "./elevation";
import type { Theme, ThemeTokens } from "./types";

export function createTheme(tokens: ThemeTokens, name = "custom"): Theme {
  const { accent, surface, border, radius, blur, elevation } = tokens;
  const { shadow, iconGlow, btnGlow } = deriveElevation(elevation, accent);
  const accentColor = resolveAccentColor(accent);

  const onDarkSurface = relativeLuminance(surface) < 0.5;
  const onDarkAccent = relativeLuminance(accentColor) < 0.5;

  const cssVars: Record<string, string> = {
    "--sk-accent": accent,
    "--sk-surface": surface,
    "--sk-border": border,
    "--sk-radius": `${radius}px`,
    "--sk-blur": blur > 0 ? `blur(${blur}px)` : "none",
    "--sk-shadow": shadow,
    "--sk-icon-glow": iconGlow,
    "--sk-btn-glow": btnGlow,
    "--sk-icon-bg": withAlpha(accentColor, 14),
    "--sk-btn-bg": accent,
    "--sk-text": onDarkSurface ? "#f3f3f6" : "#1a1a1d",
    "--sk-muted": onDarkSurface ? "#a7a7b4" : "#5d5d66",
    "--sk-btn-text": onDarkAccent ? "#ffffff" : "#0a0a0d",
  };

  return { ...tokens, name, cssVars };
}
