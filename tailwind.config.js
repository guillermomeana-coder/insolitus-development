/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: '#EBE6DF',
          light: '#F6F6F6',
        },
        stone: '#D9D4CC',
        terracotta: {
          DEFAULT: '#A14A32',
          dark: '#8B3F2A',
        },
        sage: '#A3B19B',
        charcoal: {
          DEFAULT: '#1A2530',
          light: '#2D3A47',
        },
        gray: '#7A7369',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-outfit)'],
        accent: ['var(--font-cormorant)'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
