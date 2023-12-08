/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          }, 
        keyframes: {
        wave: {
          '0%': { transform: 'scale(0.5)' },
          '50%': { transform: 'scale(0.7)' },
          '100%': { transform: 'scale(1)' },
          },
          bump: {
            '0%': { transform: 'scale(1)' },
            '10%': { transform: 'scale(0.9)' },
            '30%': { transform: 'scale(1.1)' },
            '50%': { transform: 'scale(1.15)' },
            '100%': { transform: 'scale(1)' },
        }  
      },
      animation: {
        'wave-ping': 'wave 2s linear',
        'wave-bump': 'bump 0.3s ease-out'
      },
    }
  },
  plugins: [],
}

