/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.cloud.cmctelecom.vn',
        port: '',
        pathname: '/icongty-upload/**',
      },
      {
        hostname: 'loremflickr.com',
      },
      {
        hostname: 'cloudflare-ipfs.com',
      },
      {
        hostname: 'gw.alipayobjects.com',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'utfs.io',
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
