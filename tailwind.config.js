/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      colors: {
        violet: {
          50: '#fff3ed', 100: '#ffe4d8', 200: '#ffc8b0', 300: '#ffa17b',
          400: '#fb8057', 500: '#f26a3d', 600: '#e65e34', 700: '#c94926',
          800: '#a63d22', 900: '#87351f', 950: '#4b1a0d'
        }
      },
      boxShadow: { soft: '0 12px 40px rgba(38, 35, 27, .08)' }
    }
  },
  plugins: []
}
