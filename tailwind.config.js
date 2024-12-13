/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customOrange: '#b94322', // your custom color code
        customGreen: '#28A745', // another custom color (optional)
      },
    },
  },
  plugins: [],
}

