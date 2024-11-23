/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#121212",
        "secondary-bg": "#1f1f1f",
        "primary-color": "#bb86fc",
        "secondary-color": "#03dac6",
        "accent-color": "#cf6679",
        "text-color": "#ffffff",
        "muted-text-color": "#888888",
      },
    },
  },
  plugins: [],
};
