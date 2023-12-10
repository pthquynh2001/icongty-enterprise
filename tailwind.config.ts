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
          600: '#82a0f0',
          700: '#6e91ee',
          800: '#5981eb',
          900: '#4471e9',
          DEFAULT: '#2F61E6',
        },
        neutral: {
          600: '#9b9b9b',
          700: '#7a7a7a',
          800: '#6a6a6a',
          900: '#595959',
          DEFAULT: '#2F61E6',
        },
      },
      transitionProperty: {
        'transition-duration': '300ms',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
export default config;
