/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'xl': '2px 50px 100px 2px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
