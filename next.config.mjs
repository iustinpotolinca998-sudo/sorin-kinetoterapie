/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Hero frames are served as static WebP from /public/frames (Sprint 2).
  // Modern formats kept on for any future next/image usage of real photos.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
