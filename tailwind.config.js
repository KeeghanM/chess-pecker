const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: "#DB673A",
        light: "#f2f0ef",
        dark: "#2c2732",
        "accent-light": "#98a7a8",
        "accent-dark": "#a28075",
        info: "#2c2732",
        success: "#789949",
        warning: "#f58811",
        danger: "#f44336",
      },
      fontFamily: {
        serif: ["Merriweather", "ui-serif"],
      },
    },
  },
  darkMode: "class",
}
