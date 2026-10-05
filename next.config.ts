import type { NextConfig } from "next";

// GitHub Pages phục vụ site tại https://darkclub136.github.io/demo-MWD,
// nên mọi đường dẫn tuyệt đối phải mang tiền tố này. Đặt "" khi deploy ở root domain.
const basePath = "/demo-MWD";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Next chỉ tự thêm basePath cho _next/* và next/link|image.
  // Asset viết tay trong code đọc biến này để khỏi lệch đường dẫn.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  trailingSlash: true, // tránh lỗi 404 khi refresh route con
};

export default nextConfig;
