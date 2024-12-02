/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'Arial', 'sans-serif'],
        montserrat: ['Montserrat', 'Arial', 'sans-serif']
      },
      colors: {
        primary: {
          lighter: '#74aee1',
          light: '#4693d7',
          DEFAULT: '#1879CD',
          dark: '#1360a4',
          darker: '#0c3c66'
        },
        secondary: {
          lighter: '#d9e7d4',
          light: '#a8c99b',
          DEFAULT: '#83B271',
          dark: '#5b7c4f',
          darker: '#34472d'
        },
        warning: {
          lighter: '#f6edc9',
          light: '#eddc93',
          DEFAULT: '#E1C54B',
          dark: '#cab143',
          darker: '#b49d3c'
        },
        danger: {
          lighter: '#ee8585',
          light: '#e33b3c',
          DEFAULT: '#DD0B0C',
          dark: '#b00809',
          darker: '#840607'
        }
      }
    }
  },
  plugins: [require('daisyui')]
};
