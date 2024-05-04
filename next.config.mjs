/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com"
      },
      {
        hostname: "localhost"
      },
      {
        hostname: "104.168.175.191"
      }
    ]
  }
};

export default nextConfig;
