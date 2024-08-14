/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
        };
      }
      return config;
    },
    transpilePackages: ['recharts'],
    api: {
        bodyParser: {
          sizeLimit: '1mb', // Adjust this value as needed
        },
      },
  }
  
  module.exports = nextConfig

  