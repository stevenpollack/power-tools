export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "serif"],
        // Bunnings-style fonts
        bunnings: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        "bunnings-heading": [
          "Futura",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        // Bunnings color system
        bunnings: {
          primary: {
            green: "rgb(13, 82, 87)", // Headers, text
            red: "rgb(218, 41, 28)", // Accent bars
            orange: "rgb(255, 171, 0)", // Buttons, CTAs
          },
          neutral: {
            "dark-gray": "rgb(51, 51, 51)", // Body text
            "medium-gray": "rgb(191, 191, 191)", // Borders
            "light-gray": "rgb(245, 245, 245)", // Background
          },
          rating: {
            "star-yellow": "rgb(255, 171, 0)", // Star ratings
            "progress-bar": "rgb(255, 171, 0)", // Rating bars
          },
        },
      },
      fontSize: {
        // Bunnings typography scale
        "bunnings-xl": "20px", // Main headings
        "bunnings-2xl": "26px", // Large headings (desktop)
        "bunnings-base": "16px", // Body text
        "bunnings-sm": "14px", // Secondary text
      },
      screens: {
        // Optimized breakpoints for mobile-first
        xs: "375px", // iPhone SE
        sm: "640px", // Large phones
        md: "768px", // Tablets
        lg: "1024px", // Small laptops
        xl: "1280px", // Desktop
        "2xl": "1536px", // Large screens
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
