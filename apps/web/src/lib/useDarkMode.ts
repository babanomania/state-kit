"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "statekit-site-theme";

function applyClass(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

export function useDarkMode() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const next = stored ? stored === "dark" : true;
    setDark(next);
    applyClass(next);
  }, []);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      applyClass(next);
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      return next;
    });
  }, []);

  return { dark, toggle };
}
