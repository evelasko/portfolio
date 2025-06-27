import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/slices/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'sans-serif'],
        mono: ['var(--font-fragment-mono)', 'monospace'],
      },
      screens: {
        'm': '810px',
        'l': '1200px',
      },
    },
  },
  plugins: [],
};

export default config; 