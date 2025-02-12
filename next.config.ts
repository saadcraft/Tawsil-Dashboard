import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    NEXT_PUBLIC_SERVER_DOMAIN: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    SERVER_LOCAL: process.env.SERVER_LOCAL,
  },
  images: {
    domains: ['192.168.1.30:8000', '192.168.1.30', 'localhost', 'localhost:8000', '197.140.142.57:8000', '197.140.142.57'],
  },
};

export default nextConfig;