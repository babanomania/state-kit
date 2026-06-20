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
        "sk-surface": "var(--sk-surface)",
        "sk-border": "var(--sk-border)",
      },
      borderRadius: {
        "sk-radius": "var(--sk-radius)",
      },
      backdropBlur: {
        "sk-blur": "var(--sk-blur)",
      },
    },
  },
  plugins: [],
};
