const nextPwa = require('next-pwa');

const withPwa = nextPwa({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd-mobile'],
  images: {
    domains: ['kuchnialidla.pl'],
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

module.exports = withPwa(nextConfig);
