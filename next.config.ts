import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  // api: {
  //   bodyParser: {
  //     sizeLimit: '5mb',
  //   }
  // }
};

export default nextConfig;
