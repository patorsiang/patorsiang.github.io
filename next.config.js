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
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
    };
  },
  assetPrefix: isProd
    ? "https://cdn.statically.io/gh/patorseing/patorseing.github.io/gh-pages/"
    : "",
});

module.exports = nextConfig;
