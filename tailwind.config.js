/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    fontFamily: {
      magistral: 'magistral',
      inter: 'inter',
      'black-ops': 'Black Ops One',
    },

    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
      black: 900,
    },

    colors: {
      transparent: 'transparent',

      white: {
        main: '#ffffff',
        off: '#FAF9F6',
      },
      black: {
        main: '#000000',
        light: '#71717A',
        thin: '#E4E4E7',
      },
      text: {
        thin: '#71717A',
        light: '#52525B',
        medium: '#3F3F46',
        dark: '#27272A',
        black: '#18181B',
      },
      blue: {
        main: '#3B82F6',
        dark: '#1D4ED8',
        light: '#93C5FD',
      },
      green: {
        main: '#10B981',
        dark: '#047857',
        light: '#A7F3D0',
      },
      violet: {
        main: '#8B5CF6',
        dark: '#6D28D9',
        light: '#DDD6FE',
      },
    },

    extend: {},
  },
  plugins: [],
};
