const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        "sk-accent": "var(--sk-accent)",
        "sk-accent-solid": "var(--sk-accent-solid)",
        "sk-surface": "var(--sk-surface)",
        "sk-border": "var(--sk-border)",
        "sk-text": "var(--sk-text)",
        "sk-muted": "var(--sk-muted)",
        "sk-icon-bg": "var(--sk-icon-bg)",
        "sk-btn-bg": "var(--sk-btn-bg)",
        "sk-btn-text": "var(--sk-btn-text)",
      },
      borderRadius: {
        "sk-radius": "var(--sk-radius)",
      },
      backdropBlur: {
        "sk-blur": "var(--sk-blur)",
      },
      boxShadow: {
        sk: "var(--sk-shadow)",
        "sk-icon": "var(--sk-icon-glow)",
        "sk-btn": "var(--sk-btn-glow)",
      },
      // Keyframes ported verbatim from the design/*.dc.html prototypes — the
      // full sk-* catalog listed in CLAUDE.md's Motion system section.
      keyframes: {
        "sk-spin": { to: { transform: "rotate(360deg)" } },
        "sk-spin-rev": { to: { transform: "rotate(-360deg)" } },
        "sk-pulse": {
          "0%, 100%": { opacity: ".35", transform: "scale(.9)" },
          "50%": { opacity: "1", transform: "scale(1)" },
        },
        "sk-breathe": {
          "0%, 100%": { opacity: ".5" },
          "50%": { opacity: "1" },
        },
        "sk-shimmer": {
          "0%": { backgroundPosition: "-160% 0" },
          "100%": { backgroundPosition: "260% 0" },
        },
        "sk-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-7px)" },
        },
        "sk-float2": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(7px)" },
        },
        "sk-bar": {
          "0%, 100%": { transform: "scaleY(.3)", opacity: ".45" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
        "sk-signal": {
          "0%, 70%, 100%": { opacity: "1" },
          "80%, 95%": { opacity: ".15" },
        },
        "sk-glitch": {
          "0%, 100%": { transform: "translate(0,0)" },
          "18%": { transform: "translate(-2px,1px)" },
          "22%": { transform: "translate(2px,-1px)" },
          "40%": { transform: "translate(0,0)" },
          "70%": { transform: "translate(1px,1px)" },
        },
        "sk-lock": {
          "0%, 100%": { transform: "translateY(0)" },
          "8%": { transform: "translateY(-4px)" },
          "16%": { transform: "translateY(0)" },
        },
        "sk-failpulse": {
          "0%, 100%": { opacity: ".5" },
          "50%": { opacity: "1" },
        },
        "sk-orbit-a": {
          from: { transform: "rotate(0)" },
          to: { transform: "rotate(360deg)" },
        },
        "sk-ring": {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "170" },
        },
        "sk-ringfill": {
          "0%": { strokeDashoffset: "170" },
          "70%, 100%": { strokeDashoffset: "42" },
        },
        "sk-dash": { to: { strokeDashoffset: "-32" } },
        "sk-draw": {
          "0%": { strokeDashoffset: "36" },
          "38%, 100%": { strokeDashoffset: "0" },
        },
        "sk-pop": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "60%": { transform: "scale(1.18)" },
          "80%": { transform: "scale(.94)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "sk-spring": {
          "0%": { transform: "translateY(34px)", opacity: "0" },
          "55%": { transform: "translateY(-7px)", opacity: "1" },
          "72%": { transform: "translateY(3px)" },
          "100%": { transform: "translateY(0)" },
        },
        "sk-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "12%": { transform: "translateX(-7px)" },
          "28%": { transform: "translateX(6px)" },
          "44%": { transform: "translateX(-4px)" },
          "60%": { transform: "translateX(3px)" },
          "76%": { transform: "translateX(-1px)" },
        },
        "sk-confetti": {
          "0%": { transform: "translateY(0) rotate(0)", opacity: "0" },
          "12%": { opacity: "1" },
          "100%": { transform: "translateY(64px) rotate(220deg)", opacity: "0" },
        },
        "sk-type": {
          "0%": { width: "0" },
          "70%, 100%": { width: "100%" },
        },
        "sk-caret": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "sk-typedot": {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: ".4" },
          "30%": { transform: "translateY(-6px)", opacity: "1" },
        },
        "sk-roll": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-90px)" },
        },
        "sk-fadeloop": {
          "0%": { opacity: "0", transform: "translateY(9px)" },
          "28%": { opacity: "1", transform: "translateY(0)" },
          "78%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(9px)" },
        },
        "sk-fadeup": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "sk-streak": {
          "0%": { transform: "translateX(-140%) skewX(-18deg)" },
          "100%": { transform: "translateX(260%) skewX(-18deg)" },
        },
        "sk-prog": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(360%)" },
        },
        "sk-aurora": {
          "0%": { transform: "translate(-12%,-8%) rotate(0deg)" },
          "50%": { transform: "translate(10%,8%) rotate(180deg)" },
          "100%": { transform: "translate(-12%,-8%) rotate(360deg)" },
        },
        "sk-rowfail": {
          "0%, 40%": { background: "rgba(127,127,140,0.14)" },
          "55%, 100%": { background: "rgba(247,118,142,0.14)" },
        },
        "sk-flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".05" },
        },
      },
      animation: {
        "sk-spin": "sk-spin 1s linear infinite",
        "sk-spin-slow": "sk-spin 6s linear infinite",
        "sk-spin-rev": "sk-spin-rev 1s linear infinite",
        "sk-spin-rev-slow": "sk-spin-rev 4s linear infinite",
        "sk-pulse": "sk-pulse 1.2s ease-in-out infinite",
        "sk-breathe": "sk-breathe 2.4s ease-in-out infinite",
        "sk-shimmer": "sk-shimmer 1.4s linear infinite",
        "sk-float": "sk-float 3s ease-in-out infinite",
        "sk-float2": "sk-float2 3.4s ease-in-out infinite",
        "sk-bar": "sk-bar 1.1s ease-in-out infinite",
        "sk-signal": "sk-signal 3s ease-in-out infinite",
        "sk-glitch": "sk-glitch 3s steps(1,end) infinite",
        "sk-lock": "sk-lock 3.2s ease-in-out infinite",
        "sk-failpulse": "sk-failpulse 1.8s ease-in-out infinite",
        "sk-orbit-a": "sk-orbit-a 1.8s linear infinite",
        "sk-orbit-a-rev": "sk-orbit-a 1.2s linear infinite reverse",
        "sk-ring": "sk-ring 4s linear infinite",
        "sk-ringfill": "sk-ringfill 2.6s ease-in-out infinite",
        "sk-dash": "sk-dash 2s linear infinite",
        "sk-draw": "sk-draw 2.4s ease-in-out infinite",
        "sk-pop": "sk-pop 2.4s ease-in-out infinite",
        "sk-spring": "sk-spring 2.6s ease-in-out infinite",
        "sk-shake": "sk-shake 2.6s ease-in-out infinite",
        "sk-confetti": "sk-confetti 2.2s ease-in infinite",
        "sk-type": "sk-type 3s steps(18,end) infinite",
        "sk-caret": "sk-caret .8s step-end infinite",
        "sk-typedot": "sk-typedot 1.3s ease-in-out infinite",
        "sk-roll": "sk-roll 2.4s cubic-bezier(.5,0,.2,1) infinite",
        "sk-fadeloop": "sk-fadeloop 2.6s ease-in-out infinite",
        "sk-fadeup": "sk-fadeup .5s ease-out both",
        "sk-streak": "sk-streak 2.4s ease-in-out infinite",
        "sk-prog": "sk-prog 1.4s ease-in-out infinite",
        "sk-aurora": "sk-aurora 18s linear infinite",
        "sk-rowfail": "sk-rowfail 3s ease-in-out infinite",
        "sk-flicker": "sk-flicker 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    // Global prefers-reduced-motion handling: any animate-sk-* utility collapses
    // to a single, near-instant pass so it settles on its final keyframe instead
    // of looping — ambient motion goes static, meaningful motion freezes at its
    // resolved state. Components still need a static text/ARIA fallback for
    // anything motion alone was conveying (see CLAUDE.md accessibility section).
    plugin(({ addBase }) => {
      addBase({
        "@media (prefers-reduced-motion: reduce)": {
          '[class*="animate-sk-"]': {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
          },
        },
      });
    }),
  ],
};
