import { NextConfig } from "next"

export default {
  reactCompiler: true,
  typedRoutes: true,
  experimental: {
    optimizePackageImports: ["d3"],
  },
  typescript: {
    ignoreBuildErrors: true,
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
      {
        source: "/ecosystem",
        destination: "/ecosystem/lou",
        permanent: true,
      },
    ]
  },
} satisfies NextConfig
