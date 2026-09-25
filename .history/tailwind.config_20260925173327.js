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
          300: '#F3E5AB',
          400: '#E5C378',
          500: '#D4AF37',
          600: '#AA820A',
        },
        cream: {
          50: '#FAF8F5',
          100: '#F0ECE1',
          200: '#E2DCCE',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Didot', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow 4s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}