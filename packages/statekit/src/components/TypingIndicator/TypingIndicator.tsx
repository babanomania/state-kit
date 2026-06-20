"use client";

import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface TypingIndicatorProps {
  variant?: "dots" | "typewriter";
  active?: boolean;
  text?: string;
  theme?: ThemeInput;
}

export function TypingIndicator({ variant = "dots", active = true, text = "Generating response…", theme }: TypingIndicatorProps) {
  if (!active) return null;

  return (
    <ThemeScope theme={theme}>
      <div role="status" aria-live="polite">
        {variant === "typewriter" ? (
          <div className="flex items-center font-mono text-[15px]" style={{ color: "var(--sk-text)" }} aria-hidden="true">
            <div className="animate-sk-type overflow-hidden whitespace-nowrap">{text}</div>
            <span className="ml-1 h-[18px] w-2 animate-sk-caret" style={{ background: "var(--sk-accent-solid)" }} />
          </div>
        ) : (
          <div
            className="flex items-center gap-1.5 rounded-[14px] border px-[18px] py-3.5"
            style={{ borderColor: "var(--sk-border)", background: "var(--sk-surface)" }}
            aria-hidden="true"
          >
            {[0, 0.18, 0.36].map((delay, i) => (
              <div
                key={i}
                className="h-2.5 w-2.5 animate-sk-typedot rounded-full"
                style={{ background: "var(--sk-muted)", animationDelay: `${delay}s` }}
              />
            ))}
          </div>
        )}
        <span className="sr-only">{text}</span>
      </div>
    </ThemeScope>
  );
}
