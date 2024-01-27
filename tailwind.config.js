module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],

  theme: {
    extend: {
      colors: {
        primary: "#18766e",
        secondary: "#030f11",
        "light-primary": "#86cfdf",
        "font-family": "Helvetica,Arial",
      },
      fontFamily: {
        "primary-font": ["Arimo", "sans-serif"],
        "secondary-font": ["Maven Pro", "sans-serif"],
      },

      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      screens: {
        xs: "450px",
        sm: "600px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
        "3xl": "1600px",
        "4xl": "1920px",
      },
    },
  },
  plugins: [],
};
