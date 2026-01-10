import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  basePath: process.env.NODE_ENV === "production" ? "/treasure-hunt" : "",
  output: "export"
}

export default nextConfig;
