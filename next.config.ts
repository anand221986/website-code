import type { NextConfig } from "next";

const nextConfig: NextConfig = {
       basePath: "/a1-selector-next",
    assetPrefix: "/a1-selector-next",
  // Enable gzip / brotli compression
  compress: true,

  // Reduce memory & CSS size
  experimental: {
    optimizeCss: true,
  },

  // Cache static assets aggressively
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css|png|jpg|jpeg|svg|webp|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Image optimization (memory efficient)
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "http",
        hostname: "72.61.229.100",
      },
    ],
  },

 
};

export default nextConfig;
