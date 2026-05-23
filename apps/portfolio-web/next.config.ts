import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@patorsiang/content", "@patorsiang/cv-engine"],
};

export default nextConfig;
