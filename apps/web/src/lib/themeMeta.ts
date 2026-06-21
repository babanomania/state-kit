import type { ThemeName } from "@babanomania/statekit";

export interface ThemeMeta {
  id: ThemeName;
  label: string;
  dot: string;
  desc: string;
}

export const THEME_META: ThemeMeta[] = [
  { id: "minimal", label: "Minimal", dot: "#e9e9ef", desc: "Monochrome and restrained. Lets your content lead." },
  { id: "aurora", label: "Aurora", dot: "#8b7cff", desc: "Ambient gradients and a soft violet glow." },
  { id: "neon", label: "Neon", dot: "#4fd6e0", desc: "High-contrast cyber glow on near-black." },
  { id: "glass", label: "Glass", dot: "#ffffff", desc: "Frosted liquid glass with deep blur." },
  { id: "enterprise", label: "Enterprise", dot: "#4c8dff", desc: "Calm, dense and dependable. GitHub-grade." },
];
