import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    qualities: [25, 50, 75, 95],
  },
};

export default nextConfig;
