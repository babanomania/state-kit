export type ThemeColor = "accent" | "violet" | "cyan" | "pink" | "green" | "gold";

const fixed: Record<Exclude<ThemeColor, "accent">, string> = {
  violet: "#8b7cff",
  cyan: "#4fd6e0",
  pink: "#f7768e",
  green: "#5ec98a",
  gold: "#e0c060",
};

/** "accent" resolves to the active theme's solid accent color; named tokens are fixed semantic colors. */
export function resolveThemeColor(color: ThemeColor = "accent"): string {
  return color === "accent" ? "var(--sk-accent-solid)" : fixed[color];
}
