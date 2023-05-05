/** @type {import('tailwindcss').Config} */
const { blackA, mauve, violet, slate } = require('@radix-ui/colors');

module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      fontFamily: {
        'noto': ['"Noto Sans Simplified Chinese"']
      },
      colors: {
        ...blackA,
        ...mauve,
        ...violet,
        ...slate,
      },
    },
  },
  plugins: [],
}
