import { useEffect, useRef } from "react";

/**
 * Moves focus to the returned ref's element on mount when `enabled` — used by alert-role surfaces
 * so the primary action is immediately reachable without tabbing, per the library's a11y convention.
 */
export function useAutoFocus<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (enabled) ref.current?.focus();
  }, [enabled]);

  return ref;
}
