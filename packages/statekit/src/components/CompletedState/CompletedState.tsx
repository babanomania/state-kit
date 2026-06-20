"use client";

import { SuccessGlyph } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface CompletedStateProps {
  title: string;
  description?: string;
  onDone?: () => void;
  confetti?: boolean;
  theme?: ThemeInput;
}

const confettiColors = ["#8b7cff", "#4fd6e0", "#5ec98a", "#e0c060"];

export function CompletedState({ title, description, onDone, confetti = false, theme }: CompletedStateProps) {
  return (
    <ThemeScope theme={theme}>
      <div role="status" aria-live="polite">
        <StateLayout
          icon={
            <div className="relative">
              <SuccessGlyph />
              {confetti && (
                <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                  {confettiColors.map((color, i) => (
                    <span
                      key={color}
                      className="absolute h-1.5 w-1.5 animate-sk-confetti rounded-sm"
                      style={{ left: `${10 + i * 12}%`, top: "40%", background: color, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              )}
            </div>
          }
          title={title}
          description={description}
          action={
            onDone ? (
              <ActionButton tone="success" onClick={onDone}>
                Continue
              </ActionButton>
            ) : undefined
          }
        />
      </div>
    </ThemeScope>
  );
}
