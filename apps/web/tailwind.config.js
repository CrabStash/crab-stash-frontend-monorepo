/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("../../packages/ui/tailwind.config.js")],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/components/**/*.{js,ts,jsx,tsx}",
  ],
};
