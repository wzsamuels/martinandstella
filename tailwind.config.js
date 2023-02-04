/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: "#609f51",
        lightGreen: "#9fd067"
      },
      keyframes: {
        fromBottom: {
          'from': {bottom: '-300px', opacity:0},
          'to': {bottom: 0, opacity:1}
        },
        fromLeft: {
          'from': {left: '-300px', opacity:0},
          'to': {left:0, opacity:1}
        },
        fromRight: {
          'from': {right: '-300px', opacity:0},
          'to': {right:0, opacity:1}
        },
        fadeIn: {
          'from': {opacity: 0},
          'to': {opacity: 1}
        }
      }
    },
  },
  plugins: [],
}