/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'], // Set Lato as the default body font
        heading: ['Montserrat', 'sans-serif'] // Set Montserrat for headings
      }
    }
  },
  plugins: []
};
