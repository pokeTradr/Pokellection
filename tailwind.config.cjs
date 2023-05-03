module.exports = {
  content: ['./client/**/*.{js,jsx}', './client/index.html'],
  theme: {
      extend: {
          colors: {
              primary: '#1B73E8',
          },
      },
  },
  plugins: [require('daisyui')],
};
