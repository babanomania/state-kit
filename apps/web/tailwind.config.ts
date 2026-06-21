import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("@babanomania/statekit/tailwind-preset")],
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
