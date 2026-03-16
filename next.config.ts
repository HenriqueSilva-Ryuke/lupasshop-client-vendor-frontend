import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { securityHeaders } from './src/config/security';
import { nextConfigRedirects } from './src/config/redirects';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Security
  productionBrowserSourceMaps: false,
  enablePrerenderSourceMaps: false,

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  // Redirects 301/302
  async redirects() {
    return nextConfigRedirects;
  },

  // Imagens otimizadas
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compressão
  compress: true,

  // Transpile shared packages
  transpilePackages: ['@lupa/design-system', '@lupa/api-client', '@lupa/types'],

  // Webpack otimização
  webpack: (config, { dev, isServer }) => {
    // Otimizações de produção
    if (!dev && !isServer) {
      // Remove console.log em produção
      config.optimization.minimizer.forEach((plugin: any) => {
        if (plugin.constructor.name === 'TerserPlugin') {
          plugin.options.terserOptions.compress.drop_console = true;
        }
      });
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
