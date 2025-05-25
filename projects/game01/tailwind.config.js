/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./projects/game01/src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
