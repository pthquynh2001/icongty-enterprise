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
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
export default config;
