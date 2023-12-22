import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#2f61e6',
        secondaryColor: '#6ae2f8',
        complementaryColor: '#595959',
        textColor: '#595959',
        gradientTitle:
          'linear-gradient(273deg, #2f61e6 -3.78%, #6ae2f8 140.09%)',
        royalBlue: {
          60: '#82a0f0',
          70: '#6e91ee',
          80: '#5981eb',
          90: '#4471e9',
          DEFAULT: '#2F61E6',
        },
        neutral: {
          1: '#FFFFFF',
          5: '#D9D9D9',
          6: '#BFBFBF',
          7: '#8C8C8C',
          8: '#595959',
          9: '#434343',
          10: '#262626',
          11: '#1F1F1F',
        },
      },
      transitionProperty: {},
      boxShadow: {
        card: '0px 6px 15px 0px rgba(44, 61, 106, 0.15)',
        cardHover: '0px 10px 20px 0px rgba(44, 61, 106, 0.27)',
        banner: '0px 10px 20px -8px rgba(44, 61, 106, 0.25);',
      },
      keyframes: {
        toLeft: {
          '0%': {
            transform: 'translateX(50%) scale(0.5)',
            opacity: '0',
          },
          ' 100%': { transform: 'translateX(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        toLeft: 'toLeft 1s ease-in-out',
      },
      fontFamily: {
        mont: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
export default config;
