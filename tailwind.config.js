/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        carrot: {
          DEFAULT: "rgb(255 125 88)",
          100: "#FF5D2E",
        },
      },
    },
  },
  plugins: [],
};
