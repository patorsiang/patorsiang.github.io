const withPWA = require("next-pwa");
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  reactStrictMode: true,
  trailingSlash: true,
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
      "/404": { page: "/404" },
      "/500": { page: "/500" },
    };
  },
  async rewrites() {
    return {
      beforeFiles: [
        // These rewrites are checked after headers/redirects
        // and before all files including _next/public files which
        // allows overriding page files
        {
          source: "/api/hello",
          destination: "/api/hello",
          has: [{ type: "query", key: "name" }],
        },
      ],
      afterFiles: [
        // These rewrites are checked after pages/public files
        // are checked but before dynamic routes
      ],
      fallback: [
        // These rewrites are checked after both pages/public files
        // and dynamic routes are checked
        {
          source: "/:path*",
          destination: `/404`,
        },
      ],
    };
  },
  assetPrefix: isProd
    ? "https://cdn.statically.io/gh/patorseing/patorseing.github.io/gh-pages/"
    : "",
});

module.exports = nextConfig;
``;
