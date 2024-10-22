/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
      },
      fontSize: {
        xtraBig: "50px",
        big: "35px",
        title: "30px",
        subTitle: "25px",
        heading: "20px",
        miniTItle: "17px",
        paragraph: "14px",
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        bold: "700",
        extralight: "200",
      },
      width: {
        Container: "75rem",
        btnBase: "5.5rem",
        btnXl: "28rem",
        btnMd: "26rem",
      },
      backgroundColor: { base: "#000000", btnSecondary: "#DFE2E6" },
      colors: {
        base: "#000000",
        Secondary: "#D1D5DB",
      },
      borderRadius: {
        btnBase: "2rem",
      },
      height: {
        btnBase: "2rem",
        btnXl: "3rem",
      },
      keyframes: {
        "bg-pulse": {
          "0%": { "background-position": "200% 0%" },
          "100%": { "background-position": "-200% 0%" },
        },
      },
      animation: {
        "bg-pulse": "bg-pulse 2s ease-in-out infinite",
      },
      backgroundSize: {
        "200%": "200% 100%",
      },
    },
  },
  plugins: [],
};
