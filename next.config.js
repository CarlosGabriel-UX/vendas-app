/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'images.unsplash.com', 
      'i.imgur.com', 
      'upload.wikimedia.org',
      'via.placeholder.com'
    ],
  }
};

module.exports = nextConfig;
