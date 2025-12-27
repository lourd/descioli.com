import { NextConfig } from "next"

export default {
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ["d3"],
  },
  async redirects() {
    return [
      {
        source: "/portfolio",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/social",
        destination: "/links",
        permanent: true,
      },
    ]
  },
} satisfies NextConfig
