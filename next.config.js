/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  transpilePackages: ['@supabase/auth-helpers-nextjs'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Libera imagens de QUALQUER domínio HTTPS (bom para desenvolvimento)
      },
    ],
    domains: [
      'images.unsplash.com', 
      'i.imgur.com', 
      'upload.wikimedia.org',
      'via.placeholder.com',
      'bckvvrafdncagsbjyhhj.supabase.co',
      'coreva-normal.trae.ai' // Adicionado domínio da IA
    ],
  }
};

module.exports = nextConfig;
