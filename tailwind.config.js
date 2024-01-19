module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      backgroundColor: {
        buttonColor: "#0F5B7B",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
