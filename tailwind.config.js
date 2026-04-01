/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["'JetBrains Mono'", "'IBM Plex Mono'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
      },
      colors: {
        terminal: {
          bg: "#0a0a0a",
          surface: "#111111",
          border: "#1a2a1a",
          green: "#00ff41",
          "green-dim": "#00cc33",
          "green-glow": "rgba(0,255,65,0.15)",
          amber: "#ffb300",
          text: "#e0e0e0",
          muted: "#808080",
          dark: "#c8c8c8",
        },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        "scan-line": "scanline 8s linear infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0,255,65,0.2), 0 0 10px rgba(0,255,65,0.1)" },
          "50%": { boxShadow: "0 0 20px rgba(0,255,65,0.4), 0 0 40px rgba(0,255,65,0.2)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right,rgba(0,255,65,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(0,255,65,0.03) 1px,transparent 1px)",
      },
      backgroundSize: {
        "grid-sm": "20px 20px",
      },
      boxShadow: {
        "green-glow": "0 0 20px rgba(0,255,65,0.15), 0 0 40px rgba(0,255,65,0.05)",
        "green-glow-lg": "0 0 40px rgba(0,255,65,0.25), 0 0 80px rgba(0,255,65,0.1)",
        "card": "0 4px 24px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          "scrollbar-color": "rgba(0,255,65,0.3) transparent",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": { width: "6px" },
          "&::-webkit-scrollbar-track": { "background-color": "transparent" },
          "&::-webkit-scrollbar-thumb": {
            "background-color": "rgba(0,255,65,0.3)",
            "border-radius": "3px",
          },
        },
        ".text-green-glow": {
          "text-shadow": "0 0 10px rgba(0,255,65,0.5), 0 0 20px rgba(0,255,65,0.3)",
        },
        ".border-green-glow": {
          "box-shadow": "0 0 0 1px rgba(0,255,65,0.2), inset 0 0 20px rgba(0,255,65,0.03)",
        },
        ".scanline-overlay::after": {
          content: "''",
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          "pointer-events": "none",
          "z-index": "9999",
        },
      });
    },
  ],
};
