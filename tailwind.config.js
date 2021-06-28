module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        64: "16rem"
      },
      width: {
        290: '290px',
        354: '354px'
      },
      cursor: {
        grab: "grab",
        grabbing: "grabbing"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
