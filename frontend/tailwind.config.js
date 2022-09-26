/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#68BF50',
        primary_l: '#7BC766',
        primary_d: '#5EAB49',
        highlight: '#B4DFA8',
        secondary: '#171A17',
        secondary_l: '#1C1F1C',
        secondary_d: '#121412',
        white: '#FFFFFF',
        white_d: '#e3e3e3',
        grey: '#ADB0AC',
        grey_l: '#B7BCB5',
        grey_d: '#9E9F9E',
      },
    },
    boxShadow: {
      idle: 'rgba(104, 191, 80, 0.50) 0px 5px 8px',
      primary: 'rgba(104, 191, 80, 0.50) 0px 5px 10px',
    },
    scale: {
      active: '99',
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#68BF50',

          secondary: '#9E9F9E',

          accent: '#B4DFA8',

          neutral: '#171A17',

          info: '#3ABFF8',

          success: '#36D399',

          warning: '#FBBD23',

          error: '#F87272',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  addons: [],
};
