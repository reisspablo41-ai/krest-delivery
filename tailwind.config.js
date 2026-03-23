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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#1e2d21', 
        'primary-dark': '#131e15',
        'primary-light': '#2a3a2e',
        secondary: '#f8cc74', // Yellowish accent
        accent: '#f8cc74',
        dark: '#162218',
        light: '#f4f4f0', // Off-white/beige for cards
        white: '#ffffff',
      },
      fontWeight: {
        bold: '700',
        black: '900',
      },
      fontFamily: {
        sans: ['var(--font-google-sans)', 'sans-serif'],
        heading: ['var(--font-google-sans)', 'sans-serif'],
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'glow-secondary': '0 0 30px rgba(248, 204, 116, 0.3)',
        'glow-accent': '0 0 30px rgba(248, 204, 116, 0.3)',
        card: '0 4px 24px rgba(0, 0, 0, 0.15)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.25)',
      },
      screens: {
        xs: '344px',
        cxs: '499px',
        lg: '1025px',
      },
      animation: {
        blink: 'blink 1s infinite',
        spin: 'spin 1s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'scroll-line': 'scrollLine 1.6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scrollLine: {
          '0%': { transform: 'translateY(-100%)', opacity: 1 },
          '100%': { transform: 'translateY(200%)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
