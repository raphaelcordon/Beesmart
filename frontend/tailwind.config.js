module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        bumblebee: {
          ...require("daisyui/src/theming/themes")["bumblebee"],
        },
      },
    ],
    utils: true,
  },
  plugins: [require("daisyui")],
};


// module.exports = {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   daisyui: {
//     themes: [
//       {
//         light: {
//           ...require("daisyui/src/theming/themes")["light"],
//           primary: "#D9B08C",
//           secondary: "#116466",
//           'base-300': "#D1E8E2",
//           accent: "#2C3531",
//           'base-200': "#FFCB9A",
          
//         },
//       },
//     ],
//     utils: true,
//   },

//   plugins: [require("daisyui")],
// };


//later customise themes (Böbi)
// daisyui: {
//   themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
//   darkTheme: "dark", // name of one of the included themes for dark mode
//   base: true, // applies background color and foreground color for root element by default
//   styled: true, // include daisyUI colors and design decisions for all components
//   utils: true, // adds responsive and modifier utility classes
//   prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
//   logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
//   themeRoot: ":root", // The element that receives theme color CSS variables
// },
