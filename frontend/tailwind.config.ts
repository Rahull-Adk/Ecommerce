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
        primary: "#6E54B5",
        secondary: "#003135",
        support_primary: "#F5F5F5",
        primary_text: "#000000",
        darkmode_support_primary: "#2B2738",
        darkmode_support_background: "#3B364B",
        darkmode_primary: "#C5ADF7",
        text_for_form: "#949191"
      },
    },
  },
  plugins: [],
};
export default config;
