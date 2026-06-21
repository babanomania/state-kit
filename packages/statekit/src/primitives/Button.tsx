"use client";

import { forwardRef, type ButtonHTMLAttributes, type CSSProperties, type ReactNode, type Ref } from "react";

export type ButtonTone = "accent" | "error" | "warning" | "success";
export type ButtonVariant = "solid" | "outline";

export interface ActionButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "href"> {
  tone?: ButtonTone;
  variant?: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
  /** Renders as a real <a> instead of a <button> for navigation-only actions (e.g. a status page link). */
  href?: string;
}

const outlineTones: Record<ButtonTone, CSSProperties> = {
  accent: { color: "#8b7cff", background: "rgba(139,124,255,0.12)", borderColor: "rgba(139,124,255,0.3)" },
  error: { color: "#f7768e", background: "rgba(247,118,142,0.12)", borderColor: "rgba(247,118,142,0.3)" },
  warning: { color: "#e0c060", background: "rgba(224,192,96,0.1)", borderColor: "rgba(224,192,96,0.25)" },
  success: { color: "#5ec98a", background: "rgba(94,201,138,0.1)", borderColor: "rgba(94,201,138,0.2)" },
};

/** Real <button> (or <a> when `href` is given), themeable via CSS vars for the "accent" solid case. */
export const ActionButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, ActionButtonProps>(function ActionButton(
  { tone = "accent", variant = "solid", icon, children, className, style, href, ...rest },
  ref,
) {
  const isSolidAccent = variant === "solid" && tone === "accent";
  const resolvedClassName = isSolidAccent
    ? `inline-flex items-center gap-2 rounded-[10px] px-[18px] py-[9px] text-[13px] font-medium shadow-sk-btn transition-opacity hover:opacity-90 ${className ?? ""}`
    : `inline-flex items-center gap-2 rounded-[10px] border px-[18px] py-[9px] text-[13px] font-medium transition-opacity hover:opacity-90 ${className ?? ""}`;
  const resolvedStyle = isSolidAccent
    ? { background: "var(--sk-btn-bg)", color: "var(--sk-btn-text)", ...style }
    : { ...outlineTones[tone], ...style };

  if (href) {
    return (
      <a href={href} ref={ref as Ref<HTMLAnchorElement>} className={resolvedClassName} style={resolvedStyle}>
        {icon}
        {children}
      </a>
    );
  }
  return (
    <button {...rest} ref={ref as Ref<HTMLButtonElement>} className={resolvedClassName} style={resolvedStyle}>
      {icon}
      {children}
    </button>
  );
});
