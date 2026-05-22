/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        warmBeige: '#F3EFE9',
        softGold: '#d4b57e',
        gold: '#C5A059',
        deepGold: '#A6823F',
        mutedBrown: '#8b7355',
        deepCocoa: '#4A3B32',
        bark: '#2A1F1A',
        subtleBlack: '#1A1614',
        // Preserve existing variables to avoid breaking existing styles before we convert them
        canvas: '#f7f0e7',
        parchment: '#fcf7f1',
        cream: '#f4eadf',
        almond: '#e8d7c2',
        sand: '#ccb08f',
        bronze: '#8e6545',
        cocoa: '#5b4030',
        pine: '#48573d'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Poppins', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        verse: ['"Lora"', 'serif']
      },
      boxShadow: {
        luxury: '0 30px 60px rgba(42, 31, 26, 0.12), 0 0 0 1px rgba(197, 160, 89, 0.15)',
        elevated: '0 20px 40px rgba(42, 31, 26, 0.08)',
        glass: '0 8px 32px rgba(42, 31, 26, 0.1)',
        // Preserve old shadows
        glow: '0 0 0 1px rgba(198, 155, 88, 0.24), 0 24px 60px rgba(88, 53, 34, 0.12)',
        velvet: '0 28px 90px rgba(54, 38, 29, 0.15)',
        card: '0 20px 55px rgba(73, 51, 37, 0.08)'
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #E6CA8C 0%, #C5A059 40%, #A6823F 100%)',
        'batik-overlay': 'url("/batik-parang.svg")',
        'premium-gradient': 'linear-gradient(180deg, rgba(250, 247, 242, 0) 0%, rgba(250, 247, 242, 1) 100%)',
        // Preserve old backgrounds
        'gold-gradient': 'linear-gradient(135deg, #d9b06d 0%, #c5944f 50%, #b47c3f 100%)',
        'hero-overlay': 'linear-gradient(180deg, rgba(48,31,20,0.2) 0%, rgba(48,31,20,0.7) 100%)',
        'champagne-glow': 'radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 38%), radial-gradient(circle at 80% 10%, rgba(198, 155, 88, 0.22), transparent 30%)'
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 4s ease-in-out infinite',
        slowSpin: 'slowSpin 14s linear infinite',
        shimmerGold: 'shimmerGold 3s ease-in-out infinite alternate',
        fadeUpSlow: 'fadeUpSlow 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        scaleIn: 'scaleIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        floatSlow: 'floatSlow 8s ease-in-out infinite'
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
        },
        shimmerGold: {
          '0%': { opacity: '0.7', filter: 'brightness(1)' },
          '100%': { opacity: '1', filter: 'brightness(1.15)' }
        },
        fadeUpSlow: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.02)' }
        }
      }
    }
  },
  plugins: []
};
