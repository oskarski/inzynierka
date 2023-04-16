/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd-mobile'],
  images: {
    // TODO Drop after removing dummy images
    domains: ['via.placeholder.com'],
  },
  modularizeImports: {
    'antd-mobile': {
      transform: 'antd-mobile/es/components/{{ kebabCase member }}',
    },
    '@ant-design/icons': {
      transform: '@ant-design/icons/{{ member }}',
    },
    lodash: {
      transform: 'lodash/{{ member }}',
    },
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

module.exports = nextConfig;
