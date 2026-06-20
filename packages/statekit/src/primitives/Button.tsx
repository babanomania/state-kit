"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export type ButtonTone = "accent" | "error" | "warning" | "success";
export type ButtonVariant = "solid" | "outline";

export interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonTone;
  variant?: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
}

const outlineTones: Record<ButtonTone, CSSProperties> = {
  accent: { color: "#8b7cff", background: "rgba(139,124,255,0.12)", borderColor: "rgba(139,124,255,0.3)" },
  error: { color: "#f7768e", background: "rgba(247,118,142,0.12)", borderColor: "rgba(247,118,142,0.3)" },
  warning: { color: "#e0c060", background: "rgba(224,192,96,0.1)", borderColor: "rgba(224,192,96,0.25)" },
  success: { color: "#5ec98a", background: "rgba(94,201,138,0.1)", borderColor: "rgba(94,201,138,0.2)" },
};

/** Real <button>, themeable via CSS vars for the "accent" solid case — never a hardcoded theme color. */
export function ActionButton({
  tone = "accent",
  variant = "solid",
  icon,
  children,
  className,
  style,
  ...rest
}: ActionButtonProps) {
  if (variant === "solid" && tone === "accent") {
    return (
      <button
        {...rest}
        className={`inline-flex items-center gap-2 rounded-[10px] px-[18px] py-[9px] text-[13px] font-medium shadow-sk-btn transition-opacity hover:opacity-90 ${className ?? ""}`}
        style={{ background: "var(--sk-btn-bg)", color: "var(--sk-btn-text)", ...style }}
      >
        {icon}
        {children}
      </button>
    );
  }
  return (
    <button
      {...rest}
      className={`inline-flex items-center gap-2 rounded-[10px] border px-[18px] py-[9px] text-[13px] font-medium transition-opacity hover:opacity-90 ${className ?? ""}`}
      style={{ ...outlineTones[tone], ...style }}
    >
      {icon}
      {children}
    </button>
  );
}
