import createBundleAnalyzer from "@next/bundle-analyzer"

/** @type {import('next').NextConfig} */
let nextConfig = {
  experimental: {
    optimizePackageImports: ["d3"],
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

export default process.env.ANALYZE === "true"
  ? createBundleAnalyzer()(nextConfig)
  : nextConfig
