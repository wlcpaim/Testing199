/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#AA8C2C',
          light: '#F3E5AB',
        },
        dark: {
          DEFAULT: '#121212',
          card: '#1E1E1E',
          border: '#2A2A2A',
        },
        text: {
          light: '#F5F5F5',
          muted: '#A0A0A0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}