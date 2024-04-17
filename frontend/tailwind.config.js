module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "yellow",
          secondary: "teal",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
