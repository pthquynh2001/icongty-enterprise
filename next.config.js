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
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
        port: '',
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
