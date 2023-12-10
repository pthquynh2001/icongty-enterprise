/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.cloud.cmctelecom.vn',
        port: '',
        pathname: '/icongty-upload/**',
      },
    ],
  },
};

module.exports = nextConfig;
