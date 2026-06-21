"use client";

import { useEffect, useState } from "react";
import { CountdownRingGlyph } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { useAutoFocus } from "../../primitives/useAutoFocus";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface RateLimitedStateProps {
  retryAfter: number;
  onUpgrade?: () => void;
  limit?: number;
  theme?: ThemeInput;
}

export function RateLimitedState({ retryAfter, onUpgrade, limit, theme }: RateLimitedStateProps) {
  const actionRef = useAutoFocus<HTMLButtonElement>(Boolean(onUpgrade));
  const [remaining, setRemaining] = useState(retryAfter);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => {
      setRemaining((r) => Math.max(0, r - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [remaining]);

  const description = limit
    ? `You've hit the ${limit}/min rate limit. Try again shortly.`
    : "You've hit the rate limit. Try again shortly.";

  return (
    <ThemeScope theme={theme}>
      <div role="alert">
        <StateLayout
          icon={<CountdownRingGlyph label={`${remaining}s`} />}
          title="Too many requests"
          description={description}
          maxDescriptionWidth={300}
          extra={<span className="font-mono text-[12px] text-sk-muted">Retry after {remaining}s</span>}
          action={
            onUpgrade ? (
              <ActionButton ref={actionRef} onClick={onUpgrade}>
                View plans
              </ActionButton>
            ) : undefined
          }
        />
      </div>
    </ThemeScope>
  );
}
