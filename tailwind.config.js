module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        modal: "modal .5s ease-in-out alternate",
        "modal-out": "modal-out .5s ease-in-out forwards",
        heart: "heart .2s ease-in-out alternate",
        'heart-ani' : "heart-ani 2s linear infinite"
      },
      keyframes: {
        modal: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0%)" },
        },
        "modal-out": {
          "0%": { transform: "translateY(0%)" },
          "100%": { transform: "translateY(100%)" },
        },
        heart: {
          "0%": { transform: "scale(1.0)" },
          "100%": { transform: "scale(0.8)" },
        },
        'heart-ani' : {
          "0%": { 
            transform: "translate(-50%, -50%)" ,
            opacity : 1,
            filter : 'hue-rotate(0deg)'
          },
          "100%": { 
            transform: "translate(-50%, -1000%)" ,
            opacity : 0,
            filter : 'hue-rotate(720deg)'
          },
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
