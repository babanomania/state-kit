"use client";

import { createContext, useContext, useMemo, type CSSProperties, type ReactNode } from "react";
import { createTheme } from "./createTheme";
import { themes, type ThemeName } from "./themes";
import type { Theme, ThemeTokens } from "./types";

export type ThemeInput = ThemeName | Theme | ThemeTokens;

function isResolvedTheme(theme: Theme | ThemeTokens): theme is Theme {
  return "cssVars" in theme;
}

function resolveTheme(theme: ThemeInput): Theme {
  if (typeof theme === "string") return themes[theme] ?? themes.aurora;
  if (isResolvedTheme(theme)) return theme;
  return createTheme(theme);
}

const StateKitThemeContext = createContext<Theme>(themes.aurora);

export interface StateProviderProps {
  theme?: ThemeInput;
  children: ReactNode;
}

/** Applies theme CSS vars to a scope via context; nested providers re-scope their subtree. */
export function StateProvider({ theme = "aurora", children }: StateProviderProps) {
  const resolved = useMemo(() => resolveTheme(theme), [theme]);

  return (
    <StateKitThemeContext.Provider value={resolved}>
      <div data-statekit-theme={resolved.name} style={resolved.cssVars as CSSProperties}>
        {children}
      </div>
    </StateKitThemeContext.Provider>
  );
}

/** Per-component theme prop: falls back to the ambient StateProvider when omitted. */
export function useTheme(localTheme?: ThemeInput): Theme {
  const ambient = useContext(StateKitThemeContext);
  return useMemo(
    () => (localTheme === undefined ? ambient : resolveTheme(localTheme)),
    [localTheme, ambient],
  );
}

export interface ThemeScopeProps {
  theme?: ThemeInput;
  children: ReactNode;
}

/** Wraps children in a re-scoped theme only when a local override is given; a no-op otherwise. */
export function ThemeScope({ theme, children }: ThemeScopeProps) {
  const resolved = useTheme(theme);
  if (theme === undefined) return <>{children}</>;
  return (
    <div data-statekit-theme={resolved.name} style={resolved.cssVars as CSSProperties}>
      {children}
    </div>
  );
}
