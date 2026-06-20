"use client";

import { ActionButton } from "../../primitives/Button";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface PartialFailureStateProps {
  succeeded?: number;
  failed?: number;
  onRetryFailed?: () => void;
  theme?: ThemeInput;
}

export function PartialFailureState({ succeeded = 0, failed = 0, onRetryFailed, theme }: PartialFailureStateProps) {
  return (
    <ThemeScope theme={theme}>
      <div
        role="alert"
        className="w-80 max-w-full overflow-hidden rounded-xl border"
        style={{ borderColor: "var(--sk-border)", background: "var(--sk-surface)" }}
      >
        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: "var(--sk-border)" }}>
          <span className="text-[13px] font-semibold text-sk-text">Import results</span>
          <span
            className="rounded-[5px] px-2 py-[3px] font-mono text-[10px]"
            style={{ color: "#f7768e", background: "rgba(247,118,142,0.1)" }}
          >
            {failed} failed
          </span>
        </div>
        <div className="flex flex-col gap-[7px] p-4">
          <div className="flex items-center justify-between rounded-[8px] border px-3 py-[9px]" style={{ borderColor: "var(--sk-border)" }}>
            <span className="text-[12px] text-sk-muted">{succeeded} succeeded</span>
            <span className="font-mono text-[10px]" style={{ color: "#5ec98a" }}>
              ok
            </span>
          </div>
          <div
            className="flex animate-sk-failpulse items-center justify-between rounded-[8px] border px-3 py-[9px]"
            style={{ borderColor: "rgba(247,118,142,0.3)", background: "rgba(247,118,142,0.1)" }}
          >
            <span className="text-[12px] text-sk-muted">{failed} failed</span>
            <span className="font-mono text-[10px]" style={{ color: "#f7768e" }}>
              fail
            </span>
          </div>
        </div>
        {onRetryFailed && (
          <div className="border-t px-4 py-3" style={{ borderColor: "var(--sk-border)" }}>
            <ActionButton tone="error" variant="outline" onClick={onRetryFailed}>
              Retry failed
            </ActionButton>
          </div>
        )}
      </div>
    </ThemeScope>
  );
}
