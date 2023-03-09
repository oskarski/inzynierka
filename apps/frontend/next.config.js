/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd-mobile'],
  images: {
    // TODO Drop after removing dummy images
    domains: ['via.placeholder.com'],
  },
};

module.exports = nextConfig;
