/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Dancing Script", "cursive"],
        "open-sans": ["Open Sans", "sans-serif"],
      },
      backgroundImage: {
        "wedding-hero": "url('images/kaitlynwesley-35.jpg')",
      },
      colors: {
        primary: "#FDB7C9",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
