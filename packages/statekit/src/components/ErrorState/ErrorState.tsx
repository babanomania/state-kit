"use client";

import { ErrorGlyph, RetryArrowIcon } from "../../icons";
import { ActionButton } from "../../primitives/Button";
import { StateLayout } from "../../primitives/StateLayout";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export type ErrorStateVariant = "friendly" | "technical" | "enterprise";

export interface ErrorStateProps {
  variant?: ErrorStateVariant;
  title?: string;
  retry?: () => void;
  error?: Error;
  theme?: ThemeInput;
}

const copy: Record<ErrorStateVariant, { title: string; description: string; action: string }> = {
  friendly: {
    title: "Something went wrong",
    description: "We couldn't complete your request. Please try again.",
    action: "Try again",
  },
  technical: {
    title: "Request failed",
    description: "GET /api/users — 500 Internal Server Error",
    action: "Retry",
  },
  enterprise: {
    title: "Unable to load data",
    description: "Reference ID: 8F2A-4C91. Contact your administrator if this persists.",
    action: "Reload",
  },
};

export function ErrorState({ variant = "friendly", title, retry, error, theme }: ErrorStateProps) {
  const variantCopy = copy[variant];

  return (
    <ThemeScope theme={theme}>
      <div role="alert">
        <StateLayout
          icon={<ErrorGlyph />}
          title={title ?? variantCopy.title}
          description={variantCopy.description}
          maxDescriptionWidth={320}
          extra={
            variant === "technical" && error ? (
              <div
                className="rounded-[7px] border px-3 py-2 font-mono text-[11px]"
                style={{ borderColor: "var(--sk-border)", background: "var(--sk-surface)", color: "var(--sk-muted)" }}
              >
                {error.message}
              </div>
            ) : undefined
          }
          action={
            retry ? (
              <ActionButton tone="error" variant="outline" icon={<RetryArrowIcon />} onClick={retry}>
                {variantCopy.action}
              </ActionButton>
            ) : undefined
          }
        />
      </div>
    </ThemeScope>
  );
}
