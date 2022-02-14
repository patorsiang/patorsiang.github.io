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
  assetPrefix: isProd
    ? "https://cdn.statically.io/gh/patorseing/patorseing.github.io/gh-pages/"
    : "",
  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/api": { page: "/api" },
    };
  },
});

module.exports = nextConfig;
