import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // output: "standalone",

  output: "export",
  images: { unoptimized: true },
  trailingSlash: true, // tránh lỗi 404 khi refresh route con
};

export default nextConfig;
