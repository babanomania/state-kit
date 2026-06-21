"use client";

import { useEffect, useState } from "react";
import { ErrorGlyph, RetryArrowIcon } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { useAutoFocus } from "../../primitives/useAutoFocus";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface RetryStateProps {
  onRetry: () => void;
  autoRetry?: number;
  maxAttempts?: number;
  theme?: ThemeInput;
}

export function RetryState({ onRetry, autoRetry, maxAttempts = 3, theme }: RetryStateProps) {
  const actionRef = useAutoFocus<HTMLButtonElement>(true);
  const [attempts, setAttempts] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(autoRetry ? Math.ceil(autoRetry / 1000) : 0);
  const autoRetryActive = Boolean(autoRetry) && attempts < maxAttempts;

  useEffect(() => {
    if (!autoRetryActive) return;
    const id = setTimeout(() => {
      if (secondsLeft <= 0) {
        setAttempts((a) => a + 1);
        onRetry();
        setSecondsLeft(Math.ceil((autoRetry as number) / 1000));
      } else {
        setSecondsLeft((s) => s - 1);
      }
    }, 1000);
    return () => clearTimeout(id);
  }, [autoRetryActive, secondsLeft, autoRetry, onRetry]);

  const description = autoRetryActive
    ? `Retrying automatically in ${secondsLeft} second${secondsLeft === 1 ? "" : "s"}…`
    : "The request didn't go through.";

  return (
    <ThemeScope theme={theme}>
      <div role="alert">
        <StateLayout
          icon={<ErrorGlyph />}
          title="Request failed"
          description={description}
          action={
            <ActionButton ref={actionRef} tone="error" variant="outline" icon={<RetryArrowIcon />} onClick={onRetry}>
              Retry now
            </ActionButton>
          }
        />
      </div>
    </ThemeScope>
  );
}
