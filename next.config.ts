import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/defense-training",
        destination: "/defense-training/index.html",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/defense-training.html",
        destination: "/defense-training",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
