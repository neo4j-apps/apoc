const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const nested = require('postcss-nested');

module.exports = {
  plugins: [
    tailwindcss('tailwind.config.js'),
    autoprefixer,
    nested,
  ],
};