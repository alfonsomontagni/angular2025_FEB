/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/seabook/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

}