      /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: [
          "./projects/gettry001/src/**/*.{html,ts}",
        ],
        theme: {
          extend: {},
        },
        plugins: [require("daisyui")],

      }