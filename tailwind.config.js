/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: "#BB452E",
        blue: "#6BA4B8",
        gray: {
          300: "#BBBCBC",
          500: "#63666A",
          700: "#212322",
        },
      },
      keyframes: {
        accordionSlideDown: {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        accordionSlideUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        marqueeScroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        accordionSlideDown:
          "accordionSlideDown 400ms cubic-bezier(1, 0, 0.25, 1)",
        accordionSlideUp: "accordionSlideUp 400ms cubic-bezier(1, 0, 0.25, 1)",
        fadeIn: "fadeIn 200ms",
        fadeOut: "fadeOut 200ms",
        marqueeScroll: "marqueeScroll var(--marquee-duration) linear infinite",
      },
    },
  },
  plugins: [],
}
