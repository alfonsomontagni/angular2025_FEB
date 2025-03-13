      /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: [
          "./projects/dp001/src/**/*.{html,ts}",
        ],
        theme: {
          extend: {},
        },
        plugins: [require("daisyui")],

      }