import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    //   SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    //   NEXT_PUBLIC_SERVER_DOMAIN: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
    //   NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    //   SERVER_LOCAL: process.env.SERVER_LOCAL,
    //   IMGS_DOMAIN: process.env.IMGS_DOMAIN,
    //   WS_SERVER: process.env.WS_SERVER,
    //   MAPBOX_API_KEY: process.env.MAPBOX_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    SENTRY_TELEMETRY: process.env.SENTRY_TELEMETRY || "0",
  },
  images: {
    domains: ['192.168.1.30:8000', '192.168.1.30', 'localhost', 'localhost:8000', '197.140.142.57:8000', '197.140.142.57', "192.168.222.254", "platforme.tawsilstar.dz"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Increase the limit to 10 MB
    },
  },
  webpack: (config) => {
    config.module.exprContextCritical = false;
    return config;
  },
  // Other configurations
  // sentry: {
  //   hideSourceMaps: false,
  //   autoInstrumentServerFunctions: true,
  // },
};

export default nextConfig;