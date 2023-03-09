/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        image: '396 / 226',
      },
      colors: {
        default: '#111827',
        secondary: '#666666',
        success: '#00B578',
      },
    },
  },
  plugins: [],
};
