import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'wa.me',
      },
      {
        protocol: 'https',
        hostname: 'rcvnipjtcmghmkskkvxt.supabase.co',
      }
    ],
  },
};

export default nextConfig;
