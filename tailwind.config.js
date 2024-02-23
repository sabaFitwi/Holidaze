module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: "#18766e",
        secondary: "#030f11",
        "primary-hover": "#86cfdf",

        darkPrimary: "#525252",
        darkSecondary: "#333333",
        "dark-primary-hover": "#CCCCCC",
      },
      fontFamily: {
        "primary-font": ["Arimo", "sans-serif"],
        "secondary-font": ["Maven Pro", "sans-serif"],
      },
      fontSize: {
        xs: "0.8rem",
        sm: "0.9rem",
        base: "1rem",
        lg: "1.1rem",
        xl: "1.2rem",
        "2xl": "1.3rem",
        "3xl": "1.4rem",
      },
      screens: {
        xs: "450px",
        sm: "540px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1600px",
        "4xl": "1920px",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
      textColor: ["dark"],
      borderColor: ["dark"],
    },
  },
  plugins: [],
};
