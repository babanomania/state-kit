"use client";

import { useEffect, useState, type ReactNode } from "react";
import { EmptyState } from "../EmptyState";
import { ErrorState } from "../ErrorState";
import { OfflineState } from "../OfflineState";
import { Spinner } from "../Spinner";
import { ThemeScope, type ThemeInput } from "../../theme/StateProvider";

export interface DataStateBoundaryProps<T> {
  loading?: boolean;
  error?: Error | string | null;
  data?: T;
  onRetry?: () => void;
  isEmpty?: (data: T | undefined) => boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  theme?: ThemeInput;
  children: ReactNode | ((data: T) => ReactNode);
}

function defaultIsEmpty(data: unknown): boolean {
  if (data === undefined || data === null) return true;
  if (Array.isArray(data)) return data.length === 0;
  return false;
}

function useIsOffline(): boolean {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    const id = setTimeout(() => setIsOffline(!navigator.onLine), 0);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      clearTimeout(id);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOffline;
}

/** The flagship boundary: wraps a data fetch and auto-renders loading, error, empty, and offline fallbacks. */
export function DataStateBoundary<T>({
  loading = false,
  error,
  data,
  onRetry,
  isEmpty = defaultIsEmpty,
  emptyTitle = "Nothing here yet",
  emptyDescription,
  theme,
  children,
}: DataStateBoundaryProps<T>) {
  const isOffline = useIsOffline();

  if (loading) {
    return (
      <ThemeScope theme={theme}>
        <div className="flex items-center justify-center p-8">
          <Spinner />
        </div>
      </ThemeScope>
    );
  }

  if (isOffline) {
    return (
      <ThemeScope theme={theme}>
        <OfflineState onReconnect={onRetry} />
      </ThemeScope>
    );
  }

  if (error) {
    return (
      <ThemeScope theme={theme}>
        <ErrorState
          variant="friendly"
          error={error instanceof Error ? error : new Error(String(error))}
          retry={onRetry}
        />
      </ThemeScope>
    );
  }

  if (isEmpty(data)) {
    return (
      <ThemeScope theme={theme}>
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </ThemeScope>
    );
  }

  return <>{typeof children === "function" ? (children as (data: T) => ReactNode)(data as T) : children}</>;
}
