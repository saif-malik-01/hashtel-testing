import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "store-d2a07kcl.saleor.cloud",
      "firebasestorage.googleapis.com",
      "storage.googleapis.com",
      "89.116.21.142"
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript:{
    ignoreBuildErrors:true
  }
};

export default nextConfig;
