import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LupaShop - Seller Platform',
    short_name: 'LupaShop',
    description: 'The integrated e-commerce platform where multiple independent stores come together in one digital space.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#412778',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        src: '/next.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/globe.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/globe.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    categories: ['shopping', 'business', 'productivity'],
    screenshots: [
      {
        src: '/screenshot-1.png',
        sizes: '540x720',
        type: 'image/png',
        form_factor: 'narrow',
      },
      {
        src: '/screenshot-2.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
      },
    ],
  };
}
