import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  experimental: {
    // Keeps the Three.js scene chunk lean in dev builds.
    optimizePackageImports: ["@react-three/drei"],
  },
};

export default nextConfig;
