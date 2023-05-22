/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const { createSecureHeaders } = require("next-secure-headers");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: !isProd,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  backForwardCache: {
    backForwardCache: true,
    duration: 60000, // 60 seconds
  },
  // Disable eslint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Secure headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              baseUri: "self",
              formAction: "self",
              frameAncestors: true,
            },
          },
          frameGuard: "deny",
          noopen: "noopen",
          nosniff: "nosniff",
          xssProtection: "sanitize",
          forceHTTPSRedirect: [
            true,
            {
              maxAge: 60 * 60 * 24 * 360,
              includeSubDomains: true,
            },
          ],
          referrerPolicy: "same-origin",
        }),
      },
    ];
  },
});

module.exports = nextConfig;
