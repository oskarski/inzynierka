const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--adm-font-family)', ...fontFamily.sans],
      },
      aspectRatio: {
        image: '396 / 226',
      },
      colors: {
        default: '#111827',
        secondary: '#666666',
        success: '#00B578',
      },
      opacity: {
        55: '.55',
      },
      maxHeight: {
        '90-screen': '90vh',
      },
    },
  },
  plugins: [],
};
