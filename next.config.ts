import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    NEXT_PUBLIC_SERVER_DOMAIN: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    SERVER_LOCAL: process.env.SERVER_LOCAL,
  },
  images: {
    domains: ['192.168.1.30:8000', '192.168.1.30'],
  },
};

export default nextConfig;