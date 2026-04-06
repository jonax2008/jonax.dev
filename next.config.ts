import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required by @cloudflare/next-on-pages
  // All interactive pages already use 'use client' — no server runtime needed
};

export default nextConfig;
