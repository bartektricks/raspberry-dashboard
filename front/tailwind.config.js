const { blueGray, indigo, pink } = require("tailwindcss/colors");

module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gray: blueGray,
      indigo,
      pink
    },
    extend: {}
  },
  variants: {
    extend: {
      translate: ["focus-within"]
    }
  },
  plugins: []
};
