import { createTheme } from "./createTheme";

export const themes = {
  minimal: createTheme(
    {
      accent: "#e9e9ef",
      surface: "#0e0e13",
      border: "rgba(255,255,255,0.1)",
      radius: 14,
      blur: 0,
      elevation: "flat",
    },
    "minimal",
  ),
  aurora: createTheme(
    {
      accent: "linear-gradient(135deg,#8b7cff,#4fd6e0)",
      surface: "rgba(20,18,34,0.7)",
      border: "rgba(139,124,255,0.35)",
      radius: 18,
      blur: 8,
      elevation: "glow",
    },
    "aurora",
  ),
  neon: createTheme(
    {
      accent: "#4fd6e0",
      surface: "#08080c",
      border: "#4fd6e0",
      radius: 12,
      blur: 0,
      elevation: "neon",
    },
    "neon",
  ),
  glass: createTheme(
    {
      accent: "rgba(255,255,255,0.85)",
      surface: "rgba(255,255,255,0.08)",
      border: "rgba(255,255,255,0.22)",
      radius: 22,
      blur: 20,
      elevation: "frosted",
    },
    "glass",
  ),
  enterprise: createTheme(
    {
      accent: "#4c8dff",
      surface: "#161b22",
      border: "rgba(255,255,255,0.12)",
      radius: 8,
      blur: 0,
      elevation: "soft",
    },
    "enterprise",
  ),
} as const;

export type ThemeName = keyof typeof themes;
