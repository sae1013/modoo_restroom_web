import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  /* config options here */
  compiler: {
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
