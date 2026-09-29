/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#070707',
          900: '#0D0D0D',
          850: '#141312',
          800: '#1C1B19',
        },
        gold: {
          300: '#E9DCC9',
          400: '#CDB58E',
          500: '#B99A70',
          600: '#8F714D',
        },
        goldAccent: '#D4AF37',
        cream: {
          50: '#FAF8F5',
          100: '#F0ECE1',
          200: '#E2DCCE',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}