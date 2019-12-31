const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [require('postcss-import'), tailwindcss(), require('autoprefixer')],
};
