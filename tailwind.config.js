/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // Text alignment
    { pattern: /^text-(left|center|right|justify)$/ },
    // Font sizes
    { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/ },
    // Font weight
    { pattern: /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/ },
    // Line height and tracking commonly used in articles
    { pattern: /^leading-(none|tight|snug|normal|relaxed|loose)$/ },
    { pattern: /^tracking-(tighter|tight|normal|wide|wider|widest)$/ },
    // Simple image/content helpers that authors may use
    { pattern: /^(block|inline-block)$/ },
    { pattern: /^mx-auto$/ },
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Near-black / Deep gray base
        background: {
          DEFAULT: '#0f0f0f',
          subtle: '#1a1a1a',
          elevated: '#242424',
        },
        // Wine/Purple accent with golden highlights
        brand: {
          50: '#faf5f7',
          100: '#f5e6ec',
          200: '#ecc9d9',
          300: '#dfa0bd',
          400: '#ce6d9a',
          500: '#b94879', // Main wine
          600: '#9e3361',
          700: '#82294f',
          800: '#6d2444',
          900: '#5c213c',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#d4a574', // Soft gold
          600: '#b8860b', // Deep gold
          700: '#8b6914',
          800: '#725418',
          900: '#614619',
        },
        // Neutral grays
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(185, 72, 121, 0.3)',
        'glow-lg': '0 0 40px rgba(185, 72, 121, 0.4)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.3), 0 10px 20px -2px rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        shake: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
        fadeIn: "fadeIn 0.3s ease-out",
        fadeOut: "fadeOut 0.3s ease-in",
        slideUp: 'slideUp 0.3s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        scaleIn: 'scaleIn 0.2s ease-out',
        float: "float 3s ease-in-out infinite",
        shimmer: 'shimmer 2s infinite linear',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
