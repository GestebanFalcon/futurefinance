/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      spacing: {
        "128": "32rem",
        "144": "36rem"
      }
    },
  },
  plugins: [],
}
