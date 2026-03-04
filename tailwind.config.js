/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0D2446',
        gold: '#F8BA17',
        'gold-light': '#FBDD8B',
        'gold-bg': '#FFF085',
        'slate-custom': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          700: '#314158',
          800: '#1E293B',
          900: '#0F172B',
        },
        'blue-light': '#DBEAFE',
        'blue-lighter': '#DFF2FE',
        'blue-bg': '#EFF6FF',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'floatUpDown 4s ease-in-out infinite',
        'float-delayed': 'floatUpDown 5s ease-in-out infinite 0.5s',
        'fade-in': 'fadeIn 1s ease-in',
        'coin-flip': 'coinFlip 3s ease-in-out infinite',
      },
      keyframes: {
        floatUpDown: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-200px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        coinFlip: {
          '0%': { transform: 'translate(-50%, -50%) rotateY(0deg)' },
          '50%': { transform: 'translate(-50%, -50%) rotateY(180deg)' },
          '100%': { transform: 'translate(-50%, -50%) rotateY(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
