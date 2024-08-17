import createBundleAnalyzer from "@next/bundle-analyzer"

/** @type {import('next').NextConfig} */
let nextConfig = {
  experimental: {
    optimizePackageImports: ["d3"],
    ppr: true,
  },
  redirects() {
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

export default createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig)
