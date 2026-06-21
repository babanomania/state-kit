/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("./tailwind-preset/index.cjs")],
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
