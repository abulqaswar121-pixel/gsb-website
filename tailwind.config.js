/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A2150",
          dark: "#061534",
        },
        brand: {
          blue: "#1E4FA3",
          "blue-hover": "#2F63BD",
          silver: "#C9CED6",
        },
        canvas: "#F7F9FC",
        ink: "#0F1E33",
        muted: "#4A5A72",
        whatsapp: {
          DEFAULT: "#0B7A47",
          dark: "#096038",
        },
        online: "#22C55E",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        serif: ['Georgia', '"Times New Roman"', '"Palatino Linotype"', "serif"],
      },
      maxWidth: {
        site: "1140px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 30, 51, 0.08)",
        soft: "0 10px 30px rgba(10, 33, 80, 0.12)",
        deep: "0 22px 55px rgba(6, 21, 52, 0.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(22px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.9" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "bubble-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "msg-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.65s ease both",
        "pulse-ring": "pulse-ring 1.8s ease-out infinite",
        marquee: "marquee 28s linear infinite",
        "bubble-in": "bubble-in 0.3s ease both",
        "msg-in": "msg-in 0.25s ease both",
      },
    },
  },
  plugins: [],
};
