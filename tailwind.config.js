module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inconsolata']
      },
      backgroundImage: theme => ({
        'wire': "url('img/wire.png')",
        'background': "url('img/background.png')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
