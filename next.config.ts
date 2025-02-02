import createBundleAnalyzer from "@next/bundle-analyzer"
import { NextConfig } from "next"

const nextConfig: NextConfig = {
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
}

export default process.env.ANALYZE === "true"
  ? createBundleAnalyzer()(nextConfig)
  : nextConfig
