import type { CSSProperties } from "react";

/** Shared shimmer gradient used by skeleton-style placeholders across the Data category. */
export const shimmerStyle: CSSProperties = {
  background: "linear-gradient(90deg,var(--sk-border),var(--sk-surface),var(--sk-border))",
  backgroundSize: "200% 100%",
};
