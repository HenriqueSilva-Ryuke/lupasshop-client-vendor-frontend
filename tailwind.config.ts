import type { Config } from "tailwindcss";

const config: Config = {
  // Force dark mode to only activate via the custom class, never via system settings
  darkMode: ["class", ".force-dark"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
};

export default config;
