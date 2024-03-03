import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

import { elevate } from "./src/styles/shadows"

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,md}",
    "./src/app/**/*.{js,ts,jsx,tsx,md}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        foreground: "hsl(var(--foreground-color) / <alpha-value>)",
        foregroundGray: "hsl(var(--foreground-gray) / <alpha-value>)",
        gray3: "hsl(var(--gray-3) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        background: "hsl(var(--background-color) / <alpha-value>)",
        link: "hsl(var(--link-color) / <alpha-value>)",
        "link-visited": "hsl(var(--link-visited-color) / <alpha-value>)",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 0px 5px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      fontFamily: {
        serif: ["Palatino Linotype", "Book Antiqua", "Palatino", "serif"],
      },
      boxShadow: {
        sm: elevate(1),
        DEFAULT: elevate(2),
        md: elevate(3),
        lg: elevate(4),
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-in-out forwards",
      },
    },
  },
  plugins: [
    plugin(({ addVariant, matchUtilities, theme }) => {
      addVariant("hocus", ["&:hover", "&:focus"])
      matchUtilities(
        {
          "text-shadow": (value) => ({ textShadow: value }),
        },
        { values: theme("textShadow") }
      )
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            }
          },
        },
        {
          values: theme("transitionDelay"),
        }
      )
    }),
  ],
}
export default config
