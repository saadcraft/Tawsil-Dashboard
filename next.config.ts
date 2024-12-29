import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    SECRET_KEY: process.env.SECRET_KEY,
  },
};

export default nextConfig;