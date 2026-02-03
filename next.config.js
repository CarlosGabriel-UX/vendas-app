/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  transpilePackages: ['@supabase/auth-helpers-nextjs'], // Força transpilação
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
      'via.placeholder.com',
      'bckvvrafdncagsbjyhhj.supabase.co' // Adicionei seu domínio do Supabase
    ],
  }
};

module.exports = nextConfig;
