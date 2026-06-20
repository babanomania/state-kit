export type Elevation = "flat" | "soft" | "glow" | "neon" | "frosted";

export interface ThemeTokens {
  accent: string;
  surface: string;
  border: string;
  radius: number;
  blur: number;
  elevation: Elevation;
}

export interface Theme extends ThemeTokens {
  name: string;
  cssVars: Record<string, string>;
}
