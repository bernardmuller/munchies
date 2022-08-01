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
        primary_light: '#7BC766',
        primary_dark: '#5EAB49',
        secondary: '#171A17',
        secondary_light: '#1C1F1C',
        secondary_dark: '#121412',
        tertiary: '#E6E66E',
        tertiary_light: '#EBEB89',
        tertiary_dark: '#DEDE6A',
        grey: '#ADB0AC',
        grey_light: '#B7BCB5',
        grey_dark: '#9E9F9E',
        black: '#000000',
        white: '#FFFFFF',
        white_dark: '#e3e3e3',
        danger: '#CF5A30',
        success: '#84C971',
        transparent: 'rgba(255, 255, 255, 0)',
        disabled: '#A4BD9C',
      },
      boxShadow: {
        glow: 'rgba(104, 191, 80, 0.50) 0px 5px 15px',
      },
    },
  },
  plugins: [],
};
