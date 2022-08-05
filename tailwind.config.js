const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        enter: 'enter 200ms ease-out forwards',
        leave: 'leave 200ms ease-in forwards',
      },
      fontFamily: {
        mono: ['"Roboto Mono"', ...defaultTheme.fontFamily.mono]
      }
    },
  },
  plugins: [],
};
