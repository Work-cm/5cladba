/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // K2LiquidStore "Lab Standard" theme — 'sky' remapped to pine green, 'cyan' to brass gold
        sky: {
          50: '#f2f7f4',
          100: '#e0efe8',
          200: '#c1dfd2',
          300: '#96c7b4',
          400: '#63a88d',
          500: '#3f8a6c',
          600: '#2a6d54',
          700: '#1f5744',
          800: '#164538',
          900: '#0f3229',
          950: '#0a201a',
        },
        // "Brass" accent
        cyan: {
          50: '#fdf8ec',
          100: '#f9efc9',
          200: '#f2dd8f',
          300: '#ecc84f',
          400: '#e3ab26',
          500: '#c98f12',
          600: '#a86f0c',
          700: '#85520b',
          800: '#6d4211',
          900: '#5e3713',
        },
        primary: {
          DEFAULT: '#1f5744',
          dark: '#164538',
          light: '#3f8a6c',
        },
        accent: {
          DEFAULT: '#c98f12',
          dark: '#a86f0c',
          light: '#ecc84f',
        },
        secondary: {
          DEFAULT: '#152019',
          dark: '#0b120e',
        },
        ink: {
          DEFAULT: '#152019',
          deep: '#0b120e',
        },
        dark: {
          DEFAULT: '#f3f4f6', // Gray-100
          lighter: '#f9fafb', // Gray-50
          darker: '#e5e7eb',  // Gray-200
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'blob': 'blob 14s ease-in-out infinite',
        'marquee': 'marquee 32s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(31,87,68,0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(31,87,68,0.6), 0 0 50px rgba(201,143,18,0.3)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(40px,-30px) scale(1.08)' },
          '66%': { transform: 'translate(-30px,20px) scale(0.95)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
