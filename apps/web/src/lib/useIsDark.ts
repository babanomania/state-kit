"use client";

import { useEffect, useState } from "react";

/**
 * Reactively tracks whether the page is in dark mode by observing the `dark` class on
 * <html> (toggled by useDarkMode). Lets any component follow the page theme without
 * sharing the toggle's state — e.g. to default the theme showcase to the light
 * `enterprise` theme when the page is light, and a dark theme when it's dark.
 */
export function useIsDark() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setDark(root.classList.contains("dark"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return dark;
}
