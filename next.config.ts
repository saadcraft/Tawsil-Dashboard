import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    NEXT_PUBLIC_SERVER_DOMAIN: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    SERVER_LOCAL: process.env.SERVER_LOCAL,
    IMGS_DOMAIN: process.env.IMGS_DOMAIN,
    WS_SERVER: process.env.WS_SERVER,
  },
  images: {
    domains: ['192.168.1.30:8000', '192.168.1.30', 'localhost', 'localhost:8000', '197.140.142.57:8000', '197.140.142.57', "192.168.222.254"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase the limit to 10 MB
    },
  },
  // Other configurations
  devIndicators: {
    buildActivity: true, // Example valid property
  },
};

export default nextConfig;