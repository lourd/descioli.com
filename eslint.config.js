import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTypescript from "eslint-config-next/typescript"
import prettier from "eslint-config-prettier"
import { defineConfig } from "eslint/config"

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
])
