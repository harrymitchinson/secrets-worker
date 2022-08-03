/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'var(--color-bg-accent-500)',
          100: 'var(--color-bg-accent-100)',
          200: 'var(--color-bg-accent-200)',
          300: 'var(--color-bg-accent-300)',
          400: 'var(--color-bg-accent-400)',
          500: 'var(--color-bg-accent-500)',
          500: 'var(--color-bg-accent-500)',
          600: 'var(--color-bg-accent-600)',
          700: 'var(--color-bg-accent-700)',
          800: 'var(--color-bg-accent-800)',
          900: 'var(--color-bg-accent-900)',
        }
      },
    },
  },
  plugins: [],
};
