/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./projects/uthark/src/**/*.{html,ts,css}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}