"use client";

import type { ReactNode } from "react";
import { ErrorState } from "../ErrorState";
import { Spinner } from "../Spinner";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface StateBoundaryProps {
  loading?: boolean;
  error?: Error | string | null;
  data?: unknown;
  loadingFallback?: ReactNode;
  errorFallback?: ReactNode;
  onRetry?: () => void;
  theme?: ThemeInput;
  children: ReactNode;
}

/** The lightweight cousin of DataStateBoundary — just loading/error passthrough, no empty/offline handling. */
export function StateBoundary({
  loading = false,
  error,
  loadingFallback,
  errorFallback,
  onRetry,
  theme,
  children,
}: StateBoundaryProps) {
  if (loading) {
    return (
      <ThemeScope theme={theme}>
        {loadingFallback ?? (
          <div className="flex items-center justify-center p-8">
            <Spinner />
          </div>
        )}
      </ThemeScope>
    );
  }

  if (error) {
    return (
      <ThemeScope theme={theme}>
        {errorFallback ?? (
          <ErrorState
            variant="friendly"
            error={error instanceof Error ? error : new Error(String(error))}
            retry={onRetry}
          />
        )}
      </ThemeScope>
    );
  }

  return <>{children}</>;
}
