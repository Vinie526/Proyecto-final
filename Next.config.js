// next.config.js - Usando sintaxis de módulo común para evitar errores de sintaxis

const nextConfig = {
  // Configuración para ignorar errores de TypeScript/ESLint durante la compilación
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Esto resuelve el error de Unsplash
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; // Usamos module.exports en lugar de export default