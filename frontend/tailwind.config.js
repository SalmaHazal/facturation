/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Ensure Tailwind scans all your React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

