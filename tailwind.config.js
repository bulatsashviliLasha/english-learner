/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },
    screens: {
      'lg': {'max': '1280px'},
      'md': {'max': '1040px'},
      'sm': {'max': '440px'},
    }
  },
  plugins: [],
}