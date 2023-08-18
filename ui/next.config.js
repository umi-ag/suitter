/** @type {import('next').NextConfig} */
const nextConfig = {
  runtime: 'edge',
  images: {
    domains: ['images.microcms-assets.io'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig
