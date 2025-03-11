import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "pub-73909f0ed311488f9559b0650c747b2d.r2.dev" },
      { hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
