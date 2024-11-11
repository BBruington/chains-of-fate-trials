/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.unsplash.com",
      },
    ],
    domains: ["scgovlibrary.librarymarket.com"],
  },
};

export default nextConfig;
