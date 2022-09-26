/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compilerOptions: {
    paths: {
      '@/components/*': ['components/*'],
      '@/shared/*': ['shared/*'],
    },
  },
  env: {
    ENV_NODE: 'development',
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;
