module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        modal: 'modal .5s ease-in-out alternate',
        'modal-out': 'modal-out .5s ease-in-out forwards',
        heart : 'heart .2s ease-in-out alternate'
      },
      keyframes : {
        modal : {
          '0%' : {transform : 'translateY(100%)'},
          '100%' : {transform : 'translateY(0%)'}
        },
        'modal-out' : {
          '0%' : {transform : 'translateY(0%)'},
          '100%' : {transform : 'translateY(100%)'}
        },
        heart : {
          '0%' : {transform : 'scale(1.0)'},
          '100%' : {transform : 'scale(0.8)'},
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
