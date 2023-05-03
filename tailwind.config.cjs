module.exports = {
  content: ['./client/**/*.{js,jsx}', './client/index.html'],
  theme: {
      extend: {
          colors: {
              primary: '#1B73E8',
              Pokeblue: '#3262ad',
              Pokeliteblue: '#3c7ec9',
          },
      },
  },
  plugins: [require('daisyui')],
};
