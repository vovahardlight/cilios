/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#FBF9F5',
          100: '#F5F0E6',
          200: '#E8DEC8',
        },
        noir: {
          900: '#181716',
          800: '#262422',
          700: '#3D3A37',
        },
        terracotta: {
          500: '#C07A58',
          600: '#A96544',
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