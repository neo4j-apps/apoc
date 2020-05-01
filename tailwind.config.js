const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontSize: '10px',
      fontFamily: {
        sans: [
          'Open Sans',

          ...defaultTheme.fontFamily.sans,
        ]
      },
    },
  },
  variants: {},
  plugins: [],
}
