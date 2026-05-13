import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/xyy-defense-training",
        destination: "/xyy-defense-training/index.html",
      },
      {
        source: "/xyy-defense-training/",
        destination: "/xyy-defense-training/index.html",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/defense-training",
        destination: "/xyy-defense-training",
        permanent: true,
      },
      {
        source: "/defense-training/",
        destination: "/xyy-defense-training",
        permanent: true,
      },
      {
        source: "/defense-training.html",
        destination: "/xyy-defense-training",
        permanent: true,
      },
      {
        source: "/xyy-defense-training.html",
        destination: "/xyy-defense-training",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
