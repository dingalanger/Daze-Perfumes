/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy accents (kept for backward compatibility)
        'daze-gold': '#D4AF37',
        'daze-bronze': '#CD7F32',
        'daze-amber': '#FFBF00',

        // New Sleepwalker palette
        'daze-black': '#0B0B0C',
        'daze-white': '#FAFAF9',
        'daze-cream': '#F6F3EE',
        'daze-taupe': '#8E8578',
        'daze-lavender': '#CDB4DB',
        'daze-fog': '#BAC9E9',
        'daze-peach': '#F8D4C4',
        'daze-smoke': '#1A1A1D',
        'daze-mist': '#E9ECF5',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'whimsy': ['Fraunces', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'cursive': ['Dancing Script', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      backgroundImage: {
        'sleep-fog': 'radial-gradient(1200px 800px at -10% -20%, rgba(205,180,219,0.18), transparent 60%), radial-gradient(1000px 700px at 110% 10%, rgba(186,201,233,0.16), transparent 60%), radial-gradient(800px 600px at 50% 120%, rgba(248,212,196,0.12), transparent 60%)',
      },
      blur: {
        'xs': '2px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
} 