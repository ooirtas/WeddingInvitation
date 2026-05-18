/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f7f0e7',
        parchment: '#fcf7f1',
        cream: '#f4eadf',
        almond: '#e8d7c2',
        sand: '#ccb08f',
        gold: '#c69b58',
        bronze: '#8e6545',
        cocoa: '#5b4030',
        bark: '#36261d',
        pine: '#48573d'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Poppins', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(198, 155, 88, 0.24), 0 24px 60px rgba(88, 53, 34, 0.12)',
        velvet: '0 28px 90px rgba(54, 38, 29, 0.15)',
        card: '0 20px 55px rgba(73, 51, 37, 0.08)'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #d9b06d 0%, #c5944f 50%, #b47c3f 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(48,31,20,0.2) 0%, rgba(48,31,20,0.7) 100%)',
        'champagne-glow': 'radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 38%), radial-gradient(circle at 80% 10%, rgba(198, 155, 88, 0.22), transparent 30%)'
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 4s ease-in-out infinite',
        slowSpin: 'slowSpin 14s linear infinite'
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.82' }
        },
        slowSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        }
      }
    }
  },
  plugins: []
};
