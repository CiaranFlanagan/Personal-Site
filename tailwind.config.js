/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        galwayMaroon: {
          700: "#6B1740",
          500: "#B94E5D",
          200: "#5A1A22",
        },
        galwayWhite: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
