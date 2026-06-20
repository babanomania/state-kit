/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("./tailwind-preset")],
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
