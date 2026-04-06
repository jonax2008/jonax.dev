import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Generates static files in /out — perfect for Cloudflare Pages
};

export default nextConfig;
