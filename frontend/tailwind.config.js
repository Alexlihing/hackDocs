/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Add paths to all your component files
  ],
  theme: {
    extend: {
      colors: {
        green: {
          200: "#9AE6B4",
          400: "#68D391",
          700: "#22543D",
        },
      },
    },
  },
  plugins: [],
};
