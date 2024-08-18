/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        secondary: "#6c757d",
        primaryHover: "#0069d9",
        secondaryHover: "#5a6268",
      },
    },
  },
  plugins: [],
};