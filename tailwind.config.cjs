/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDF6F0',
        cocoa: '#6B4F4F',
        gold: '#D4AF37',
        blush: '#EBC8C1',
        bronze: '#A56B4F',
        bark: '#3F2E2E'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Poppins', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(212, 175, 55, 0.25), 0 24px 60px rgba(85, 52, 36, 0.18)',
        velvet: '0 24px 80px rgba(63, 46, 46, 0.22)'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, rgba(212, 175, 55, 0.95), rgba(240, 206, 130, 0.95))',
        'soft-radial': 'radial-gradient(circle at top left, rgba(235, 200, 193, 0.55), transparent 32%), radial-gradient(circle at right, rgba(212, 175, 55, 0.18), transparent 26%)'
      },
      animation: {
        floaty: 'floaty 4s ease-in-out infinite',
        pulseSoft: 'pulseSoft 3s ease-in-out infinite'
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.8' }
        }
      }
    }
  },
  plugins: []
};
