/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          // Firefox-specific custom scrollbar colors
          "scrollbar-color": "rgb(31 29 29) white",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            "background-color": "white", // Correct property name
          },
          "&::-webkit-scrollbar-thumb": {
            "background-color": "rgb(31, 41, 55)", // Ensure consistency in color usage
            "border-radius": "20px", // Correct property name
            border: "1px solid white",
          },
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
