"use client";

import { ErrorGlyph, RetryArrowIcon } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { useAutoFocus } from "../../primitives/useAutoFocus";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface ServerErrorStateProps {
  status?: number;
  statusPageUrl?: string;
  retry?: () => void;
  theme?: ThemeInput;
}

const statusCopy: Record<number, { label: string; description: string }> = {
  500: { label: "Server error", description: "Our servers hit a snag. We've been notified." },
  502: { label: "Bad gateway", description: "The upstream server returned an invalid response." },
  503: { label: "Service unavailable", description: "We're temporarily over capacity. Back shortly." },
  504: { label: "Gateway timeout", description: "The upstream server took too long to respond." },
};

export function ServerErrorState({ status = 500, statusPageUrl, retry, theme }: ServerErrorStateProps) {
  const copy = statusCopy[status] ?? statusCopy[500];
  const actionRef = useAutoFocus<HTMLButtonElement>(Boolean(retry));

  return (
    <ThemeScope theme={theme}>
      <div role="alert">
        <StateLayout
          icon={<ErrorGlyph />}
          title={`${copy.label} · ${status}`}
          description={copy.description}
          action={
            retry ? (
              <ActionButton ref={actionRef} tone="error" variant="outline" icon={<RetryArrowIcon />} onClick={retry}>
                Reload
              </ActionButton>
            ) : undefined
          }
          extra={
            statusPageUrl ? (
              <a href={statusPageUrl} className="font-mono text-[12px] text-sk-muted underline">
                Status page
              </a>
            ) : undefined
          }
        />
      </div>
    </ThemeScope>
  );
}
