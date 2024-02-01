/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "red-main": "#EA1D2C",
        "background-second": "#f7f7f7",
        "text-main": "#3e3e3e",
        "yellow-star": "#ED8A19",
      },
      gridTemplateColumns: {
        card: "1fr 2fr",
      },
    },
    backgroundImage: {
      "foods-pattern": "url('/foods-bg.png')",
    },
  },
  plugins: [],
}
