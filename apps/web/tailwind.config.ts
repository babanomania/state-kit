import type { Config } from "tailwindcss";

const config: Config = {
  presets: [require("statekit/tailwind-preset")],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
