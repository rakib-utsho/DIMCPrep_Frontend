import type { NextConfig } from "next";

const isProd = process.env.NEXT_PUBLIC_ENV === "production";
// console.log(isProd);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ['10.0.30.210', 'localhost'],
  },
  env: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: isProd
      ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_DEV,
    NEXT_PUBLIC_URL: isProd
      ? process.env.NEXT_PUBLIC_URL
      : process.env.NEXT_PUBLIC_URL_DEV,
  },
};

export default nextConfig;
