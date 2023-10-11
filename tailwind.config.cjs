/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,mdoc,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // https://www.pantone.com/color-of-the-year/2023
        'viva': {
            '50': '#fef2f3',
            '100': '#fce7e8',
            '200': '#f9d2d7',
            '300': '#f4adb6',
            '400': '#ed7f8e',
            '500': '#e25169',
            '600': '#ce3052',
            '700': '#ad2344',
            '800': '#91203e',
            '900': '#7c1f3a',
            '950': '#450c1c',
        },

      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
