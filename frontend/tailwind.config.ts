import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E64833",
        secondary: "#003135 ",
        support_primary: "#024950",
        primary_text: "#ffffff",
        accent: "#ff6600",
      },
    },
  },
  plugins: [],
};
export default config;
