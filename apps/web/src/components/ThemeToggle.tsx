"use client";

import { useDarkMode } from "../lib/useDarkMode";

/**
 * Animated sun ⇄ moon toggle. The moon is the main disc with a second disc masked
 * out to carve a crescent; sliding that bite away (and fading the rays in) morphs it
 * into a sun. All motion is pure CSS transition, so it honours prefers-reduced-motion
 * via the global `motion-reduce` rules and degrades to an instant snap where SVG
 * geometry transitions aren't supported.
 */
export function ThemeToggle() {
  const { dark, toggle } = useDarkMode();

  return (
    <button
      type="button"
      data-testid="theme-toggle"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] text-[#5d5d66] transition-colors hover:text-[#1a1a1d] dark:border-white/10 dark:text-[#9c9caa] dark:hover:text-[#e9e9ef]"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <mask id="sk-theme-toggle-bite">
          <rect x="0" y="0" width="24" height="24" fill="white" />
          <circle
            cx="18"
            cy="6"
            r="7"
            fill="black"
            className="origin-center transition-transform duration-500 ease-in-out motion-reduce:transition-none"
            style={{ transform: dark ? "translate(0,0)" : "translate(6px,-6px)" }}
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#sk-theme-toggle-bite)"
          className="transition-all duration-500 ease-in-out motion-reduce:transition-none"
          r={dark ? 6.2 : 5}
        />
        <g
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          className="origin-center transition-all duration-500 ease-in-out motion-reduce:transition-none"
          style={{
            opacity: dark ? 0 : 1,
            transform: dark ? "rotate(-50deg) scale(0.4)" : "rotate(0deg) scale(1)",
          }}
        >
          <line x1="12" y1="1.5" x2="12" y2="3.6" />
          <line x1="12" y1="20.4" x2="12" y2="22.5" />
          <line x1="1.5" y1="12" x2="3.6" y2="12" />
          <line x1="20.4" y1="12" x2="22.5" y2="12" />
          <line x1="4.6" y1="4.6" x2="6.1" y2="6.1" />
          <line x1="17.9" y1="17.9" x2="19.4" y2="19.4" />
          <line x1="19.4" y1="4.6" x2="17.9" y2="6.1" />
          <line x1="6.1" y1="17.9" x2="4.6" y2="19.4" />
        </g>
      </svg>
    </button>
  );
}
