/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cinza: "#acacac",
        "amarelo-escuro": "#c9a227",
        "cinza-escuro": "#eeeeee",
      },
      fontFamily: {
        opensans: ['"Open Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
