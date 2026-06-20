"use client";

import { SignalBarsIcon } from "../../icons";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface ReconnectingStateProps {
  attempt?: number;
  nextRetryIn?: number;
  theme?: ThemeInput;
}

export function ReconnectingState({ attempt = 1, nextRetryIn, theme }: ReconnectingStateProps) {
  const description =
    nextRetryIn === undefined
      ? "Trying to restore your connection."
      : `Attempt ${attempt} — retrying in ${nextRetryIn} second${nextRetryIn === 1 ? "" : "s"}.`;

  return (
    <ThemeScope theme={theme}>
      <div role="status" aria-live="polite">
        <StateLayout
          icon={<div className="animate-sk-pulse"><SignalBarsIcon /></div>}
          title="Reconnecting…"
          description={description}
          maxDescriptionWidth={260}
        />
      </div>
    </ThemeScope>
  );
}
