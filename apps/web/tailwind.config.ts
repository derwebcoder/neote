/*

  !!! This file only exists so that the tailwind vs code extension can work properly
  see https://github.com/tailwindlabs/tailwindcss/discussions/15132
*/

/** @type {import('tailwindcss').Config} **/
export default {
  content: ["./index.html", "./src/**/.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
