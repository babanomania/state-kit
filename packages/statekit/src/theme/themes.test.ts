import { describe, expect, it } from "vitest";
import { themes } from "./themes";

// Expected values copied verbatim from the `defs` array in
// design/StateKit Themes.dc.html (cardShadow/iconGlow/btnGlow per built-in theme).
const expected = {
  minimal: { shadow: "none", iconGlow: "none", btnGlow: "none" },
  aurora: {
    shadow: "0 20px 60px rgba(139,124,255,0.25)",
    iconGlow: "0 0 30px rgba(139,124,255,0.4)",
    btnGlow: "0 6px 24px rgba(139,124,255,0.5)",
  },
  neon: {
    shadow: "0 0 0 1px rgba(79,214,224,0.4), 0 0 40px rgba(79,214,224,0.25)",
    iconGlow: "0 0 24px rgba(79,214,224,0.6)",
    btnGlow: "0 0 20px rgba(79,214,224,0.5), inset 0 0 0 1px #4fd6e0",
  },
  glass: {
    shadow: "0 20px 60px rgba(0,0,0,0.4)",
    iconGlow: "inset 0 0 0 1px rgba(255,255,255,0.2)",
    btnGlow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
  },
  enterprise: {
    shadow: "0 4px 16px rgba(0,0,0,0.3)",
    iconGlow: "none",
    btnGlow: "none",
  },
} as const;

describe("built-in themes reproduce prototype shadow/glow exactly", () => {
  for (const name of Object.keys(expected) as (keyof typeof expected)[]) {
    it(name, () => {
      const theme = themes[name];
      expect(theme.cssVars["--sk-shadow"]).toBe(expected[name].shadow);
      expect(theme.cssVars["--sk-icon-glow"]).toBe(expected[name].iconGlow);
      expect(theme.cssVars["--sk-btn-glow"]).toBe(expected[name].btnGlow);
    });
  }
});
