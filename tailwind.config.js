/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Galway GAA maroon, kept from the first version of this site.
        maroon: {
          700: "#6B1740",
          500: "#9E2D5C",
          100: "#F3E4EA",
        },
        ink: "#22201E",
        paper: "#FDFBF6",
        sand: "#EFE9DF",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
