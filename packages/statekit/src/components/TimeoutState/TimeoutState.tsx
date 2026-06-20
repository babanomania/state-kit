"use client";

import { CountdownRingGlyph } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface TimeoutStateProps {
  timeoutMs?: number;
  onRetry?: () => void;
  elapsed?: number;
  theme?: ThemeInput;
}

export function TimeoutState({ timeoutMs = 30000, onRetry, elapsed, theme }: TimeoutStateProps) {
  const seconds = Math.round((elapsed ?? timeoutMs) / 1000);

  return (
    <ThemeScope theme={theme}>
      <div role="alert">
        <StateLayout
          icon={<CountdownRingGlyph label={`${seconds}s`} />}
          title="Request timed out"
          description="The server took too long to respond."
          action={
            onRetry ? (
              <ActionButton tone="warning" variant="outline" onClick={onRetry}>
                Retry
              </ActionButton>
            ) : undefined
          }
        />
      </div>
    </ThemeScope>
  );
}
