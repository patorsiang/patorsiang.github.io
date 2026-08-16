const createNextIntlPlugin = require("next-intl/plugin");
const path = require("path");

const withNextIntl = createNextIntlPlugin("./i18n.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  outputFileTracingRoot: path.join(__dirname, ".."),
  reactStrictMode: true, // Enable React strict mode for improved error handling
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  images: {
    unoptimized: true,
  },
};

module.exports = withNextIntl(nextConfig);
