/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          900: '#780000', // deep red
          600: '#C1121F', // bright red
        },
        secondary: {
          DEFAULT: '#003049', // navy blue
          light: '#669BBC', // light blue
        },
        cream: '#FDF0D5',
      },
    },
  },
  plugins: [],
};