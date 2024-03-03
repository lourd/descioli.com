import createBundleAnalyzer from "@next/bundle-analyzer"

/** @type {import('next').NextConfig} */
let nextConfig = {
  experimental: {
    optimizePackageImports: ["d3"],
  },
}

export default createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig)
