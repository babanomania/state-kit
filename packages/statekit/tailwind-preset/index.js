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
    },
  },
  plugins: [],
};
