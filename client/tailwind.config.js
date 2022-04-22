module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      max1140: { max: "1140px" },
      // => @media (max-width: 1279px) { ... }

      max920: { max: "920px" },
      // => @media (max-width: 1023px) { ... }
      max830: { max: "830px" },

      s810: { max: "810px" },
      min810: { min: "810px" },
      max620: { max: "620px" },
      max640: { max: "640px" },

      max600: { max: "600px" },
      max510: { max: "510px" },
      max400: { max: "420px" },
      max420: { max: "420px" },

      min1225: { min: "1300px" },
      max1225: { max: "1300px" },
      max1250: { max: "1250px" },

      min600: { min: "600px" },
      max780: { max: "780px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
  },
  plugins: [require("daisyui")],
};
