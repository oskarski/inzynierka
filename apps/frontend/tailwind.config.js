const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--adm-font-family)', ...fontFamily.sans],
      },
      aspectRatio: {
        image: '396 / 226',
      },
      colors: {
        default: 'var(--adm-color-text)',
        secondary: 'var(--adm-color-text-secondary)',
        success: 'var(--adm-color-success)',
        primary: 'var(--adm-color-primary)',
      },
      opacity: {
        55: '.55',
      },
      maxHeight: {
        '80-screen': '80vh',
      },
      minWidth: {
        70: '17.5rem',
        64: '16rem',
      },
    },
  },
  plugins: [],
};
