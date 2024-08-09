import type { Config } from 'tailwindcss'

const config: Config = {
  safelist: [
    'bg-custom-tag-orange-100',
    'bg-custom-tag-green-100',
    'bg-custom-tag-pink-100',
    'bg-custom-tag-blue-100',
    'text-custom-tag-orange-200',
    'text-custom-tag-green-200',
    'text-custom-tag-pink-200',
    'text-custom-tag-blue-200',
  ],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',

    // `src` directory를 사용한다면
    // './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        custom: {
          violet: '#5534DA',
          red: '#D6173A',
          green: '#7AC555',
          purple: '#760DDE',
          orange: '#FFA500',
          blue: '#76A5EA',
          pink: '#E876EA',
          light: {
            violet: '#F1EFFD',
          },
          black: {
            100: '#4B4B4B',
            200: '#333236',
            300: '#171717',
          },
          gray: {
            100: '#FAFAFA',
            200: '#EEEEEE',
            300: '#D9D9D9',
            400: '#9FA6B2',
            500: '#787486',
          },
          tag: {
            orange: {
              100: '#F9EEE3',
              200: '#D58D49',
            },
            green: {
              100: '#E7F7DB',
              200: '#86D549',
            },
            pink: {
              100: '#F7DBF0',
              200: '#D549B6',
            },
            blue: {
              100: '#DBE6F7',
              200: '#4981D5',
            },
          },
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      gridTemplateColumns: {
        card: 'minmax(420px, 1fr) minmax(180px, 200px)',
      },
    },
  },
  plugins: [],

  darkMode: 'class',
}
export default config
