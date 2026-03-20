/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Merriweather', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        brand: '#e63946',
        'brand-dark': '#c1121f',
        crypto: '#f59e0b',
        news: '#e63946',
        aitools: '#7c3aed',
        github: '#16a34a',
        jobs: '#2563eb',
        startups: '#ea580c',
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        blob: 'blob 8s ease-in-out infinite',
        'blob-delay': 'blob 8s ease-in-out 2s infinite',
        shimmer: 'shimmer 1.5s infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
        aurora: 'aurora 10s ease-in-out infinite alternate',
      },
      keyframes: {
        ticker: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        blob: { '0%,100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }, '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        pulseDot: { '0%,100%': { opacity: '1', transform: 'scale(1)' }, '50%': { opacity: '0.4', transform: 'scale(1.7)' } },
        aurora: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '100% 50%' } },
      },
      backgroundSize: { '300%': '300%' },
    },
  },
  plugins: [],
}
